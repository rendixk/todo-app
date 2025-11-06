module.exports = {
  "development": {
    "username": "root",
    "password": "rendi123",
    "database": "dbtest",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,  
    "dialect": "mysql",
    "port": process.env.MYSQLPORT
  }
}
