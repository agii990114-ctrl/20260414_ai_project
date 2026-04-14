from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router as api_router


app = FastAPI(title="LangChain Ollama Agent API")

app.include_router(api_router)

origins = [
    "http://localhost:5173", "http://localhost:80", "http://frontend:5173", "http://aiedu.tplinkdns.com:6010"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # 허용할 도메인 리스트
    allow_credentials=True,          # 쿠키/인증 정보 포함 여부
    allow_methods=["*"],             # 허용할 HTTP 메서드 (GET, POST 등)
    allow_headers=["*"],             # 허용할 HTTP 헤더
)

@app.get("/")
def read_root():
    return {"hello": "world"}
