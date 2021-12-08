import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import "./App.css";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

function App() {
  const [{}, dispatch] = useStateValue();

  const promise = loadStripe(process.env.React_App_API_STRIPE_KEY);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User signed In
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
