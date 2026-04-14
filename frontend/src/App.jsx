import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css'; // 작성한 CSS 임포트

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [boards, setBoards] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [boardState, setBoardState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      .catch(() => {
        setLoadState(false);
        alert("전송 중 오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    axios.get(`http://${base_url}/get_list`)
      .then(response => { setBoards(response.data.data); })
      .catch(error => { console.error('Error:', error); });
  }, [loadState]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = boards ? boards.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil((boards ? boards.length : 0) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app-container">
      <div className="main-row">

        {/* 메인 입력 섹션 */}
        <section className={`input-section ${boardState ? 'split-view' : 'full-view'}`}>
          <div className="main-card">
            <div className="toggle-header">
              <button 
                type="button" 
                className="btn btn-outline-primary list-toggle-btn shadow-sm"
                onClick={() => setBoardState(!boardState)}
              >
                {boardState ? "닫기" : "📋 목록 보기"}
              </button>
            </div>

            <div className="text-center mb-4">
              <h2 className="card-title">무엇을 도와드릴까요?</h2>
              <p className="text-muted">AI에게 질문하거나 저장된 데이터를 확인해보세요.</p>
            </div>

            <form onSubmit={send} className="custom-input-group">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loadState}
              />
              <button className="btn btn-primary" type="submit" disabled={loadState}>
                {loadState ? <span className="spinner-border spinner-border-sm"></span> : "전송"}
              </button>
            </form>
          </div>
        </section>

        {/* 게시판 리스트 섹션 */}
        {boardState && (
          <aside className="board-section">
            <div className="board-header">
              <div>
                <h3 className="fw-bold m-0 text-primary">📋 데이터 목록</h3>
                <small className="text-muted">총 {boards.length}개의 기록이 있습니다.</small>
              </div>
              <button className="btn btn-sm btn-light d-xl-none" onClick={() => setBoardState(false)}>접기</button>
            </div>

            <div className="custom-table-container">
              <table className="custom-table table-hover align-middle">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "80px" }}>No</th>
                    <th style={{ width: "150px" }}>작성자</th>
                    <th>상세 내용</th>
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
                          <div className="text-muted small text-truncate-custom">{item.content}</div>
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
              <ul className="pagination-container">
                <li>
                  <button className="page-btn" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                    &lt;
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li key={idx + 1}>
                    <button 
                      className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                      onClick={() => paginate(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button className="page-btn" disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
                    &gt;
                  </button>
                </li>
              </ul>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default App;