// routes/reportRoute.js
const express = require('express');
const ReportController = require('../Controller/reportController');

const router = express.Router();

router.post('/Reports', ReportController.addReport);

router.get('/Reports', ReportController.getAllReports);
router.get('/User_Reports/:user_id', ReportController.getReportsByUserId);

router.put('/Reports/:id', ReportController.updateReport);
router.delete('/Reports/:id', ReportController.deleteReport);

module.exports = router;
