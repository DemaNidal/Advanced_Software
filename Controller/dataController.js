const dataModel = require('../Models/dataModel');

function addData(req, res) {
    const { location, dateANDtime, source, content } = req.body;
  
    dataModel.addNewData(location, dateANDtime, source, content, (err, data_id) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(201).json({ data_id, message: 'data added successfully' });
      console.log('Received Request Body:', req.body);
    });
  }

  function viewData(req, res) {
  
    const alldata = dataModel.viewAllData((err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ data: result });
      }); 
  }
  
  module.exports = {
    addData,
    viewData,
    // Other controller functions...
  };

