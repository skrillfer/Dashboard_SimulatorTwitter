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
  console.log('Connected as thread id: ' + connection.threadId);
  console.log('insertando........');
  insert();
  console.log('Seleccionando.......');
  select();
});



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

module.exports = connection;

/*
var config = Knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    socketPath: '/cloudsql/skrillferdb:us-central1:bdskrillferstudent',
    host : '35.193.89.234',
    user : 'root',
    password: process.env.SQL_PASSWORD,
    database : 'trafficTwitterDB',
  }
});

var cnx = mysql.createConnection(config);


cnx.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});

//get_projects();
function get_projects() {
  /*cnx.select('name').from('binnacle')
  .then(data => console.log(data));
}*/