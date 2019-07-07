var dataJson={};
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  //insertRow();
});




function getStatistics(socket)
{
  
  connection.query(
    "SELECT COUNT(*) as count FROM `binnacle` ",
    function(error, results, fields) {
      if (error) throw error ;
      socket.emit('updateCountTweets',{'countTweets':results[0].count});
    }
  );
  
}


function getUsers(socket)
{
  
  connection.query(
    "SELECT COUNT(DISTINCT(user)) as count FROM `binnacle` ",
    function(error, results, fields) {
      if (error) throw error ;
      socket.emit('updateCountUsers',{'countUsers':results[0].count});
      
    }
  );
}

function getTags(socket)
{  
  connection.query(
    "SELECT COUNT(DISTINCT(tag)) as count FROM `binnacle` ",
    function(error, results, fields) {
      if (error) throw error ;
      socket.emit('updateCountTags',{'countTags':results[0].count});     
    }
  );
}


function getHighestOccuranceUsers(socket)
{
  connection.query(
    "SELECT user, count(*) as count FROM `binnacle` GROUP BY user ORDER BY count DESC LIMIT 1",
    function(error, results, fields) {
      if (error) throw error ;
      socket.emit('updateOccuranceUsers',{'occuranceUser':results[0].user,'occuranceCount':results[0].count});     
    }
  );
}

function getAllHighestOccuranceUsers(socket)
{
  connection.query(
    "SELECT user, count(*) as count FROM `binnacle` GROUP BY user ORDER BY count DESC",
    function(error, results, fields) {
      if (error) throw error ;
      listUser  = [];
      listCount = [];
      listColor = [];
      results.forEach(element => {
        listUser.push(element.user);
        listCount.push(element.count);
        listColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      });
      socket.emit('updateAllOccuranceUsers',{'listUser':listUser,'listCount':listCount,'listColor':listColor});
    }
  );
}

function getHighestOccuranceTags(socket)
{
  connection.query(
    "SELECT tag, count(*) as count FROM `binnacle` GROUP BY tag ORDER BY count DESC LIMIT 1",
    function(error, results, fields) {
      if (error) throw error ;
      socket.emit('updateOccuranceTags',{'occuranceTag':results[0].tag,'occuranceCount':results[0].count});     
    }
  );
}

function getAllHighestOccuranceTags(socket)
{
  connection.query(
    "SELECT tag, count(*) as count FROM `binnacle` GROUP BY tag ORDER BY count DESC",
    function(error, results, fields) {
      if (error) throw error ;
      listTag  = [];
      listCount = [];
      listColor = [];
      results.forEach(element => {
        listTag.push(element.tag);
        listCount.push(element.count);
        listColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      });
      socket.emit('updateAllOccuranceTags',{'listTag':listTag,'listCount':listCount,'listColor':listColor});
    }
  );
}


function select()
{
  connection.query(
    "SELECT * FROM `binnacle` ",
    function(error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}


function insertRow()
{
  var sql = "INSERT INTO binnacle (binnacle_id, name,user,txt,tag) VALUES ?";
  var values = [
    [0, 'luis fernando ramirez santos', 'sxxq1','pasandola bien porque hoy es #viernes','#viernes'],
    [0, 'Juan santos cabrera', 'sxxq1','pasandola bien porque hoy es #viernes','#viernes'],
    [0, 'Ismael Santos Cabrera', 'sxxq1','pasandola bien porque hoy es #viernes','#viernes']
  ];
  
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

module.exports.getStatistics             = getStatistics;
module.exports.getUsers                  = getUsers;
module.exports.getTags                   = getTags;
module.exports.getHighestOccuranceUsers  = getHighestOccuranceUsers;
module.exports.getAllHighestOccuranceUsers  = getAllHighestOccuranceUsers;

module.exports.getHighestOccuranceTags   = getHighestOccuranceTags;
module.exports.getAllHighestOccuranceTags  = getAllHighestOccuranceTags;

module.exports.insertRow                 = insertRow;
