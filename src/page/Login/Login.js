import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../icon/kmlaonline-w.png";
import "../styles.css";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(() => {
    const attempts = localStorage.getItem("failedAttempts");
    return attempts ? parseInt(attempts, 10) : 0;
  });
  const [isLocked, setIsLocked] = useState(() => {
    const lockoutEnd = parseInt(localStorage.getItem("lockoutEnd"));
    return lockoutEnd && Date.now() < parseInt(lockoutEnd, 10);
  });
  const [remainingTime, setRemainingTime] = useState(() => {
    const lockoutEnd = localStorage.getItem("lockoutEnd");
    if (lockoutEnd) {
      const parsedLockoutEnd = parseInt(lockoutEnd, 10);
      if (!isNaN(parsedLockoutEnd)) {
        return parsedLockoutEnd > Date.now()
          ? Math.ceil((parsedLockoutEnd - Date.now()) / 1000)
          : 0;
      }
    }
    return 0;
  });

  const users = [
    { id: "admin", password: "1234" },
    { id: "user1", password: "password1" },
    { id: "guest", password: "guest123" },
  ];

  useEffect(() => {
    if (isLocked) {
      const lockoutEnd = parseInt(localStorage.getItem("lockoutEnd"));
      const interval = setInterval(() => {
        const timeLeft = Math.max(0, Math.ceil((lockoutEnd - Date.now()) / 1000));
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(interval);
          setIsLocked(false);
          setFailedAttempts(0);
          localStorage.removeItem("lockoutEnd");
          localStorage.removeItem("failedAttempts");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked]);

  const validateInputs = () => {
    const newErrors = {};
    if (!id.trim()) newErrors.id = "*아이디는 필수 입력사항입니다.";
    if (!password.trim()) {
      newErrors.password = "*비밀번호는 필수 입력사항입니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (isLocked) {
      setErrorMessage("잠시 후에 다시 시도하세요.");
      return;
    }

    if (!validateInputs()) {
      return;
    }

    if (rememberMe) {
      const confirmRemember = window.confirm(
        "개인용 장치에서만 사용하십시오. 계속하시겠습니까?"
      );
      if (!confirmRemember) {
        setRememberMe(false);
        return;
      }
    }

    const user = users.find((user) => user.id === id && user.password === password);
    if (user) {
      setErrorMessage("");
      setFailedAttempts(0);
      localStorage.removeItem("failedAttempts");
      alert(`로그인 성공! 환영합니다, ${id}!`);
      console.log("Logged in successfully with ID:", id);
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      localStorage.setItem("failedAttempts", attempts);

      if (attempts >= 5) {
        const lockoutEnd = Date.now() + 60000;
        setIsLocked(true);
        localStorage.setItem("lockoutEnd", lockoutEnd);
        setErrorMessage("로그인 시도가 5번 실패했습니다. 1분 후에 다시 시도하세요.");
      } else {
        setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    }
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  return (
    <div className="login-container">
      <form
        method="post"
        id="loginForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="logo">
          <a href="/">
            <img src={logoImg} alt="KmlaOnline" />
          </a>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-control"
            //disabled={isLocked} 
          />
          {errors.id && <div className="error">{errors.id}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            //disabled={isLocked}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {isLocked && remainingTime > 0 && !isNaN(remainingTime) && (
          <div className="lockout-message">
            {`잠금 해제까지 남은 시간: ${remainingTime}초`}
          </div>
        )}
        <div className="form-group actions">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
            //disabled={isLocked} 
          >
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
          <span><Link to="/find-id">아이디</Link>찾기 / </span>
          <span><Link to="/find-password">비밀번호</Link>찾기 / </span>
          <span><Link to="/register">회원가입</Link>하기</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
