import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import './signup.css'


const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    email: "",
    phone: "",
    bio: "",
    tos: false,
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordConditions, setPasswordConditions] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
  });
  


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
  
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  
    const newErrors = { ...errors };
    if (name === "id" && !value.trim()) {
      newErrors.id = "아이디는 필수 입력사항입니다.";
    } else if (name === "id") {
      delete newErrors.id;
    }
  
    if (name === "password") {
      const conditions = {
        minLength: value.length >= 8 && value.length <=20,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
      };
      setPasswordConditions(conditions);
  
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setErrors((prev) => {
          const { confirmPassword, ...rest } = prev;
          return rest;
        });
      }
    }
  
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      } else {
        delete newErrors.confirmPassword;
      }
    }
  
    if (name === "email") {
      if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "유효한 이메일을 입력해주세요.";
      } else {
        delete newErrors.email;
      }
    }
  
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
  
    const newErrors = { ...errors };
  
    if (name === "id" && !value.trim()) {
      newErrors.id = "아이디는 필수 입력사항입니다.";
    } else if (name === "id") {
      delete newErrors.id;
    }
  
    if (name === "password") {
      if (!value.trim() || value.length < 8) {
        newErrors.password = "비밀번호는 8자리 이상이어야 합니다.";
      } else {
        delete newErrors.password;
      }
    }
  
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      } else {
        delete newErrors.confirmPassword;
      }
    }
  
    if (name === "email") {
      if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "유효한 이메일을 입력해주세요.";
      } else {
        delete newErrors.email;
      }
    }
  
    setErrors(newErrors);
  };
  
  

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "아이디는 필수 입력사항입니다.";
    if (!formData.password.trim() || formData.password.length < 8)
      newErrors.password = "비밀번호는 8자리 이상이어야 합니다.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "유효한 이메일을 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBefore = () => {
    setStep(1);
  }


  const handleSubmit = () => {
    if (formData.tos && formData.privacy) {
      alert("회원가입이 완료되었습니다!");
      navigate('/login');
      
    } else {
      alert("모든 이용약관에 동의해야 합니다.");
    }
  };

  return (
    <div className="register-container">
      {step === 1 && (
        <div>
          <h2>회원가입</h2>
          <form>
            <div>
              <label>아이디*</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                onBlure={handleBlur}
                className="form-control"
              />
              {errors.id && <p className="error">{errors.id}</p>}
            </div>
            <div>
              <label>비밀번호*</label>
              <input
                type="password"
                name="password"
                placeholder='8~20자리'
                value={formData.password}
                onChange={handleInputChange}
                onBlure={handleBlur}
                className="form-control"
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <ul className="password-conditions">
                <li style={{ color: passwordConditions.minLength ? "green" : "red" }}>
                  8~20자리
                </li>
                <li style={{ color: passwordConditions.hasUppercase ? "green" : "red" }}>
                  영어 대문자 포함
                </li>
                <li style={{ color: passwordConditions.hasLowercase ? "green" : "red" }}>
                  영어 소문자 포함
                </li>
              </ul>
            </div>
            <div>
              <label>비밀번호 확인*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlure={handleBlur}
                className="form-control"
              />
              {errors.confirmPassword && 
                <p className="error">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label>이메일*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlure={handleBlur}
                className="form-control"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>전화번호</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div>
              <label>자기소개</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button className="btn" id="btn-right" type="button" onClick={handleNext}>
              다음
            </button>
          </form>
          <div className="links">
            <br/>
              <span><Link to="/login">로그인</Link>하기 / </span>
              <span><Link to="/find-id">아이디</Link>찾기 / </span>
              <span><Link to="/find-password">비밀번호</Link>찾기</span>
                  
          </div>
        </div>
      )}

      {step === 2 && (

        
        <div>
          
          <h2>이용약관 동의</h2>

          <label>
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
              />
              개인정보처리방침에 동의합니다.(필수)
          </label>
          
          <div className="tos-box">
            <h3>개인정보처리방침</h3>
            <p>1. 민족사관고등학교 과학기술부(이하 ‘과기부’)는 회원의 개인정보를 
            중요시하며, 개인정보의 보호와 관련하여 개인정보 보호법, EU의 
            일반 개인정보 보호법(GDPR) 등 개인정보와 관련된 법령에 의거한 
            개인정보처리 방침을 제공합니다.</p>
            
            <p>2. 과기부는 회원의 동의를 바탕으로 개인정보를 수집.이용 및 제공하며 
            개인정보처리 방침을 바탕으로 회원의 개인정보를 처리하고 있습니다.</p>
            
            <p>3. kmlaonline 개인정보처리 방침은 kmlaonline 외에도 학교 행사에서 
            사용하는 모든 과기부 서비스 (일명 ‘민사페이’)에 적용됩니다.</p>
            
            <p>4. 사용자가 kmlaonline에 제출하거나 업로드하는 모든 콘텐츠를 포함한 
            사용자가 kmlaonline에 저장하는 데이터의 소유권은 해당 사용자에게 
            있음.</p>



            <h3>1. kmlaonline에서 수집하는 정보</h3>
            <p>kmlaonline은 사용자가 생성하거나 제공하는 정보를 수집합니다.</p>
            
            <p>1. 계정 가입시 아래의 정보를 수집합니다.
            - 필수 정보: 한글 및 영어 이름, 생년월일, 전화번호, 계정 ID 및 
              비밀번호, 이메일 주소, 학번
            - 선택 정보: 전화번호, 관심사(분야), 기숙사 방 번호</p>
            
            <p>2. 본인인증시 아래의 정보를 수집합니다.
            - 필수 정보: 이름, 학번, 이메일 주소
            - 선택 정보: 전화번호</p>
            
            <p>3. 웹서비스 이용시 단말기정보 (OS, 화면사이즈, 디바이스 아이디, 
            폰기종, 단말기 모델명), IP주소, 쿠키, 방문일시, 부정이용기록, 
            서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다. 
            그 외에도 사용자가 서비스를 이용하면서 생성, 업로드하거나 다른 
            사람에게 받는 콘텐츠를 모두 수집합니다.</p>

            

            <h3>2. 개인정보의 사용 및 파기</h3>
            <p>개인정보는 회원관리, 서비스 제공을 위해 이용합니다. 회원 가입시 
              또는 서비스 이용 과정에서 홈페이지를 통해 아래와 같이 서비스 
              제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.</p>
            <p>1. 회원 식별/가입의사 확인, 본인 확인, 부정이용 방지
            - 다양한 서비스 제공, 공지사항 전달
            - 계정 도용에 대한 방지 및 제재
            - 개인정보 보호 측면에서의 UX 제공</p>
            <p>2. 수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기 사유가 발생한 
              개인정보는 복구 및 재생되지 않도록 삭제합니다.</p>
            <p>3. 서비스 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 
              수정할 수 있으며, 과기부의 개인정보 처리에 동의하지 않는 경우 
              제공에 대한 동의 철회 또는 가입해지를 요청할 수 있습니다.</p>
            <p>4. 이용자는 개인정보 오류가 있는 경우 그에 대한 정정을 요청할 수 있으며 
              회원정보수정 메뉴에서 본인 확인 절차 후 ‘개인정보변경’이 가능합니다.</p>
            <p>5. 서비스 이용자는 계정을 삭제할 때 kmlaonline에 데이터 삭제를 요청할 
              권리가 있습니다.</p>
            <p>6. 데이터 종류별 보관 기간</p>



            <h3>3. 개인정보 제공(제3자)</h3>
            <p>과기부는 서비스 이용자의 별도 동의가 있거나 법령에 규정된 경우를 
              제외하고 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
            
            <p>제3자에게 제공하는 경우는 다음과 같습니다.</p>
            
            <p>개인정보를 수집한 목적 범위에서 개인정보를 제공하는 경우
              정부 기관 혹은 민족사관고등학교에서의 정보 제공 요청이 있는 경우</p>

            <p>서비스 이용자는 언제든지 등록된 자신의 개인정보를 조회하거나 
              수정할 수 있으며, 과기부의 개인정보의 처리에 동의하지 않는 경우 
              제공에 대한 동의 철회 또는 가입해지를 요청할 수 있습니다.</p>

          </div>
          <label>
              <input
                type="checkbox"
                name="tos"
                checked={formData.tos}
                onChange={handleInputChange}
              />
              이용약관에 동의합니다.(필수)
          </label>
          <div className="tos-box">
            <h3>이용약관</h3>
            <h3>제1조(목적)</h3>
            <p>본 약관은 민족사관고등학교 과학기술부(이하 '과기부')가 제공하는 
              kmlaonline 및 관련 서비스(이하 '서비스')의 이용과 관련하여 
              과기부와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 
              규정함을 목적으로 합니다.</p>
            
            <h3>제2조(용어정의)</h3>
            <p>1. 회원: 본 약관에 동의하고 서비스를 이용하는 모든 이용자를 말합니다. </p>
            <p>2. 서비스: 과기부가 제공하는 kmlaonline 및 학교 행사 관련 모든 부가 서비스를 의미합니다.</p>
            <p>3. 아이디(ID): 회원 식별과 서비스 이용을 위해 회원이 설정하고 과기부가 승인한 고유의 문자 및 숫자를 말합니다.</p>
            <p>4.비밀번호: 회원의 개인정보 보호를 위해 회원 자신이 설정한 문자와 숫자의 조합을 말합니다.</p>  
            
            <h3>제3조(개인정보 수집)</h3>
            <p>kmlaonline은 회원의 동의를 바탕으로 아래와 같은 정보를 수집합니다:</p>
            <span>1. 계정 가입 시</span>
            <span>- 필수 정보: 한글 및 영어 이름, 생년월일, 전화번호, 계정 ID 및 비밀번호, 이메일 주소, 학번</span>
            <span>- 선택 정보: 전화번호, 관심사(분야), 기숙사 방 번호</span>
            
          </div>
          
          <button className="btn" type="button" onClick={handleBefore}>
            이전
          </button>
          <button className="btn" id="btn-right" type="button" onClick={handleSubmit}>
            가입완료
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
