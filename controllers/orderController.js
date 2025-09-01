const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.session.userId }).sort({ date: -1 });
  res.render('orders', { orders });
};

exports.checkout = async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user.cart.length) return res.redirect('/cart');

  const products = user.cart.map(item => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  let total = 0;
  for (const item of user.cart) {
    const product = await Product.findById(item.productId);
    total += product.price * item.quantity;
  }

  await new Order({ userId: user._id, products, total }).save();

  user.cart = [];
  await user.save();

  res.redirect('/orders');
};
