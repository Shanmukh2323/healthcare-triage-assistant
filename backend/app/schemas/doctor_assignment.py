from pydantic import BaseModel, Field


class DoctorAssignmentRequest(
    BaseModel
):
    doctor_name: str = Field(min_length=1, max_length=120)
