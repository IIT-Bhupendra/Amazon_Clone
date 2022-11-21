import React from "react";
import "./Product.css";
import GradeIcon from "@mui/icons-material/Grade";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ cart }, dispatch] = useStateValue();
  // console.log(cart);

  const AddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })    
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <div className="product__rating">
          <p className="product__price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <p>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <GradeIcon className="product__ratingColor" />
              ))}
          </p>
        </div>
      </div>
      <img src={image} alt="" className="product__image" />
      <button onClick={AddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
