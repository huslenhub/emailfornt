import { useEffect, useState } from "react";
import "./InboxEmails.css";

interface Email {
  from: string;
  subject: string;
  date: string;
  body: string;
  attachments: string[]; 
}

const InboxEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/email/inbox")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmails(data);
      })
      .catch((error) => console.error("❌ Error fetching inbox emails:", error));
  }, []);

  return (
    <div className="inbox-emails-container">
      <h2>📥 Inbox Emails</h2>
      <ul className="email-list">
        {emails.map((email, index) => (
          <li key={index} className="email-item" onClick={() => setSelectedEmail(email)}>
            <p>
              <strong>From:</strong> {email.from}
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
            <p><strong>From:</strong> {selectedEmail.from}</p>
            <p><strong>Date:</strong> {selectedEmail.date}</p>
            <hr />
            <pre className="email-body">{selectedEmail.body}</pre>
            {selectedEmail.attachments.length > 0 && (
              <>
                <h4>📎 Attachments:</h4>
                <ul className="attachment-list">
                  {selectedEmail.attachments.map((link, idx) => (
                    <li key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        Download Attachment {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxEmails;
