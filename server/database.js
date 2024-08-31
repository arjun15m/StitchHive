const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "arjundb",
    host: "localhost",
    port: 5432,
    database: "stitch_hive"
});


module.exports = pool;
