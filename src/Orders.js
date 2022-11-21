import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import db from "./firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import "./Orders.css";
import { async } from "@firebase/util";
import stringify from "fast-json-stable-stringify";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Orders() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (user) {
      const ordersRef = query(
        collection(db, `users/${user.uid}/orders`),
        orderBy("create", "desc")
      );

      onSnapshot(ordersRef, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) =>
            stringify({ id: doc.id, data: doc.data() })
          )
        );
      });
    } else {
      setOrders([]);
    }
  }, []);

  if(orders && user)
    return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );

  return <>
  <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  </>;
}

export default Orders;
