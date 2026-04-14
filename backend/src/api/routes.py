from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.database.connection import get_pre_data
from src.agents.cores import get_agent
from src.api.models import PromptRequest

router = APIRouter()


@router.get("/get_list")
def get_list():
    return {"status": "success", "data": get_pre_data()}

@router.post("/prompt")
def process_prompt(request: PromptRequest):
    agent = get_agent()
    response = agent.invoke({"messages": [("user", request.prompt)]})
    return {"status": "success", "data": response["messages"][-1].content}