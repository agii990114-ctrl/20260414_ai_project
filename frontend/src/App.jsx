import { use, useEffect, useState } from "react";
import axios from 'axios';


const App = () => {
  const [prompt, setPrompt] = useState('');
  const [boards, setBoards] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [boardState, setBoardState] = useState(false);
  const base_url = "aiedu.tplinkdns.com:6010/api";
  const send = (e) => {
    e.preventDefault();
    console.log(prompt);
    setLoadState(true);
    axios.post(`http://${base_url}/prompt`, { prompt })
      .then(response => {
        console.log('Response:', response.data);
        setLoadState(false);
        alert(response.data.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoadState(false);
        alert(response.data.data);
      });
  };

  useEffect(() => {
    axios.get(`http://${base_url}/get_list`)
      .then(response => {
        setBoards(response.data.data); 
      })
      .catch(error => {
        console.error('Error fetching agent list:', error);
      });
  }, [loadState]);

  return (
    <div className="d-flex">
      <form  style={{ margin: "0 auto", width: "40%", height: "100vh", alignContent: "center", justifyContent: "center" }} onSubmit={send} className={`p-3 text-center position-relative`}>
        <button type="button" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => {setBoardState(!boardState)}} className="btn btn-sm btn-light">
          <span>{boardState?">>" : "<<"}</span>
        </button>
        <h3 className="text-center mb-3">안녕하세요! 무엇을 도와드릴까요?</h3>
        <div className="container text-center" style={{ maxWidth: "700px" }}>
          <div className="input-group border rounded-pill px-3 py-1 shadow-sm" style={{ background: '#fff' }}>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="메시지를 입력하세요..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              readOnly={loadState}/>
            {
              // !inputLoad?
              <button className="btn btn-link text-primary fw-bold text-decoration-none" type="submit" disabled={loadState}>
                전송
              </button>
              // : <button className="btn btn-link text-primary fw-bold text-decoration-none" type="button" onClick={()=>handleCancel()}>취소</button> 
            }
          </div>
        </div>
      </form>
      <div className={`board_wrap ${boardState ? '' : 'd-none'}`} style={{ width: "60%", padding: "50px", borderLeft: "1px solid #ddd", height: "100vh", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>📋 게시글 목록</h4>
          {/* <button className="btn btn-sm btn-outline-secondary">새로고침</button> */}
        </div>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th scope="col" style={{ width: "10%" }}>No</th>
                <th scope="col" style={{ width: "15%" }}>이름</th>
                <th scope="col" style={{ width: "25%" }}>제목</th>
                <th scope="col" style={{ width: "50%" }}>내용</th>
              </tr>
            </thead>
            <tbody>
              {
              boards && boards.length > 0 ? 
              (
                boards.map((item) => (
                  <tr key={item.no}>
                    <td className="fw-bold">{item.no}</td>
                    <td>{item.name}</td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      {item.title}
                    </td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      {item.content}
                    </td>
                  </tr>
                ))
              ) 
              : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    등록된 데이터가 없습니다.
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;