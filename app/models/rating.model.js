const sql = require("./db");

const Rating = (rating) => {
  this.rating = rating.rating;
  this.comment = rating.comment;
  // this.time = rating.time;
  this.users_id = rating.users_id;
  this.att_id = rating.att_id;
  this.merch_id = rating.merch_id;
};

Rating.listing = (result) => {
  sql.query("SELECT * FROM `ratings` r INNER JOIN `users` u ON r.users_id = u.id", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}


Rating.listingDetail = (id, result) => {
  sql.query("SELECT * FROM `ratings` WHERE r_id=?", [id], (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Rating.listingSome = (merch_id, att_id, result) => {
  sql.query("SELECT * FROM `ratings` r INNER JOIN `users` u ON r.users_id = u.id WHERE merch_id = " + merch_id + " OR att_id = " + att_id, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Rating.create = (newRating, result) => {
  sql.query("INSERT ratings(rating, comment, time, users_id, att_id, merch_id) VALUES(?, ?, now(), ?, ?, ?)",
  [newRating.rating, newRating.comment, newRating.users_id, newRating.att_id, newRating.merch_id], (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newRating});
    console.log("Created rating:", {
      id: res.insertId,
      ...newRating
    });
  });
};

Rating.updateRating = (id, data, result) => {
  sql.query(
    "UPDATE ratings SET rating=?, comment=? WHERE r_id=?",
    [data.rating, data.comment, id],
    (err, res) => {
      if (err) {
        console.log("Error: " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" });
        return;
      }
      console.log(
        "Update rating: " +
          {
            id,
            ...data,
          }
      );
      result(null, {
        id,
        ...data,
      });
    }
  );
};

Rating.removeRating = (id, result)=>{
  sql.query("DELETE FROM ratings WHERE r_id=?", [id], (err, res)=>{
      if(err){
          console.log("Query error: " + err);
          result(err, null);
          return;
      }
      if(res.affectedRows == 0){
          result({kind: "not_found"}, null);
          return;
      }
      console.log("Deleted rating id: " + id);
      result(null, {id: id});
  } );
};

module.exports = Rating;