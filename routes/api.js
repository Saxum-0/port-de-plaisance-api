const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

// Routes pour les utilisateurs
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Routes pour les catways
router.post('/catways', catwayController.createCatway);
router.get('/catways', catwayController.getCatways);
router.get('/catways/:id', catwayController.getCatwayById);
router.put('/catways/:id', catwayController.updateCatway);
router.delete('/catways/:id', catwayController.deleteCatway);

// Routes pour les réservations
router.post('/catways/:id/reservations', reservationController.createReservation);
router.get('/catways/:id/reservations', reservationController.getReservations);
router.get('/catways/:id/reservations/:idReservation', reservationController.getReservationById);
router.delete('/catways/:id/reservations/:idReservation', reservationController.deleteReservation);





module.exports = router;
