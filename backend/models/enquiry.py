from datetime import datetime, timezone
from uuid import uuid4

from pydantic import BaseModel, Field


class EnquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    phone_number: str = Field(min_length=10, max_length=20)
    wedding_date: str = Field(min_length=10, max_length=10)
    event_city: str = Field(min_length=2, max_length=80)
    services_needed: list[str] = Field(min_length=1)
    estimated_budget: str = ""
    message: str = ""


class EnquiryResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    full_name: str
    phone_number: str
    wedding_date: str
    event_city: str
    services_needed: list[str]
    estimated_budget: str = ""
    message: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
