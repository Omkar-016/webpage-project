const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const cartItems = await Promise.all(user.cart.map(async (item) => {
    const product = await Product.findById(item.productId);
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  }));
  res.render('cart', { cartItems });
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.session.userId);

  const existingItem = user.cart.find(item => item.productId.toString() === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    user.cart.push({ productId, quantity: 1 });
  }
  await user.save();
  res.redirect('/cart');
};
