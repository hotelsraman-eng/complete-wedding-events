import os

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URL)
db = client.wedding_events


async def ensure_indexes():
    await db.enquiries.create_index("created_at")
    await db.enquiries.create_index("phone_number")
