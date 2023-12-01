const sql = require("./db");

const Location = (location) => {
  this.id = location.id;
  this.address = location.address;
  this.road = location.road;
  this.subdistrict = location.subdistrict;
  this.district = location.district;
  this.province = location.province;
  this.postal_code = location.postal_code;
};

Location.listing = (result) => {
  sql.query("SELECT * FROM `locations`", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Location.listingDetail = (id, result) => {
  sql.query("SELECT * FROM `locations` WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Location.listingSome = (limit, id, result) => {
  sql.query("SELECT * FROM `locations` LIMIT " + limit + " OFFSET " + id + " " , (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Location.create = (newLocation, result) => {
  sql.query("INSERT INTO `locations` SET ?", newLocation, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newLocation});
    console.log("Created location:", {
      id: res.insertId,
      ...newLocation
    });
  });
};

Location.updateLocation = (id, data, result) => {
  sql.query(
    "UPDATE locations SET address=?, road=?, subdistrict=?, district=?, province=?, postal_code=? WHERE id=?",
    [data.address, data.road, data.subdistrict, data.district, data.province, data.postal_code, id],
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
        "Update location: " +
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

Location.removeLocation = (id, result)=>{
  sql.query("DELETE FROM locations WHERE id=?", [id], (err, res)=>{
      if(err){
          console.log("Query error: " + err);
          result(err, null);
          return;
      }
      if(res.affectedRows == 0){
          result({kind: "not_found"}, null);
          return;
      }
      console.log("Deleted location id: " + id);
      result(null, {id: id});
  } );
};

module.exports = Location;