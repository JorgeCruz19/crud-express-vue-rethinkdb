const r = require("rethinkdb");

let _db;
const database = {
  host:  'localhost',
  port: 28015,
  dbname: 'news'
};

class RethinkDB{
  static async getDB(){
    if (!_db) {
      try {
        let client = await r.connect({
          port: database.port,
          host: database.host,
          db: database.dbname
        });
        _db = client;
        return _db;
      } catch (ex){
        console.log(ex);
        throw(ex);
      }
    } else {
      return _db;
    }
  }
}

module.exports = RethinkDB;