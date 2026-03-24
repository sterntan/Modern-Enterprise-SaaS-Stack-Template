import pytest
from sqlmodel import Session, SQLModel, create_engine
from app.models.user import User, UserCreate
from app.crud.user import create_user, get_descendants

@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

def test_hierarchy(session: Session):
    root = create_user(session, UserCreate(email="root@test.com", first_name="A", last_name="A"))
    sub1 = create_user(session, UserCreate(email="sub1@test.com", first_name="B", last_name="B", parent_id=root.id))
    sub2 = create_user(session, UserCreate(email="sub2@test.com", first_name="C", last_name="C", parent_id=sub1.id))
    sub3 = create_user(session, UserCreate(email="sub3@test.com", first_name="D", last_name="D", parent_id=root.id))
    
    # root should see sub1, sub2, sub3 + root itself (4 total)
    root_descendants = get_descendants(session, root.id)
    assert len(root_descendants) == 4
    ids = [u.id for u in root_descendants]
    assert root.id in ids
    assert sub1.id in ids
    assert sub2.id in ids
    assert sub3.id in ids
    
    # sub1 should see sub2 + sub1 itself
    sub1_descendants = get_descendants(session, sub1.id)
    assert len(sub1_descendants) == 2
    ids1 = [u.id for u in sub1_descendants]
    assert sub1.id in ids1
    assert sub2.id in ids1
