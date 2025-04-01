// src/App.tsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EmailHome from './components/EmailHome';
import SentEmails from './components/SentEmails';
import ReceivedEmails from './components/InboxEmails';
import EmailSend from './components/SendEmail';

const App = () => {
  return (

    <Router>
      <div className="App">
      <Header />
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
