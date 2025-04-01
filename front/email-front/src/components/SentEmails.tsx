// src/components/SentEmails.tsx

import { useEffect, useState } from "react";
import "./SentEmails.css";

interface Email {
  id: string;  
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
        return res.json();
      })
      .then((data) => {
        setEmails(data);
      })
      .catch((error) => console.error("❌ Error fetching sent emails:", error));
  }, []);

  return (
    <div className="sent-emails-container">
      <h2>📤 Sent Emails</h2>
      <ul className="email-list">
        {emails.map((email) => (
          <li  key={email.id} className="email-item" onClick={() => setSelectedEmail(email)}>
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
