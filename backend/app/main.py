from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select
from pydantic import BaseModel
from app.database import create_db_and_tables, get_session, engine
from app.models.user import User
from app.routers import users

# ── Auth schemas ──────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str

# ── Demo seed data ────────────────────────────────────────────────────────
DEMO_USERS = [
    {"email": "admin", "first_name": "Admin", "last_name": "User", "role": "admin"},
    {"email": "user",  "first_name": "Demo",  "last_name": "User", "role": "user"},
]

def seed_demo_users():
    """Ensure the two demo accounts always exist on startup."""
    with Session(engine) as session:
        for data in DEMO_USERS:
            existing = session.exec(select(User).where(User.email == data["email"])).first()
            if not existing:
                session.add(User(**data))
        session.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    seed_demo_users()
    yield


app = FastAPI(title="SaaS Core Backend API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4321", "http://127.0.0.1:5173", "http://127.0.0.1:4321"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Welcome to the SaaS Core API"}

@app.get("/api/metrics")
def get_metrics(session: Session = Depends(get_session)):
    # Calculate live metrics by querying the database for the showcase
    total_users = session.exec(select(User)).all()
    count = len(total_users)
    
    return {
        "users": count,
        "active": count * 2, # Mock active subscriptions based on user count
        "revenue": count * 1599 # Mock MRR calculation
    }

@app.get("/api/users")
def get_api_users(session: Session = Depends(get_session)):
    # Simple explicit API route for the React dashboard
    all_users = session.exec(select(User)).all()
    return all_users

# ── Auth ─────────────────────────────────────────────────────────────────
DEMO_PASSWORD = "password123"   # Fallback — overridden by per-user logic below

@app.post("/auth/login")
def login(req: LoginRequest, session: Session = Depends(get_session)):
    """
    Demo login: email == password (e.g. admin/admin, user/user).
    Replace with bcrypt + JWT for production.
    """
    user = session.exec(select(User).where(User.email == req.email)).first()
    # Accept if password equals the username (the demo convention)
    if not user or req.password != req.email:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    return {"message": "Login successful", "user": {"id": str(user.id), "email": user.email, "role": user.role}}
