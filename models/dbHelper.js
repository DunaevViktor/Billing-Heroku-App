const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    add,
    find,
    findById,
    remove
}

async function add(company){
    const[id] = await db('companies').insert(company);
    return id;
}

function find(){
    return db('companies');
}

function findById(id){
    return db('companies')
    .where({ id })
    .first();
}

function remove(id){
    return db('companies')
    .where({ id })
    .del();
}