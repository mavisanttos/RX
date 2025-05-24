const router = require('express').Router();

router.use('/users',           require('./userRoutes'));
router.use('/rooms',           require('./roomRoutes'));
router.use('/times',           require('./predefinedTimeRoutes'));
router.use('/bookings',        require('./bookingRoutes'));

router.get('/', (_, res) => res.json({ message: 'RX API v1' }));

module.exports = router;
