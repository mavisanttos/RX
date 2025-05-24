const router = require('express').Router();
const ctrl   = require('../controllers/bookingController');

router.get('/',        ctrl.getAll);
router.get('/:id',     ctrl.getById);
router.post('/',       ctrl.create);
router.put('/:id',     ctrl.update);   // só status por enquanto
router.delete('/:id',  ctrl.remove);

module.exports = router;
