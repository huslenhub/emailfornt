// src/App.tsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailHome from './components/EmailHome';
import SentEmails from './components/SentEmails';
import ReceivedEmails from './components/inboxEmails';
import EmailSend from './components/sendEmail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmailHome />} />
          <Route path="/sent-emails" element={<SentEmails />} />
          <Route path="/received-emails" element={<ReceivedEmails />} />
          <Route path="/email-send" element={<EmailSend />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
