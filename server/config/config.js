module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "db_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "test": {
    "username": "rsb",
    "password": "rsb",
    "database": "rsb_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": "5432",
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "db_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
  }
};