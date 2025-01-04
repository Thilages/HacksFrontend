// src/components/LogoutButton.jsx
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded-md">
      Log Out
    </button>
  );
};

export default LogoutButton;
