import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from lib.db import client, ensure_indexes
from models.enquiry import EnquiryCreate, EnquiryResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ensure_indexes()
    yield
    client.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
async def root():
    return {"message": "Wedding Events enquiry service is ready"}


@app.post("/api/enquiries", response_model=EnquiryResponse)
async def create_enquiry(enquiry: EnquiryCreate):
    from lib.db import db

    response = EnquiryResponse(**enquiry.model_dump())
    await db.enquiries.insert_one(response.model_dump())
    return response


@app.get("/api/enquiries")
async def list_enquiries():
    from lib.db import db

    enquiries = await db.enquiries.find().sort("created_at", -1).to_list(100)
    return enquiries
