const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    add,
    find,
    findById,
    findCardById,
    remove,
    update,
    addCard
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

function update(id, changes){
    return db('companies')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    });
}

function findCardById(id){
    return db('cards')
    .where({ id })
    .first();
}

async function addCard(card, Company_Id){
    const [id] = await db('cards')
    .where({ Company_Id })
    .insert(card);
    return findCardById(id);
}