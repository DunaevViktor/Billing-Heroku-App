const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    add,
    find
}

async function add(company){
    const[id] = await db('companies').insert(company);
    return id;
}

function find(){
    return db('companies');
}