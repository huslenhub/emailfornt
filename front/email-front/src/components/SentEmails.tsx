// src/components/SentEmails.tsx

import { useEffect, useState } from "react";
import "./SentEmails.css";

interface Email {
  to: string;
  subject: string;
  date: string;
  body: string;
}

const SentEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);


  useEffect(() => {
    fetch("http://localhost:8080/email/sent")
      .then((res) => {
        console.log("✅ 응답 상태 코드:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("📤 보낸 메일 원본 데이터:", data);

        // 개별 이메일 정보 출력
        data.forEach((email: Email, index: number) => {
          console.log(`📧 [${index + 1}] Email`);
          console.log("📨 To:", email.to);
          console.log("📌 Subject:", email.subject);
          console.log("📅 Date:", email.date);
          console.log("-------------------------------");
        });

        setEmails(data);
      })
      .catch((error) => console.error("❌ Error fetching sent emails:", error));
  }, []);

  return (
    <div className="sent-emails-container">
      <h2>📤 Sent Emails</h2>
      <ul className="email-list">
        {emails.map((email) => (
          <li className="email-item" onClick={() => setSelectedEmail(email)}>
            <p>
              <strong>To:</strong> {email.to}
            </p>
            <p>
              <strong>Subject:</strong> {email.subject}
            </p>
            <p>
              <strong>Date:</strong> {email.date}
            </p>
          </li>
        ))}
      </ul>

      {selectedEmail && (
        <div className="modal-overlay" onClick={() => setSelectedEmail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedEmail(null)}>✖</button>
            <h3>{selectedEmail.subject}</h3>
            <p><strong>To:</strong> {selectedEmail.to}</p>
            <p><strong>Date:</strong> {selectedEmail.date}</p>
            <hr />
            <pre className="email-body">{selectedEmail.body}</pre>
          </div>
        </div>
      )}

    </div>
  );
};


export default SentEmails;
