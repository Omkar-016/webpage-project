const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getRegister = (req, res) => res.render('register');

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send('User with that email already exists');
  }
  const hash = await bcrypt.hash(password, 10);
  await new User({ username, email, password: hash }).save();
  res.redirect('/auth/login');
};

exports.getLogin = (req, res) => res.render('login');

exports.postLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};
