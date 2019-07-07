const options = {
    client: 'mysql',
    connection: {
        host: '35.193.89.234',
        user: 'root',
        password: 'Alexandria.2601',
        database: 'trafficTwitterDB'
    }
}

const knex = require('knex')(options);

knex.raw("SELECT VERSION()").then((version) => console.log((version[0][0]))
).catch((err) => { console.log( err); throw err })
.finally(() => {
    knex.destroy();
});