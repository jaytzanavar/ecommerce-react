import { createContext, useContext, useReducer } from "react";
import { faker, Randomizer } from "@faker-js/faker";
import { cartReducer, productReducer } from "./reducers";

const Cart = createContext();

const Context = ({ children }) => {
  // faker.seed(99);
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(),
    inStock: faker.random.numeric(2, {
      allowingZeroes: true,
      bannedDigits: [],
    }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.numeric(5).split('')[0],
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [prodState, prodDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  return (
    <Cart.Provider value={{ state, dispatch, prodState, prodDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
