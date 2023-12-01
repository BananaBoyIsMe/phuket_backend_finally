const sql = require("./db");

const allRatingAttract = (result) => {
  sql.query("SELECT MAX(r.rating) AS 'max_attract', AVG(r.rating) AS 'avg_attract', MIN(r.rating) AS 'min_attract', COUNT(r.rating) AS 'count_attract' FROM ratings r INNER JOIN attractions a ON r.att_id = a.id WHERE att_id IS NOT NULL", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const allRatingMerch = (result) => {
  sql.query("SELECT MAX(r.rating) AS 'max_merch', AVG(r.rating) AS 'avg_merch', MIN(r.rating) AS 'min_merch', COUNT(r.rating) AS 'count_merch' FROM ratings r INNER JOIN merchandises m ON r.merch_id = m.id WHERE merch_id IS NOT NULL", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const oneRatingAttract = (id, result) => {
  sql.query("SELECT MAX(r.rating) AS 'max_attract', AVG(r.rating) AS 'avg_attract', MIN(r.rating) AS 'min_attract', COUNT(r.rating) AS 'count_attract' FROM ratings r INNER JOIN attractions a ON r.att_id = a.id WHERE att_id = " + id, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const oneRatingMerch = (id, result) => {
  sql.query("SELECT MAX(r.rating) AS 'max_merch', AVG(r.rating) AS 'avg_merch', MIN(r.rating) AS 'min_merch', COUNT(r.rating) AS 'count_merch' FROM ratings r INNER JOIN merchandises m ON r.merch_id = m.id WHERE merch_id = " + id, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const topRatingAttract = (result) => {
  sql.query("SELECT AVG(r.rating) AS rating, COUNT(r.rating) AS num_rating, a.id AS att_id FROM ratings r INNER JOIN attractions a ON r.att_id = a.id GROUP BY a.id ORDER BY rating DESC", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const topRatingMerch = (result) => {
  sql.query("SELECT AVG(r.rating) AS rating, COUNT(r.rating) AS num_rating, m.id AS merch_id FROM ratings r INNER JOIN merchandises m ON r.merch_id = m.id GROUP BY m.id ORDER BY rating DESC", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const topThree = (limit, result) => {
  sql.query("SELECT merch_id, name, rating, img, url FROM merchandises ORDER BY rating DESC LIMIT " + limit + "", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

const everything = (result) => {
  sql.query("SELECT COUNT(id) AS 'num_users' FROM `users` WHERE 1", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

module.exports = {
  allRatingAttract,
  allRatingMerch,
  oneRatingAttract,
  oneRatingMerch,

  topRatingAttract,
  topRatingMerch,

  topThree,
  everything
};