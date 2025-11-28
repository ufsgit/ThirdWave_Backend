var http = require('http');
var db=require('./dbconnection.js');
var storedProcedure=require('./helpers/stored-procedure');
var server = http.Server(app);
var socketIO = require('socket.io');
const axios = require('axios'); 
const port = process.env.PORT || 4000;
process.env.SENDGRID_API_KEY = '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';
process.env.socketUrl='https://empirenotification.ufstech.net.in/' ;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var multer = require('multer');
var multerupload = multer({ dest: 'fileprint/' })
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const jwt = require('./helpers//jwt');
var routes = require("./routes/index");
const errorHandler = require('./helpers/error-handler');

var Outgoing_Webhook= require('./routes//Outgoing_Webhook');
var Login = require("./routes/Login");
var User_Details = require('./routes/User_Details');
var Country = require('./routes//Country');
var Course = require('./routes//Course');
var Course_Intake = require('./routes//Course_Intake');
var Document = require('./routes//Document');
var Duration = require('./routes//Duration');
var Course_Search= require('./routes//Course_Search');
var Intake = require('./routes//Intake');
var Internship = require('./routes//Internship');
var Level_Detail = require('./routes//Level_Detail');
var Student = require('./routes//Student');
var Student_Document = require('./routes//Student_Document');
var Student_Message = require('./routes//Student_Message');
var Student_Status = require('./routes//Student_Status');
var Subject = require('./routes//Subject');
var Remarks= require('./routes//Remarks');
var Region= require('./routes//Region');
var Holiday= require('./routes//Holiday');
var University = require('./routes//University');
var Public_Data = require('./routes//Public_Data');
var Account_Group = require('./routes//Account_Group');
var Client_Accounts = require('./routes//Client_Accounts');
var Agent = require('./routes//Agent');
var Department = require('./routes//Department');
var Department_Status = require('./routes//Department_Status');
var Branch = require('./routes//Branch');
var Enquiry_Source = require('./routes//Enquiry_Source');
var Fees = require('./routes//Fees');
var User_Role=require('./routes//User_Role');
var Company=require('./routes//Company');
var Sub_Section=require('./routes//Sub_Section');
var Check_List=require('./routes//Check_List');
var Agent_Details=require('./routes//Agent_Details');
var Task=require('./routes//Task');
var Application_Status=require('./routes//Application_Status');
var Application_Group=require('./routes//Application_Group');
var Accounts = require('./routes//Accounts');
var Class = require('./routes//Class');
var Chat_Window=require('./routes//Chat_Window');
var Process = require('./routes/Process.js');
var Status_Task = require('./routes/Status_Task.js');
var Qualification_Master=require('./routes//Qualification_Master.js');

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.use("/Login", Login);
app.use('/Public_Data',Public_Data);
app.use('/Account_Group',Account_Group);
app.use('/Client_Accounts',Client_Accounts);
app.use('/Agent',Agent);

var io = socketIO(server);

app.set('io', io);
app.post("/Post_Referral_Lead/", async function (req, res, next) {
  try {
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    var Lead_= req.body;
    try {
    console.log(Lead_);
  let lt = await (new storedProcedure('Post_Referral_Lead',[Lead_.Phone_Number,Lead_.By_user], connection)).result();
   var values = lt;
          var t = values;          
          var not={
             Student_Name: t[0].Student_Name_,
            By_User_Name: t[0].By_User_Name_,
            To_User_Name: t[0].To_User_Name_,
            Notification_Type_Name: t[0].Notification_Type_Name_,
            Entry_Type: t[0].Entry_Type_,
            To_User: t[0].User_Id_,
            Notification_Id: t[0].Notification_Id_,
            Student_Id: t[0].Student_Id_,
            }   
            try {
              const result = await axios.post(process.env.socketUrl, not);
              console.log('result: ', result.data);
            } catch (error) {
              console.log('error: ', error);              
            }
            connection.release();
            return res.send(not); 
    }
    catch (err) {   
      console.log(err);       
    await connection.rollback();
    return res.send(err);
    }
  } catch (e) {
     console.log(e);
    return res.send(e);
  } finally {
  }  
});

