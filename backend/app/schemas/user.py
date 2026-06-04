from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Literal


class UserRegister(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    username: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=6, max_length=128)
    role: Literal["patient", "doctor", "admin", "asha"]
    full_name: str | None = None
    age: int | None = Field(default=None, ge=0, le=130)
    gender: str | None = None
    phone_number: str | None = None
    preferred_language: str | None = None

    @field_validator("role", mode="before")
    @classmethod
    def normalize_role(cls, value):
        if isinstance(value, str):
            return value.strip().lower()

        return value

    @field_validator("age", mode="before")
    @classmethod
    def blank_age_to_none(cls, value):
        if value == "":
            return None

        return value


class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    patient_id: int | None = None

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
