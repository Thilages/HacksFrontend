import { useState, useEffect } from "react";
import { auth } from "../firebase";

const UserStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}</p>
          <img src={user.photoURL} alt="User Avatar" className="rounded-full w-12 h-12" />
        </div>
      ) : (
        <p>Please log in using one of the OAuth providers.</p>
      )}
    </div>
  );
};

export default UserStatus;
