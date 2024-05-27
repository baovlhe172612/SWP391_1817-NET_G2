// src/helpers/session.js

export const setSessionItem = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error setting session item:", error);
    }
  };
  
  export const getSessionItem = (key) => {
    try {
      const serializedValue = sessionStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error("Error getting session item:", error);
      return null;
    }
  };
  
  export const removeSessionItem = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing session item:", error);
    }
  };
  
  export const clearSession = () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };
  