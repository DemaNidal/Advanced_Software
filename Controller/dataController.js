const dataModel = require('../Models/dataModel');
///////////////////////
const userModel = require('../Models/userModel');
const notificationsModel = require('../Models/notificationModel');
const notificationsController = require('./notificationCtrl');
const userController = require('./userController');
///////////////////////

async function addData(req, res) {
  try {
      const { user_id, date_time, location, source, air_quality, temperature, humidity, water_quality } = req.body;
      
      let dataid;
      dataModel.addNewData(user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, async(err, data_id) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(data_id);
      
      // if (!user_id) {
      //   return res.status(400).json({ error: 'User ID is required' });
      // }
    
     
    if(user_id){
      await userController.increaseUserScore(user_id, 6);
      const users = await new Promise((resolve, reject) => {
          userModel.getAllUsers((err, users) => {
              if (err) {
                  reject(err);
              }
              resolve(users);
          });
      });
    
      // Process notifications
      const notifications = [];
      for (const user of users) {
          if (air_quality > user.air_quality_threshold) {
              await notificationsController.addNotification(user.user_id, dataid, "air threshold", "data exceeded your air quality threshold");
              console.log('User ID:', user.id, 'exceeded air quality threshold');
              notifications.push("notification sent to user: ",user.name,", exceeded air quality threshold");
          }

          if (temperature > user.temperature_threshold) {
              await notificationsController.addNotification(user.user_id, dataid, "temperature threshold", "data exceeded your temperature threshold");
              console.log('User ID:', user.id, 'exceeded temperature threshold');
              notifications.push(`Notification sent to user: ${user.name} exceeded temperature threshold`);
          }

          if (humidity > user.humidity_threshold) {
              await notificationsController.addNotification(user.user_id, dataid, "humidity threshold", "data exceeded your humidity threshold");
              console.log('User ID:', user.id, 'exceeded humidity threshold');
              notifications.push(`notification sent to user: ${user.name} exceeded humidity threshold`);
          }

          if (water_quality > user.water_quality_threshold) {
              await notificationsController.addNotification(user.user_id, dataid, "water threshold", "data exceeded your water quality threshold");
              console.log('User ID:', user.id, 'exceeded water quality threshold');
              notifications.push(`notification sent to user: ${user.name} exceeded water quality threshold`);
          }
      }
    

      // Send the final response
      res.status(201).json({ message1: 'data added successfully',"Data ID:":dataid, "notifications Sent":notifications, message: `Data added by user ${user_id} at ${date_time} for location ${location}\n with values: air_quality:${air_quality}, temperature:${temperature}, humidity:${humidity}, water_quality:${water_quality}`});
      console.log('Received Request Body:', req.body);
    }
    else{
      res.status(201).json({ data_id, message: 'data added successfully' });
    }

  });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

////////////////////////////////////////////////////////////////////
async function viewData(req, res) {
  try {
    const alldata = dataModel.viewAllData((err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ data: result });
    }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function viewoneData(req, res) {
  try {
    const { id } = req.params;
    const userData = dataModel.viewOneData2(id,(err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error'+'id:'+id });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ data: result });
    }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function userData(req, res) {
  try {
    const { id } = req.params;
    const userData = dataModel.viewOneData(id,(err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error'+'id:'+id });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ data: result });
    }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//////////////////////////////////////////////////////////////////////
async function editData(req, res) {
  try {
    const { id } = req.params;
    const { user_id, date_time, location, source, air_quality, temperature, humidity, water_quality } = req.body;
    
    dataModel.updateData(id, user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, (err, success) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (success) {
          res.status(200).json({ id, message: 'Data updated successfully' });
        } else {
          res.status(404).json({ error: 'Data not found' });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteData(req, res) {
  try {
    const { id } = req.params;
    
    dataModel.deleteData(id, (err, success) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (success) {
        res.status(204).send(); // No content for successful deletion
        //res.status(204).json({ message: 'data added successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

  module.exports = {
    addData,
    viewData,
    viewoneData,
    userData,
    editData,
    deleteData,
  };

