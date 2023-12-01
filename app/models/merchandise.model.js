const sql = require("./db");

const Merch = (merch) => {
  this.name = merch.name;
  this.description = merch.description;
  this.price = merch.price;
  this.img = merch.img;
  this.detailed_description = merch.detailed_description;
  this.url = merch.url;
  this.in_stock = merch.in_stock;
};

Merch.listing = (result) => {
  sql.query("SELECT * FROM `merchandises`", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Merch.listingDetail = (id, result) => {
  sql.query("SELECT * FROM `merchandises` WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Merch.listingSome = (limit, id, result) => {
  sql.query("SELECT * FROM `merchandises` LIMIT " + limit + " OFFSET " + id + " " , (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Merch.create = (newMerch, result) => {
  sql.query("INSERT INTO `merchandises` SET ?", newMerch, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newMerch});
    console.log("Created merchandise:", {
      id: res.insertId,
      ...newMerch
    });
  });
};

Merch.updateMerch = (id, data, result) => {
  sql.query(
    "UPDATE merchandises SET name=?, description=?, price=?, img=?, detailed_description=?, url=?, in_stock=? WHERE id=?",
    [data.name, data.description, data.price, data.img, data.detailed_description, data.url, data.in_stock, id],
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
        "Update merchandise: " +
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

Merch.removeMerch = (id, result)=>{
  sql.query("DELETE FROM merchandises WHERE id=?", [id], (err, res)=>{
      if(err){
          console.log("Query error: " + err);
          result(err, null);
          return;
      }
      if(res.affectedRows == 0){
          result({kind: "not_found"}, null);
          return;
      }
      console.log("Deleted merchandise id: " + id);
      result(null, {id: id});
  } );
};

module.exports = Merch;
