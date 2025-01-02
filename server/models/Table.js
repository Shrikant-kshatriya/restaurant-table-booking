const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  floor: {
    type: String, 
    enum: ['ground', 'first'], 
    required: true,
  },
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
