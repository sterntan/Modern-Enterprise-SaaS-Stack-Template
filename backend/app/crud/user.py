import uuid
from sqlmodel import Session, select
from sqlalchemy.orm import aliased
from app.models.user import User, UserCreate

def create_user(session: Session, user: UserCreate) -> User:
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user(session: Session, user_id: uuid.UUID) -> User | None:
    return session.get(User, user_id)

def get_descendants(session: Session, user_id: uuid.UUID) -> list[User]:
    # Base case: the current user
    base_query = select(User).where(User.id == user_id).cte(name="seller_tree", recursive=True)
    
    # Recursive step: subsellers of the current tree level
    parent_alias = aliased(base_query, name="p")
    user_alias = aliased(User, name="u")
    
    recursive_query = select(user_alias).join(parent_alias, user_alias.parent_id == parent_alias.c.id)
    
    # Construct the full recursive CTE
    hierarchy_cte = base_query.union_all(recursive_query)
    
    # Execute to get all descendants (including the root user)
    stmt = select(User).join(hierarchy_cte, User.id == hierarchy_cte.c.id)
    return session.exec(stmt).all()
