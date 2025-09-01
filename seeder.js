require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany();
  await Product.insertMany([
    { name: "Smartphone", description: "Android 13, 128GB", price: 599, image: "" },
    { name: "Laptop", description: "Intel i7, 16GB RAM", price: 1099, image: "" },
    { name: "Bluetooth Headphones", description: "Noise Cancelling", price: 199, image: "" }
  ]);
  console.log("Database seeded!");
  process.exit();
});
