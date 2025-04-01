import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // 여기서 실제 로그인 정보를 가져와야 합니다 (예: API 호출)
    // 임시 데이터로 설정
    setUserEmail("khuslenonlytube@gmail.com");
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
