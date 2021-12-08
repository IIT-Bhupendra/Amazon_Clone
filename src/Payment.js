import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import { useNavigate } from "react-router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import db from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const [{ cart, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log("Client secrets are >> " + clientSecret);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        if (user) {
          setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
            cart: cart,
            amount: paymentIntent.amount / 100,
            create: paymentIntent.created,
          });
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate("/orders");
      });

    dispatch({ type: "EMPTY_THE_CART" });
  };

  const handleOnChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout ({cart.length} items)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>A-Block</p>
            <p>Sandeep Mahesh Nagar, Bangalore</p>
            <p>India - 383002</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items & Delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => (
              <CartItem
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__strip">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleOnChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3 className="payment__price">
                      Subtotal ({cart.length} items): <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
              <button
                className="payment__BuyNowBtn"
                disabled={processing || disabled || succeeded}
              >
                <span>{processing ? <p>processing</p> : <p>Buy Now</p>}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
