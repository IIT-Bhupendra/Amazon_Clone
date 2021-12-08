import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import { useNavigate } from "react-router";

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <div className="subtotal__generalDescription">
              <CheckCircleIcon />
              <small>
                Part of your order qualifies for FREE Delivery. Select this
                option at checkout. Details
              </small>
            </div>
            <h3 className="subtotal__price">
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </h3>
            <button
              onClick={() => navigate("/payment")}
              className="subtotal__proceed"
            >
              Proceed to Buy
            </button>
            {/* Add Dropdown for EMI Option */}
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default Subtotal;
