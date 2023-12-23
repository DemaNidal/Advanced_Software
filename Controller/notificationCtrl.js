const notificationsModel = require("../Models/notificationModel");

async function addNotification(user_id, data_id, title, body) {
    return new Promise((resolve, reject) => {
        notificationsModel.addNotification(user_id, data_id, title, body, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.insertId);
        });
    });
  }

function viewNotification(req, res) {
  
    const alldata = notificationsModel.viewAllNotification((err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ notifications: result });
      }); 
  }
  
  function viewNotificationforuser(req, res) {
    const user_id = req.params.user_id; // Assuming user_id is part of the request parameters

    notificationsModel.viewNotificationsByUserId(user_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ notification: result });
    });
}

module.exports = {
    addNotification,
    viewNotification,
    viewNotificationforuser
  };
