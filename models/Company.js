var db=require('../dbconnection');
 // const storedProcedure=require('../helpers/stored-procedure');
var fs = require('fs');
const StoredProcedure = require('../helpers/stored-procedure');
var Company= 
{ 
  Save_Company:function(Company_,callback)
{ 
 var Company_value_=1;
return db.query("CALL Save_Company("+"@Company_ :=?,"+"@Company_value_ :=?)" ,[JSON.stringify(Company_),Company_value_],callback); 
}
,
Get_Company: async function () 
{
// const Company_Data=await (new storedProcedure('Get_Company',  [])).result();
const Company_Data=await (new StoredProcedure('Get_Company',  [])).result();
return {Company_Data};    

},

// Delete_Company:function(Company_Id_,callback)
// { 
// return db.query("CALL Delete_Company(@Company_Id_ :=?)",[Company_Id_],callback);
// }
Save_Application_Settings: async function (Application_Settings_) {
  return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      console.log(Application_Settings_)
      const result1 = await(new StoredProcedure('Save_Application_Settings', [Application_Settings_.Application_Settings_Id,Application_Settings_.Settings_Value,Application_Settings_.Department_Id,Application_Settings_.Register_Transfer_Status,Application_Settings_.Registration_By,Application_Settings_.Branch,Application_Settings_.Department,Application_Settings_.Tostaff,Application_Settings_.Receipt_Notification_User,Application_Settings_.Round_Robin,Application_Settings_.Import_with_Status,Application_Settings_.Import_with_Enquiry_Source,Application_Settings_.Highest_Department_Profile,Application_Settings_.Class_Profile,Application_Settings_.Highest_Status_Profile,Application_Settings_.Department_Status_Id,Application_Settings_.Department_Status_Name], connection)).result();
   await connection.commit();
      connection.release();
      rs( result1);
    }
    catch (err) {
      await connection.rollback();
      rej(err);
    }
  
  })   
  },
  Get_Application_Settings: async function () 
  {
  const Settings_Data=await (new StoredProcedure('Get_Application_Settings',  [])).result();
  return {Settings_Data};    
  },


  Save_User_Resignation_Management: async function (User_Resignation_Management_) {
    return new Promise(async (rs,rej)=>{
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      try {
        console.log(User_Resignation_Management_)
        const result1 = await(new StoredProcedure('Save_User_Resignation_Management', [User_Resignation_Management_.Resigned_User_Id,User_Resignation_Management_.Resigned_User_Name,User_Resignation_Management_.New_asigned_User_Id,
          User_Resignation_Management_.New_asigned_User_Name,User_Resignation_Management_.Created_By], connection)).result();
     await connection.commit();
        connection.release();
        rs( result1);
      }
      catch (err) {
        await connection.rollback();
        rej(err);
      }
    
    })   
    },

 };
 module.exports=Company;









































//  var db=require('../dbconnection');
//  var fs = require('fs');
//  const storedProcedure=require('../helpers/stored-procedure');
//  var Company_Source=
//  { 
//  Save_Company_Source: async function (Company_Source_) 
//  {
//          return new Promise(async (rs,rej)=>{
//         const pool = db.promise();
//         //  let result1;
//           var connection = await pool.getConnection();
//          await connection.beginTransaction();
   
//           try
//            {
            
//             const result1 = await(new storedProcedure('Save_Company_Source',[Company_Source_.Company_Source_Id,Company_Source_.companyname,Company_Source_.Phone1,
//               Company_Source_.Phone2,Company_Source_.Mobile,Company_Source_.Website,Company_Source_.Email,Company_Source_.Address1,Company_Source_.Address2,Company_Source_.Address3], connection)).result();
//             await connection.commit();
//               connection.release();
//               rs( result1);
//             }
//             catch (err) {
//             await connection.rollback();
//             rej(err);
//             }   
// })
// },

// };
  // module.exports=Company_Source;





























































//  var db=require('../dbconnection');
//  // const storedProcedure=require('../helpers/stored-procedure');
// var fs = require('fs');
// const StoredProcedure = require('../helpers/stored-procedure');
// var Company= 
// { 
//   Save_Company:function(Company_,callback)
// { 
//  var Company_value_=1;



// return db.query("CALL Save_Company("+
// "@Company_ :=?,"+
// "@Company_value_ :=?"+



// ")" 
// ,[
//   JSON.stringify(Company_),
//   Company_value_
// ],callback); 
// }
// ,



// Get_Company: async function () 
// {
// // const Company_Data=await (new storedProcedure('Get_Company',  [])).result();
// const Company_Data=await (new StoredProcedure('Get_Company',  [])).result();
// return {Company_Data};    

// }

// // Delete_Company:function(Company_Id_,callback)
// // { 
// // return db.query("CALL Delete_Company(@Company_Id_ :=?)",[Company_Id_],callback);
// // }


// // Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
// // { 
// //   return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
// // } ,

//  };
//  module.exports=Company;









































// //  var db=require('../dbconnection');
// //  var fs = require('fs');
// //  const storedProcedure=require('../helpers/stored-procedure');
// //  var Company_Source=
// //  { 
// //  Save_Company_Source: async function (Company_Source_) 
// //  {
// //          return new Promise(async (rs,rej)=>{
// //         const pool = db.promise();
// //         //  let result1;
// //           var connection = await pool.getConnection();
// //          await connection.beginTransaction();
   
// //           try
// //            {
            
// //             const result1 = await(new storedProcedure('Save_Company_Source',[Company_Source_.Company_Source_Id,Company_Source_.companyname,Company_Source_.Phone1,
// //               Company_Source_.Phone2,Company_Source_.Mobile,Company_Source_.Website,Company_Source_.Email,Company_Source_.Address1,Company_Source_.Address2,Company_Source_.Address3], connection)).result();
// //             await connection.commit();
// //               connection.release();
// //               rs( result1);
// //             }
// //             catch (err) {
// //             await connection.rollback();
// //             rej(err);
// //             }   
// // })
// // },

// // };
//   // module.exports=Company_Source;

