// src/components/ReceivedEmails.tsx

import { useEffect, useState } from 'react';
import './InboxEmails.css';
const ReceivedEmails = () => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    // 예시로 받은 이메일을 리스트로 추가
    setEmails([
      'Subject: Welcome, From: user@example.com',
      'Subject: Meeting Reminder, From: user2@example.com',
    ]);
  }, []);

  return (
    <div>
      <h2>Received Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedEmails;
