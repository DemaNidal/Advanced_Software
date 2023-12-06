const dataModel = require('../Models/dataModel');

function addData(req, res) {
    const { user_id, date_time, location, source, air_quality, temperature, humidity, water_quality } = req.body;
  
    dataModel.addNewData(user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, (err, data_id) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(201).json({ data_id, message: 'data added successfully' });
      console.log('Received Request Body:', req.body);
    });
  }


////////////////////////////////////////////////////////////////////
function viewData(req, res) {
  
  const alldata = dataModel.viewAllData((err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ data: result });
    }); 
}

//////////////////////////////////////////////////////////////////////
// function editData(req, res) {
  
//   const alldata = dataModel.editTheData((err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.json({ data: result });
//     }); 
// }

  module.exports = {
    addData,
    viewData,
    // editData,
    // Other controller functions...
  };

