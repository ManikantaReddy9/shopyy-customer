import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load Firebase Admin credentials
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// New Order API
app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;

    // Save order to Firestore
    await db.collection("orders").add(order);

    // Get admin token from Firestore
    const adminDoc = await db.collection("adminTokens").doc("admin1").get();
    const adminToken = adminDoc.data()?.token;

    if (adminToken) {
      // Send push notification
      await admin.messaging().send({
        token: adminToken,
        notification: {
          title: "New Order",
          body: `Order from ${order.customerName}`
        }
      });
    }

    res.status(200).json({ message: "Order placed & notification sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
