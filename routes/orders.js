const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, orderController.getOrders);
router.post('/checkout', isAuthenticated, orderController.checkout);

module.exports = router;
