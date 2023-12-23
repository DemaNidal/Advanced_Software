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
    try{
        const {id} = req.params;
    
        reportModel.deleteReport(id, (err, success) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (success) { 
                res.status(204).json({ message: 'Report deleted successfully' });
            } else {
                res.status(404).json({ error: 'Data not found' });
            }
        });
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


function updateReport(req, res) {
    const {id} = req.params;
    const { description, issue_type, location, date_time } = req.body;

    reportModel.updateReport(id, description, issue_type, location, date_time, (err, success) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (success) {
            res.status(200).json({ id, message: 'Report updated successfully' });
          } else {
            res.status(404).json({ error: 'Data not found' });
          }
    });
}    

module.exports = {
    updateReport,
    deleteReport,
    addReport,
    getAllReports,
    getReportsByUserId,
};
