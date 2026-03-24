import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.user import UserRead, UserCreate
from app.crud import user as crud_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    return crud_user.create_user(session=session, user=user)

@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: uuid.UUID, session: Session = Depends(get_session)):
    db_user = crud_user.get_user(session=session, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/{user_id}/hierarchy", response_model=list[UserRead])
def read_user_hierarchy(user_id: uuid.UUID, session: Session = Depends(get_session)):
    # Check if user exists first
    db_user = crud_user.get_user(session=session, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    hierarchy = crud_user.get_descendants(session=session, user_id=user_id)
    return hierarchy
