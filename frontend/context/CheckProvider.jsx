import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckContext = createContext();

export const CheckProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  // New state

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("auth_token");
        const savedIsAdmin = await AsyncStorage.getItem("is_admin");
       
        if (savedToken ) {
          setToken(savedToken);
         
           // Access granted
        } 
        if(JSON.parse(savedIsAdmin) === true){
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error checking access:", error);
        setToken(null);
        setIsAdmin(false);
         // Access denied on error
      }
    };

    checkAccess();
  }, []);

  return (
    <CheckContext.Provider value={{ isAdmin, token }}>
      {children}
    </CheckContext.Provider>
  );
};

export const useCheck = () => {
  return useContext(CheckContext);
};
