var mysql = require("mysql2");
var connection = mysql.createPool({


  //   host:"DESKTOP-IK6ME8M",
  //   user: "Bilal",
  //   password: "root",
  // database:"empire_23_07_2025"
//  database:"empire26-03_2025"
  
   host:"DESKTOP-JJRBCOO",
  user: "root",
  password: "root",

	database: "thirdwave",
   
});

module.exports = connection;