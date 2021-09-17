const r= require('rethinkdb')
const RethinkDB = require('../../utilities/db');

module.exports.getAll = async () => {
  try {
    const connection = await RethinkDB.getDB();
    let rows = await r.table('detalle_escaleta').run(connection)
    let cursors = await rows.toArray()

    // connection.close()
    return cursors;
    
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.getById = async (id) => {
  try {
    const connection = await RethinkDB.getDB();
    let row = await r.table('detalle_escaleta').get(id).run(connection);
    let cursor = await row;
    // connection.close();
    return cursor;
    
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.addOne = async (name, lastname, age, gender) => {
  try {
    let document = {
      name:name, 
      lastname:lastname, 
      age:age, 
      gender:gender
    }
    const connection = await RethinkDB.getDB();
    let row = await r.table('detalle_escaleta').insert(document).run(connection);
    console.log(row);
    let cursor = await row;
    // connection.close();
    return cursor;

  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.deleteById = async (id) => {
  try {
    const connection = await RethinkDB.getDB();
    let row = await r.table('detalle_escaleta').get(id).delete().run(connection);
    let cursor = await row;

    return cursor;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.updateById = async (id, name, lastname, age, gender) => {
  try {
    const connection = await RethinkDB.getDB();

    let row = await r.table('detalle_escaleta').get(id).update({name:name, lastname:lastname, age:age, gender:gender}).run(connection);
    console.log(row);
    let cursor = await row;

    return cursor;
  } catch (ex) {
    console.log(ex);
    throw(ex);
  }
}