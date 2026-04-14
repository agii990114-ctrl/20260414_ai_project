from src.database.connection import get_db_connection
from langchain.tools import tool


@tool
def insert_record(name: str = None, title: str = None, content: str = None):
    """DB에 새로운 에이전트 정보를 저장합니다."""
    sql = ""
    result = ""
    if not all([name, title, content]):
        result = "이름, 제목, 내용은 모두 필수입니다. 누락된 정보가 있습니다."
    else: 
        try:
            sql = f"INSERT INTO ai_agent (`name`, `title`, `content`) VALUES ('{name}', '{title}', '{content}')"
            print(sql)
            get_db_connection(sql)
            result= f"{name}님의 글 '{title}'이(가) 성공적으로 등록되었습니다."
        except Exception as e:
            result = f"데이터베이스 작업 중 오류가 발생했습니다: {str(e)}"
    return result

@tool
def delete_records(no:int = None):

    """DB에서 에이전트 정보를 삭제합니다."""

    sql = ""
    result = ""
    if not no:
        result = "삭제할 데이터의 번호를 입력해주세요."
    else: 
        try:
            sql = f"DELETE FROM ai_agent WHERE no = {no}"
            print(sql)
            get_db_connection(sql)
            result= f"{no}번 데이터가 성공적으로 삭제되었습니다."
        except Exception as e:
            result = f"데이터베이스 작업 중 오류가 발생했습니다: {str(e)}"
    return result

@tool
def update_record(no:int = None, title: str = None, content: str = None):

    """DB에서 에이전트 정보를 업데이트합니다."""

    sql = ""
    result = ""
    if not all([no, title, content]):
        result = "번호, 제목, 내용은 모두 필수입니다. 누락된 정보가 있습니다."
    else: 
        try:
            sql = f"UPDATE ai_agent SET title='{title}', content='{content}' WHERE no={no}"
            print(sql)
            get_db_connection(sql)
            result= f"{no}번째 데이터가 성공적으로 업데이트되었습니다."
        except Exception as e:
            result = f"데이터베이스 작업 중 오류가 발생했습니다: {str(e)}"
    return result