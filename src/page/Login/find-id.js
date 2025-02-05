import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../icon/kmlaonline-w.png"
import "../styles.css";

const FindId = () => {
  const [email, setEmail] = useState("");

  const handleFindId = () => {
    console.log("Finding ID with Email:", email);
    // find ID logic 생략
  };

  return (
    <div className="login-container">
      <div className="logo">
        <a href="/">
          <img  src={logoImg} alt="KmlaOnline" />
        </a>
      </div>
      <form
        method="post"
        action="/find-id"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="등록된 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFindId}
          >
            아이디 찾기
          </button>
        </div>
      </form>
      <div className="links">
        <span><Link to="/">로그인</Link>하기 / </span>
        <span><Link to="/find-password">비밀번호</Link>찾기 / </span>
        <span><Link to="/register">회원가입</Link>하기</span>
        
      </div>
    </div>
  );
};

export default FindId;
