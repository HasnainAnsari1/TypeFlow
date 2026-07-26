import { useState, useEffect } from 'react';

// 'T' ka matlab hai "Jo bhi data type aap pass karoge" (Task[], string, number, etc.)
export function useLocalStorage<T>(key: string, initialValue: T) {
  
  // 1. LocalStorage se initial value read karo
  const [value, setValue] = useState<T>(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      return JSON.parse(savedData); // Agar pehle se data hai toh wo use karo
    }
    return initialValue; // Warna initial value return karo
  });

  // 2. Jab bhi 'value' change ho, use LocalStorage me save kardo
  useEffect(() => {
    localStorage.stringify
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 3. Simple array return karo (jaise normal useState karta hai)
  return [value, setValue] as const;
}