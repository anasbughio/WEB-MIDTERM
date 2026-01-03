const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Item = require('../models/Item');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const txns = await Transaction.find().sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create transaction (sale)
router.post('/', async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.quantity < quantity) return res.status(400).json({ error: 'Not enough stock' });
    
    const total = quantity * item.price;
    const txn = new Transaction({
      itemId,
      itemName: item.name,
      quantity,
      pricePerUnit: item.price,
      total
    });
    const saved = await txn.save();
    
    // Reduce item quantity
    item.quantity -= quantity;
    await item.save();
    
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get revenue summary
router.get('/summary/revenue', async (req, res) => {
  try {
    const txns = await Transaction.find();
    const total = txns.reduce((s, t) => s + t.total, 0);
    const count = txns.length;
    res.json({ total, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
