import React, { useState } from "react";


const lang = (category, section, key) => {
  const translations = {
    user: {
      register: {
        title: "회원 가입",
        tos: `이용약관에 동의합니다.
        개인정보 수집 및 이용에 동의합니다.`,
        "accept tos": "이용약관에 동의합니다.",
        required: "필수 입력사항",
        optional: "선택 사항",
        "password check": "비밀번호 확인",
        "ok": "가입하기",
      },
    },
    generic: {
      id: "아이디",
      password: "비밀번호",
      email: "이메일",
      picture: "프로필 사진",
      "choose file": "파일 선택",
    },
  };
  return translations[category]?.[section]?.[key] || key;
};


const nl2br = (text) => {
  if (typeof text !== "string") {
    return text;
  }
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const Register = () => {
  const [formData, setFormData] = useState({
    s_id: "",
    s_pw: "",
    s_pw_check: "",
    s_email: "",
    n_wave: "",
    s_kor_name: "",
    s_eng_name: "",
    n_birth_date_yr: "",
    n_birth_date_month: "",
    n_birth_date_day: "",
    n_gender: "",
    n_student_id: "",
    s_room: "",
    n_grade: "",
    s_class: "",
    s_status_message: "",
    s_homepage: "",
    s_phone: "",
    s_interest: "",
  });

  const [tosAgree, setTosAgree] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTosChange = () => {
    setTosAgree(!tosAgree);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptcha(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="register-container">
      <h1>{lang("user", "register", "title")}</h1>
      <h2>{lang("generic", "tos")}</h2>
      <div
        style={{
          width: "640px",
          height: "240px",
          overflow: "auto",
          margin: "0 auto",
          textAlign: "left",
          border: "1px solid gray",
          padding: "5px",
        }}
      >
        <p>{nl2br(lang("user", "register", "tos"))}</p>
        <hr />
        <div className="form-group">
          <label htmlFor="chk_n_tos_agree">
            <input
              type="checkbox"
              id="chk_n_tos_agree"
              name="n_tos_agree"
              checked={tosAgree}
              onChange={handleTosChange}
              required
            />
            {lang("user", "register", "accept tos")}
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <table style={{ margin: "20px auto", width: "800px" }}>
          <tr>
            <th style={{ width: "400px" }}>
              <h2>{lang("user", "register", "required")}</h2>
            </th>
            <th style={{ width: "20px" }}></th>
            <th style={{ width: "400px" }}>
              <h2>{lang("user", "register", "optional")}</h2>
            </th>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <table style={{ width: "100%" }} className="table-register-data">
                <tr>
                  <th style={{ width: "120px" }}>{lang("generic", "id")}</th>
                  <td style={{ width: "240px" }}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="s_id"
                        value={formData.s_id}
                        onChange={handleChange}
                        placeholder="3글자 이상 영문자/숫자/-/_ 조합"
                        className="form-control"
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "120px" }}>{lang("generic", "password")}</th>
                  <td>
                    <div className="form-group">
                      <input
                        type="password"
                        name="s_pw"
                        value={formData.s_pw}
                        onChange={handleChange}
                        placeholder="6글자 이상"
                        className="form-control"
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "120px" }}>
                    {lang("user", "register", "password check")}
                  </th>
                  <td>
                    <div className="form-group">
                      <input
                        type="password"
                        name="s_pw_check"
                        value={formData.s_pw_check}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "120px" }}>{lang("generic", "email")}</th>
                  <td>
                    <div className="form-group">
                      <input
                        type="email"
                        name="s_email"
                        value={formData.s_email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </td>
                </tr>
                {/* Add other fields similarly */}
              </table>
            </td>

            <td></td>
            <td style={{ verticalAlign: "top" }}>
              <table style={{ width: "100%" }} className="table-register-data">
                <tr>
                  <th style={{ width: "120px" }}>{lang("generic", "picture")}</th>
                  <td>
                    <div className="upper-file">
                      <input type="file" name="s_pic" style={{ width: "100%" }} />
                      <span>{lang("generic", "choose file")}</span>
                    </div>
                  </td>
                </tr>
                {/* Continue with other form fields */}
              </table>
            </td>
          </tr>
        </table>

        <div>
          <button type="submit" className="btn btn-primary btn-lg">
            {lang("user", "register", "ok")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
