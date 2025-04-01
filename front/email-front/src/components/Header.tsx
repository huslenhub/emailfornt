import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    console.log("요청을 보냅니다: /email/api/recent-email-sender");

    fetch("http://localhost:8080/email/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 오류");
        }
        return response.text(); // response.json()을 호출하여 JSON을 반환받습니다
      })
      .then((data) => {
        setUserEmail(data); // 상태에 데이터 설정
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, []);

  return (
    <header className="header">
      <Link to="/" className="home-button">🏠 Home</Link>
      <div className="user-info">
        {userEmail ? `📧 ${userEmail}` : "로그인 필요"}
      </div>
    </header>
  );
};

export default Header;