from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  ollama_base_url: str
  ollama_model_name: str = "gemma4:e4b"
  graph_image_path: str = "images"
  db_host: str
  db_port: str
  db_user: str
  db_password: str
  db_database: str

  model_config = SettingsConfigDict(
    env_file=".env",
    env_file_encoding="utf-8",
  )

settings = Settings()