const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51K3RPrSCmdeno7hiWnEirWbH4p2pfq89g0IAwOFezkPs4luMOZCXMDk4vCcZSDUxHxOpvFuAVnDhIjICkQJZXkqT00iCLEjx5c"
);

// API

// App Config
const app = express();

// MiddleWare
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request for the amount of >>>> " + total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);
