from sqlmodel import SQLModel, create_engine, Session
import os
from app.config import settings

# Example postgres connection URL
DATABASE_URL = settings.database_url

# create engine
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
