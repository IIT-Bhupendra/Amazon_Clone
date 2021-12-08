import React from "react";
import Subtotal from "./Subtotal";
import CartItem from "./CartItem";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";
import "./Checkout.css";

function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();
  console.log(cart);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <h3 className="checout__userName">{user && "Hello, " + user?.email}</h3>
        <h2 className="checkout__title">Shopping Cart</h2>
        {/* <FlipMove> */}
        {cart.map((item) => (
          <CartItem
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
        {/* </FlipMove> */}
      </div>
      <div className="checkout__right">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
          alt=""
          className="checkout__image"
        />
        <Subtotal />
        {/* Cart total payment integration */}
        {/* Advertised Products Are Here */}
      </div>
    </div>
  );
}

export default Checkout;
