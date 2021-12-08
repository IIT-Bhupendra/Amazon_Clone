import React from "react";
import GradeIcon from "@mui/icons-material/Grade";
import "./CartItem.css";
import { useStateValue } from "./StateProvider";

function CartItem({ id, title, image, price, rating, hideDeleteOption }) {
  const [{ cart }, dispatch] = useStateValue();

  const RemoveFromCart = () => {
    console.log("triggered");
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={image} alt="" />
      </div>
      <div className="cartItem__Info">
        <h3 className="cartItem__title">{title}</h3>
        <div className="cartItem__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <GradeIcon />
            ))}
        </div>
        <p className="cartItem__availability">In stock</p>
        <img
          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png"
          alt=""
          className="cartItem__assurance"
        />
        <div className="cartItem__actionLinks">
          <p>Qty: 1</p>
          {!hideDeleteOption && (
            <>
              | <span onClick={RemoveFromCart}>Delete</span>
            </>
          )}
          {/* <a>See more like this</a> */}
        </div>
      </div>
      <div className="cartItem__price">
        <h3>
          <small>₹</small>
          {price}
        </h3>
      </div>
    </div>
  );
}

export default CartItem;
