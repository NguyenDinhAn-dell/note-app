import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [ user, setUser ] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log(`[from AuthProvider]`, { user });
      if (user?.uid) {
        setUser(user);
        if(user.accessToken !== localStorage.getItem("accessToken")){
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate('/login');
    });
    return () => {
      unsubcribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <></> :children}
    </AuthContext.Provider>
  );
}
