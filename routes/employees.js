const express = require('express');

const {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employee');

const router = express.Router();

router.route('/').get(getEmployees).post(addEmployee);
router.route('/:id').delete(deleteEmployee).put(updateEmployee);

module.exports = router;
