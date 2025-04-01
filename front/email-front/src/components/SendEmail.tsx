

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가
import "./SendEmail.css";

const SendEmail = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false); // 이메일 전송 중 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null); // 파일 삭제
  };

  const handleSend = async () => {
    if (!recipient || !subject || !body) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    

    const formData = new FormData();
    formData.append("recipient", recipient);
    formData.append("subject", subject);
    formData.append("body", body);
    if (file) {
      formData.append("file", file);
    }

    setIsSending(true); // 이메일 전송 시작
    
    try {
      const response = await fetch("http://localhost:8080/email/send", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("메일 전송 실패");
      }

    
      alert("메일 전송 성공!");

      // 서버 응답 받은 후 보낸 메일 목록으로 이동
      navigate("/");
    } catch (error) {
      console.error("❌ 메일 전송 오류:", error);
      alert("메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsSending(false); // 이메일 전송 완료
    }
  };

  return (
    <div className="email-send-container">
      <h2>📧 Send Email</h2>
      <input
        type="email"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Email Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <input type="file" onChange={handleFile} />

      {file && (
        <div className="file-preview">
          <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
          <button onClick={handleRemoveFile} className="remove-file-button">❌ 삭제</button>
        </div>
      )}

      <button onClick={handleSend} disabled={isSending}>
        {isSending ? "📨 이메일 보내는 중..." : "📧 Send Email"}
      </button>
    </div>
  );
};

export default SendEmail;
