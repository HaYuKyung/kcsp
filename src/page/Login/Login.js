import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link
import "../styles.css";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (rememberMe) {
      const confirmRemember = window.confirm(
        "개인용 장치에서만 사용하십시오. 계속하시겠습니까?"
      );
      if (!confirmRemember) {
        setRememberMe(false);
        return;
      }
    }
    console.log("Logging in with ID:", id, "Password:", password);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  return (
    <div className="login-container">
      <form
        method="post"
        action="./check"
        id="loginForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="logo">
          <a href="/">
            <img
              id="menuLogo"
              src="../../icon/kmlaonline-w.png"
              alt="KmlaOnline"
            />
          </a>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="ID로 로그인해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group actions">
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            로그인
          </button>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />{" "}
            기억하기
          </label>
        </div>
        <div className="form-group links">
          <Link to="/find-id">아이디를 잊으셨나요?</Link>
          <br/>
          <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
          <br/>
          <Link to="/register">새로운 회원이신가요?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
