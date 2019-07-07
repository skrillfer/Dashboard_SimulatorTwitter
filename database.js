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

function getHighestOccuranceTags(socket)
{
  connection.query(
    "SELECT tag, count(*) as count FROM `binnacle` GROUP BY tag ORDER BY count DESC LIMIT 1",
    function(error, results, fields) {
      if (error) throw error ;
      console.log(results);
      socket.emit('updateOccuranceTags',{'occuranceTag':results[0].tag,'occuranceCount':results[0].count});     
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


function insert()
{
  var sql = "INSERT INTO binnacle (binnacle_id, name,user,txt,tag) VALUES ?";
  var values = [
    [0, 'luis fernando ramirez santos', 'skrillfer','pasandola bien porque hoy es #viernes','#viernes'],
    [0, 'Juan santos cabrera', 'skrillfer','pasandola bien porque hoy es #viernes','#viernes'],
    [0, 'Ismael Santos Cabrera', 'skrillfer','pasandola bien porque hoy es #viernes','#viernes']
  ];
  
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

module.exports.getStatistics = getStatistics;
module.exports.getUsers      = getUsers;
module.exports.getTags       = getTags;
module.exports.getHighestOccuranceUsers  = getHighestOccuranceUsers;
module.exports.getHighestOccuranceTags   = getHighestOccuranceTags;
