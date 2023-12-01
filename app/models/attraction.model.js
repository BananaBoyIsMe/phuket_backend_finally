const sql = require("./db");

const Attract = (attract) => {
  this.name = attract.name;
  this.description = attract.description;
  this.img = attract.img;
  this.detailed_description = attract.detailed_description;
  this.things_to_do = attract.things_to_do;
  this.url = attract.url;
  this.locations_id = attract.locations_id;
};

Attract.listing = (result) => {
  sql.query("SELECT a.id, a.name, a.description, a.img, a.detailed_description, a.things_to_do, a.url, a.locations_id, l.address, l.road, l.subdistrict, l.district, l.province, l.postal_code FROM `attractions` a INNER JOIN `locations` l ON a.locations_id = l.id", (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Attract.listingDetail = (id, result) => {
  sql.query("SELECT a.id, a.name, a.description, a.img, a.detailed_description, a.things_to_do, a.url, a.locations_id, l.address, l.road, l.subdistrict, l.district, l.province, l.postal_code FROM `attractions` a INNER JOIN `locations` l ON a.locations_id = l.id WHERE a.id=?", [id], (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Attract.listingSome = (limit, id, result) => {
  sql.query("SELECT a.id, a.name, a.description, a.img, a.detailed_description, a.things_to_do, a.url, a.locations_id, l.address, l.road, l.subdistrict, l.district, l.province, l.postal_code FROM `attractions` a INNER JOIN `locations` l ON a.locations_id = l.id LIMIT " + limit + " OFFSET " + id + " " , (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Attract.create = (newAttract, result) => {
  sql.query("INSERT INTO `attractions` SET ?", newAttract, (err, res) => {
    if (err) {
      console.log("Query error:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newAttract});
    console.log("Created attraction:", {
      id: res.insertId,
      ...newAttract
    });
  });
};

Attract.updateAttract = (id, data, result) => {
  sql.query(
    "UPDATE attractions SET id=? name=?, description=?, img=?, detailed_description=?, things_to_do=?, url=? WHERE id=?",
    [data.name, data.description, data.img, data.detailed_description, data.things_to_do, data.url, id],
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
        "Update attraction: " +
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

Attract.removeAttract = (id, result)=>{
  sql.query("DELETE FROM attractions WHERE id=?", [id], (err, res)=>{
      if(err){
          console.log("Query error: " + err);
          result(err, null);
          return;
      }
      if(res.affectedRows == 0){
          result({kind: "not_found"}, null);
          return;
      }
      console.log("Deleted attraction id: " + id);
      result(null, {id: id});
  } );
};

module.exports = Attract;