app.post("/Post_Call_Data/", async function (req, res, next) {
  try {
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    var Lead_= req.body;
    try {
  let lt = await (new storedProcedure('Post_Call_Data',[Lead_.Phone_Number,Lead_.Extension_Id,Lead_.User_Phone,Lead_.File_Info], connection)).result();
   var values = lt;
          var t = values;
    var not={
      Student_Id: t[0].Student_Id_,
      Student_Name: t[0].Student_Name_,
      User_Id: t[0].User_Id_,
      File_Info: t[0].File_Info_,
      }
      io.emit("new-message", not);    
    connection.release();
    return res.send(not);
    }
    catch (err) {  
      console.log(err)        
    await connection.rollback();
    return res.send(err);
    }
  } catch (e) {
     console.log(e);
    return res.send(e);
  } finally {
  }  
});

app.post("/Post_FB_Lead/", async function (req, res, next) {
  try {
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    var Lead_= req.body;
    try {
    console.log(Lead_);
  let lt = await (new storedProcedure('Post_FB_Lead',[Lead_.Student_Name,Lead_.Phone_Number,Lead_.Whatsapp,Lead_.Email,Lead_.Address,Lead_.Remark], connection)).result();
   var values = lt;
          var t = values;
          var not={
            Student_Name: t[0].Student_Name_,
            To_User_Name: t[0].ToUser_Name_,
            Notification_Type_Name: t[0].Notification_Type_Name_,
            Entry_Type: t[0].Entry_Type_,
            To_User: t[0].User_Id_,
            Notification_Id: t[0].Notification_Id_,
            Student_Id: t[0].Student_Id_,
            }   
            console.log('not: ', not);
    io.emit("new-message", not);
    connection.release();
    return res.send(not);
    }
    catch (err) {   
      console.log(err);       
    await connection.rollback();
    return res.send(err);
    }
  } catch (e) {
     console.log(e);
    return res.send(e);
  } finally {
  }  
});

app.use(jwt());

app.use('/User_Details',User_Details);
app.use('/Country',Country);
app.use('/Course',Course);
app.use('/Course_Intake',Course_Intake);
app.use('/Document',Document);
app.use('/Duration',Duration);
app.use('/Intake',Intake);
app.use('/Internship',Internship);
app.use('/Level_Detail',Level_Detail);
app.use('/Student',Student);
app.use('/Student_Document',Student_Document);
app.use('/Student_Message',Student_Message);
app.use('/Student_Status',Student_Status);
app.use('/Subject',Subject);
app.use('/Remarks',Remarks);
app.use('/Enquiry_Source',Enquiry_Source);
app.use('/University',University);
app.use('/Department',Department);
app.use('/Department_Status',Department_Status);
app.use('/Branch',Branch);
app.use('/Fees',Fees);
app.use('/User_Role',User_Role);
app.use('/Region',Region);
app.use('/Holiday',Holiday);
app.use('/Company',Company);
app.use('/Sub_Section',Sub_Section);
app.use('/Check_List',Check_List);
app.use('/Agent_Details',Agent_Details);
app.use('/Task',Task);
app.use('/Course_Search',Course_Search);
app.use('/Application_Status',Application_Status);
app.use('/Application_Group',Application_Group);
app.use('/Accounts',Accounts);
app.use('/Class',Class);
app.use('/Chat_Window',Chat_Window);
app.use('/Process', Process); // Routes of Process
app.use('/Status_Task', Status_Task); // Routes of status task
app.use('/Qualification_Master',Qualification_Master);
app.use('/Outgoing_Webhook',Outgoing_Webhook);
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err); 
});
// if (app.get("env") === "development") {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//       message: err.message,
//       error: err
//     });
//   });
// }

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     error: {}
//   });
// });

io.on('connection', (socket) => {
  socket.on('new-message', (message) => {
    //sio.emit(message);
    io.emit('new-message', message);
  });
});

server.listen(port, () => {
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
module.exports = app;
