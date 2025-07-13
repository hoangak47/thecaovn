"use client"; // phải dùng vì Context liên quan tới state (client side)

import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  use,
  useEffect,
} from "react";

// Tạo Context
const GlobalContext = createContext();

// Tạo Provider
export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${url}danh-muc?search=san-pham`)
      .then((response) => setProducts(response.data));
  }, []);

  const [menu, setMenu] = useState([]);

  return (
    <GlobalContext.Provider value={{ menu, setMenu, products }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Tạo custom hook để dễ dùng
export const useGlobalContext = () => useContext(GlobalContext);
