const router = require('express').Router();
const ctrl   = require('../controllers/predefinedTimeController');

router.get('/',       ctrl.getAll);
router.get('/:id',    ctrl.getById);   // somente leitura

module.exports = router;
