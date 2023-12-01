const dash = require("../models/dashboard.model");

// const getHighRatingPre = (result) => {
//   sql.query("SELECT merch_id, name, price, img FROM `merchandise`", (err, res) => {
//   if (err) {
//     console.log("Query error:", err);
//     result(err, null);
//     return;
//   }
//     result(null, res);
//   });
// }

// const getTopMerch1 = (req, res) => {
//   dash.topMerch(5, (err, data) => {
//     if (err) {
//       res.status(500).send({
//         message: err.message || "Some error occured while getting",
//       });
//     } else {
//       res.send(data);
//     }
//   })
// }

const getDash1 = (req, res) => {
  dash.everything((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data)
    }
  })
}


const getDash2 = (req, res) => {
  if (req.params.choose == 1)
  dash.allRatingAttract((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
  else if (req.params.choose == 2)
  dash.allRatingMerch((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
  else if (req.params.choose == 3)
  dash.oneRatingAttract(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
  else if (req.params.choose == 4)
  dash.oneRatingMerch(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
  else if (req.params.choose == 5)
  dash.topRatingAttract((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
  else if (req.params.choose == 6)
  dash.topRatingMerch((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  })
}

module.exports = {
  // createNewMerch,
  getDash1,
  getDash2,
  // updateMerchCtrl,
};
