const Table = require('../models/Table');

// Create a new table
const createTable = async (req, res) => {
  const { id, seats, floor } = req.body;

  try {
    const newTable = new Table({ id, seats, floor });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ message: 'Error creating table', error });
  }
};

// Get all tables
const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error });
  }
};

// Get tables by floor
const getTablesByFloor = async (req, res) => {
  const { floor } = req.params;
  try {
    const tables = await Table.find({ floor });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables by floor', error });
  }
};

// Update a table's information (like seats or floor)
const updateTable = async (req, res) => {
  const { _id } = req.params;
  const { id, seats, floor } = req.body;

  try {
    const table = await Table.findOneAndUpdate(
      { _id },
      { id, seats, floor },
      { new: true }
    );
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error updating table', error });
  }
};

// Delete a table
const deleteTable = async (req, res) => {
  const { _id } = req.params;

  try {
    const table = await Table.findOneAndDelete({ _id });
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
};

module.exports = {
  createTable,
  getTables,
  getTablesByFloor,
  updateTable,
  deleteTable,
};
