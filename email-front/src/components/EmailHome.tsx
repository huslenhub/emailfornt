// src/components/EmailHome.tsx

import { Link } from 'react-router-dom';
import './EmailHome.css';
const EmailHome = () => {
  return (
    <div className="email-home">
      <h2>Email Home</h2>
      <div>
        <Link to="/sent-emails">
          <button>Sent Emails</button>
        </Link>
      </div>
      <div>
        <Link to="/received-emails">
          <button>Received Emails</button>
        </Link>
      </div>
      <div>
        <Link to="/email-send">
          <button>Compose Email</button>
        </Link>
      </div>
    </div>
  );
};

export default EmailHome;
