// src/components/SentEmails.tsx

import  { useEffect, useState } from 'react';
import './SentEmails.css';
const SentEmails = () => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    // 예시로 이메일을 리스트로 추가
    setEmails([
      'Subject: Test 1, To: user@example.com',
      'Subject: Test 2, To: user2@example.com',
    ]);
  }, []);

  return (
    <div>
      <h2>Sent Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default SentEmails;
