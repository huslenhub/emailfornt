// src/components/EmailSend.tsx

import  { useState } from 'react';
import './SendEmail.css';
const SendEmail = () => {

      const [recipient, setRecipient] = useState("");
      const [subject, setSubject] = useState("");
      const [body, setBody] = useState("");
    
      const handleSend = async () => {
        const requestData = { recipient, subject, body };
    
        try {
          const response = await fetch("http://localhost:8080/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
          });
    
          const result = await response.text();
          alert(result); // 이메일 전송 후 응답 처리
        } catch (error) {
          console.error("Error sending email:", error);
          alert("Error sending email.");
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
          <button onClick={handleSend}>Send Email</button>
        </div>
      );
    };

export default SendEmail;
