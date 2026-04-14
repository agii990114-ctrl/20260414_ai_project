from langchain_ollama import ChatOllama
from langgraph.prebuilt import create_react_agent
from settings import settings
from src.agents.tools import insert_record, delete_records, update_record
import certifi
import os

os.environ['SSL_CERT_FILE'] = certifi.where()

def get_agent():
    llm = ChatOllama(model=settings.ollama_model_name, base_url=settings.ollama_base_url, temperature=0)
    tools = [insert_record, delete_records, update_record]
    
    system_message = f"""
        당신은 데이터베이스 관리 전문가입니다. 사용자의 요청을 분석하여 적절한 DB 조작 도구를 호출해야 합니다.

        [작동 프로세스]
        1. 사용자의 입력을 분석하여 다음 정보를 파악합니다.
        - **이름(name), 제목(title), 내용(content)**
        - **번호(no)**: "no 8", "8번 데이터를 수정" 등 문맥에서 특정 레코드를 지칭하는 숫자(ID)를 파악합니다.
        - **의도(action)**: INSERT, UPDATE, DELETE 중 하나로 분류합니다.

        2. 파악된 의도(action)에 따라 아래 도구 중 하나를 반드시 호출하세요.

        [도구 사용 규칙]
        - **action이 'INSERT'인 경우**: 'insert_record' 도구 호출 (인자: name, title, content)
        - **action이 'UPDATE'인 경우**: 'update_record' 도구 호출 (인자: no, title, content)
        - **action이 'DELETE'인 경우**: 'delete_records' 도구 호출 (인자: no)

        [제약 사항]
        - **UPDATE 요청 시 주의사항**: 
        - `update_record` 도구는 `no`, `title`, `content` 세 가지 인자가 모두 필수입니다. 
        - 만약 사용자의 요청에서 번호, 제목, 내용 중 누락된 정보가 있다면, 도구를 호출하기 전에 사용자에게 부족한 정보를 친절하게 되물어 확인하세요.
        - **인자값 전달**: 도구를 호출할 때는 추출된 값을 해당 인자명에 맞게 전달하세요.
        - **데이터 타입**: 번호(no)는 반드시 정수형(int)으로 전달해야 합니다.
        - **결과 설명**: 도구 실행 결과(성공 메시지 또는 오류 내용)를 바탕으로 사용자에게 작업 완료 여부를 친절하게 설명하세요.
    """
    
    return create_react_agent(llm, tools, prompt=system_message)