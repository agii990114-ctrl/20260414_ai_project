from pydantic import BaseModel, Field


class PromptRequest(BaseModel):
    prompt: str = Field(..., description="The user's query or statement to be processed by the agents.")