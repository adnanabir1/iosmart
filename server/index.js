const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// MiddleWare

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mudgl1n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const usersCollection = client.db("iosMartDB").collection("users");
    const productsCollection = client.db("iosMartDB").collection("products");

    app.post("/user", async (req, res) => {
      const userData = req.body;
      const filter = { email: userData.email };
      const existingUser = await usersCollection.findOne(filter);
      if (existingUser) {
        return res.send({ message: "User Already Exists" });
      }

      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/product", async (req, res) => {
      const userData = req.body;
      const result = await productsCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/product/:id", async (req, res) => {
      const id = req.params.id;
      const updateProductInfo = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateProduct = {
        $set: {
          price: updateProductInfo.price,
          pictureUrl: updateProductInfo.pictureUrl,
          ram: updateProductInfo.ram,
          rom: updateProductInfo.rom,
          additionalInfo: updateProductInfo.additionalInfo,
        },
      };
      const result = await productsCollection.updateOne(filter, updateProduct);
      res.send(result);
    });

    app.patch("/users/role/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateUserRole = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateUserRole);
      res.send(result);
    });

    app.patch("/users/role/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateUserRole = {
        $set: {
          role: "user",
        },
      };
      const result = await usersCollection.updateOne(filter, updateUserRole);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(filter);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
