// controllers/reportController.js
const reportModel = require('../Models/reportModel');

function addReport(req, res) {
    const { user_id, description, issue_type, location, date_time } = req.body;

    reportModel.addReport(user_id, description, issue_type, location, date_time, (err, report_id) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Report added successfully', report_id });
    });
}

function getAllReports(req, res) {
    reportModel.getAllReports((err, reports) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ reports });
    });
}

function getReportsByUserId(req, res) {
    const user_id = req.params.user_id;

    reportModel.getReportsByUserId(user_id, (err, reports) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ reports });
    });
}
function deleteReport(req, res) {
    const report_id = req.params.report_id;

    reportModel.deleteReport(report_id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Report deleted successfully' });
    });
}
function updateReport(req, res) {
    const report_id = req.params.report_id;
    const { description, issue_type, location, date_time } = req.body;

    reportModel.updateReport(report_id, description, issue_type, location, date_time, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Report updated successfully' });
    });
}

module.exports = {
    updateReport,
    deleteReport,
    addReport,
    getAllReports,
    getReportsByUserId,
};
