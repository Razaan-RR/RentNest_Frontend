"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getUser,
  removeAuthData,
} from "@/lib/storage";


const AuthContext = createContext<any>(null);



export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [user, setUser] = useState(null);


  useEffect(() => {

    const storedUser = getUser();

    setUser(storedUser);

  }, []);



  const logout = () => {

    removeAuthData();

    setUser(null);

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth(){

  return useContext(AuthContext);

}