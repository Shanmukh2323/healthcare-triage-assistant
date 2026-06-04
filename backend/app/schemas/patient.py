from pydantic import BaseModel, Field


class PatientCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=120)
    age: int = Field(ge=0, le=130)
    gender: str = Field(min_length=1, max_length=40)
    phone_number: str | None = Field(default=None, max_length=30)
    preferred_language: str = Field(min_length=1, max_length=60)
