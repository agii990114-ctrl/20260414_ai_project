from src.database.config import config
import mariadb

def get_pre_data(column:str, txt:str, no:int):

    page_num = no * 5

    sql = ""
    sql2 = ""

    if txt:         
        sql = f"""
        SELECT * FROM ai_agent where {column} like '%{txt}%' order by regdate DESC, `no` DESC limit 5 offset {page_num};
        """
        sql2 = f"""
        SELECT ceil(count(*)/5) FROM ai_agent where {column} like '%{txt}%';
        """
    else:
        sql = f"""
        SELECT * FROM ai_agent order by regdate DESC, `no` DESC limit 5 offset {page_num};
        """
        sql2 = f"""
        SELECT ceil(count(*)/5) FROM ai_agent;
        """
    
    try:
        conn = mariadb.connect(**config)
        cur = conn.cursor()
        cur.execute(sql)
        
        # 데이터를 가져오는 핵심 로직 (fetchall)
        rows = cur.fetchall()
        
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in rows]
        cur.execute(sql2)
        total_count = cur.fetchone()[0]
            
        return (result, total_count) # 리스트 형태로 반환

    except mariadb.Error as e:
        return f"오류 발생: {e}"
    finally:
        if 'conn' in locals():
            conn.close()
            

def get_db_connection(sql):
    
    try:
        # 2. MariaDB 연결
        conn = mariadb.connect(**config)
        print("성공적으로 DB에 연결되었습니다.")
        
        # 3. 커서(Cursor) 생성
        cur = conn.cursor()

        # 4. SQL 쿼리 실행 (예: 테이블 조회)
        cur.execute(sql)
        conn.commit()  # 변경 사항을 DB에 반영
    # 예외 처리
    except mariadb.Error as e:
        print(f"MariaDB 연결 오류: {e}")

    # 6. 연결 종료 (필수)
    finally:
        if 'conn' in locals():
            conn.close()
            print("DB 연결이 종료되었습니다.")
