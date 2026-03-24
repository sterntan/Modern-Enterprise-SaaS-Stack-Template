import uuid
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    first_name: str
    last_name: str
    role: str = Field(default="seller")
    parent_id: Optional[uuid.UUID] = Field(default=None, foreign_key="user.id")

class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Relationships for adjacency list
    parent: Optional["User"] = Relationship(
        back_populates="subsellers",
        sa_relationship_kwargs=dict(remote_side="User.id")
    )
    subsellers: List["User"] = Relationship(back_populates="parent")

class UserCreate(UserBase):
    pass

class UserRead(UserBase):
    id: uuid.UUID
