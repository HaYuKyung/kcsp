import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const handleFindPassword = () => {
    console.log("Finding Password with Email:", email, "ID:", id);
    // find password logic 생략략
  };

  return (
    <div className="login-container">
      <div className="logo">
        <a href="/">
          <img id="menuLogo" src="/images/kmlaonline-w.png" alt="KmlaOnline" />
        </a>
      </div>
      <form
        method="post"
        action="/find-password"
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
        <div className="form-group">
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFindPassword}
          >
            비밀번호 찾기
          </button>
        </div>
      </form>
      <div className="links">
        <Link to="/find-id">아이디를 잊으셨나요?</Link>
        <br/>
        <Link to="/">로그인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default FindPassword;
