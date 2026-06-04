ALTER TABLE users
ADD COLUMN IF NOT EXISTS patient_id INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_users_patient_id'
    ) THEN
        ALTER TABLE users
        ADD CONSTRAINT fk_users_patient_id
        FOREIGN KEY (patient_id) REFERENCES patients(id);
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS ix_users_patient_id
ON users(patient_id)
WHERE patient_id IS NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_triage_history_escalation_id'
    ) THEN
        ALTER TABLE triage_history
        ADD CONSTRAINT fk_triage_history_escalation_id
        FOREIGN KEY (escalation_id) REFERENCES escalation_queue(id)
        NOT VALID;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS ix_triage_history_patient_id
ON triage_history(patient_id);

CREATE INDEX IF NOT EXISTS ix_escalation_queue_patient_id
ON escalation_queue(patient_id);

CREATE INDEX IF NOT EXISTS ix_escalation_queue_status
ON escalation_queue(status);

WITH new_patient_profiles AS (
    INSERT INTO patients (
        full_name,
        age,
        gender,
        phone_number,
        preferred_language,
        created_at
    )
    SELECT
        users.username,
        0,
        'Not specified',
        NULL,
        'English',
        NOW()
    FROM users
    WHERE users.role = 'patient'
    AND users.patient_id IS NULL
    RETURNING id, full_name
)
UPDATE users
SET patient_id = new_patient_profiles.id
FROM new_patient_profiles
WHERE users.username = new_patient_profiles.full_name
AND users.role = 'patient'
AND users.patient_id IS NULL;
