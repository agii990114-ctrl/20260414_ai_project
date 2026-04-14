import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [boards, setBoards] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [boardState, setBoardState] = useState(false);
  
  // --- 페이지네이션 관련 상태 ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여줄 게시글 수
  // ---------------------------

  const base_url = "aiedu.tplinkdns.com:6010/api";

  const send = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoadState(true);
    axios.post(`http://${base_url}/prompt`, { prompt })
      .then(response => {
        setLoadState(false);
        setPrompt('');
        alert(response.data.data);
      })
      .catch(error => {
        setLoadState(false);
        alert("전송 중 오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    axios.get(`http://${base_url}/get_list`)
      .then(response => { setBoards(response.data.data); })
      .catch(error => { console.error('Error:', error); });
  }, [loadState]);

  // --- 페이지네이션 로직 ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = boards ? boards.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil((boards ? boards.length : 0) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // -----------------------

  return (
    <div className="container-fluid p-0 bg-light shadow-inner" style={{ minHeight: "100vh" }}>
      <div className="row g-0 mx-auto" style={{ width: "100%" }}>
        
        {/* 메인 입력 섹션 */}
        <div className={`col-12 ${boardState ? 'col-xl-4 col-lg-5' : 'col-xl-12'} vh-100 d-flex align-items-center justify-content-center p-4 transition-all`} style={{ transition: "0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <form 
            onSubmit={send} 
            className="card border-0 shadow-lg p-4 p-md-5 w-100 position-relative" 
            style={{ maxWidth: "700px", borderRadius: "24px" }}
          >
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm position-absolute" 
              style={{ top: "20px", right: "20px", borderRadius: "12px", padding: "8px 15px" }}
              onClick={() => setBoardState(!boardState)}
            >
              {boardState ? "닫기" : "📋 목록 보기"}
            </button>

            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-3">무엇을 도와드릴까요?</h2>
              <p className="text-muted">AI에게 질문하거나 저장된 데이터를 확인해보세요.</p>
            </div>

            <div className="input-group border rounded-pill p-2 bg-white shadow-sm">
              <input
                type="text"
                className="form-control border-0 px-4 shadow-none"
                placeholder="메시지를 입력하세요..."
                style={{ fontSize: "1.1rem" }}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loadState}
              />
              <button className="btn btn-primary rounded-pill fw-bold" type="submit" disabled={loadState}>
                {loadState ? <span className="spinner-border spinner-border-sm"></span> : "전송"}
              </button>
            </div>
          </form>
        </div>

        {/* 게시판 리스트 섹션 (페이지네이션 포함) */}
        {boardState && (
          <div className="col-12 col-xl-8 col-lg-7 bg-white border-start vh-100 p-4 p-xl-5 overflow-auto shadow-sm d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
              <div>
                <h3 className="fw-bold m-0 text-primary">📋 데이터 목록</h3>
                <small className="text-muted">총 {boards.length}개의 기록이 있습니다.</small>
              </div>
              <button className="btn btn-sm btn-light d-xl-none" onClick={() => setBoardState(false)}>접기</button>
            </div>

            <div className="flex-grow-1" style={{ borderRadius: "15px" }}>
              <table className="table table-hover align-middle" style={{ minWidth: "700px" }}>
                <thead className="table-light">
                  <tr>
                    <th className="border-0 text-center py-3" style={{ width: "80px" }}>No</th>
                    <th className="border-0 py-3" style={{ width: "150px" }}>작성자</th>
                    <th className="border-0 py-3">상세 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item.no}>
                        <td className="text-center text-muted fw-bold">#{item.no}</td>
                        <td className="fw-semibold text-dark">{item.name}</td>
                        <td>
                          <div className="fw-bold text-dark mb-1">{item.title}</div>
                          <div className="text-muted small text-truncate" style={{ maxWidth: "450px" }}>{item.content}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-5 text-muted">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 UI */}
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link border-0 rounded-circle mx-1" onClick={() => paginate(currentPage - 1)}>
                      &lt;
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                      <button 
                        className={`page-link border-0 rounded-circle mx-1 shadow-sm ${currentPage === idx + 1 ? 'bg-primary text-white' : 'text-primary bg-white'}`} 
                        onClick={() => paginate(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link border-0 rounded-circle mx-1" onClick={() => paginate(currentPage + 1)}>
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>

      <style>{`
        .transition-all { transition: all 0.5s ease; }
        @media (max-width: 1199.98px) {
          .vh-100 { height: auto !important; min-height: 60vh; }
          .border-start { border-left: none !important; border-top: 1px solid #dee2e6 !important; }
        }
        .page-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .page-link:hover {
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default App;