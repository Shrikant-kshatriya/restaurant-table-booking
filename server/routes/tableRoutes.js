const express = require('express');
const router = express.Router();
const { createTable, getTables, getTablesByFloor, updateTable, deleteTable } = require('../controllers/tablecontroller');

router.post('/', createTable);

router.get('/', getTables);

router.get('/:floor', getTablesByFloor);

router.put('/:_id', updateTable);

router.delete('/:_id', deleteTable);

module.exports = router;
