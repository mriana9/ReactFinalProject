import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext(null);
export const CartContextProvider = ({ children }) => {
  //console.log("CartContext Provider initialized");
  const [cartItems, setCartItems] = useState(0);

  const getCartsItems = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BURL}/Carts`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        setCartItems(res.data.cartResponse.length);
      } else {
        console.log("Failed to fetch cart items", res.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useState(() => {
    getCartsItems();
  });
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
