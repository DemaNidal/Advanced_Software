// routes/reportRoute.js
const express = require('express');
const ReportController = require('../Controller/reportController');

const router = express.Router();

router.post('/add-report', ReportController.addReport);
router.get('/all-reports', ReportController.getAllReports);
router.get('/user-reports/:user_id', ReportController.getReportsByUserId);
router.put('/update-report/:report_id', ReportController.updateReport);
router.delete('/delete-report/:report_id', ReportController.deleteReport);

module.exports = router;
