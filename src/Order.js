import React from "react";
import CartItem from "./CartItem";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import moment from "moment";
import "./Order.css";

function Order({ order }) {
  const orderObj = JSON.parse(order);
  return (
    <div className="order">
      <h2> Order </h2>
      <p>{moment.unix(orderObj.data.create).format("MMMM Do YYYY, h:mma")}</p>
      <p>
        {orderObj.data.cart?.map((item) => (
          <CartItem
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideDeleteOption={true}
          />
        ))}
      </p>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__price">
            Order Total: <strong>{value}</strong>
          </h3>
        )}
        decimalScale={2}
        value={orderObj.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
