const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    addCompany,
    addCard,
    findAllCompanies,
    findAllCards,
    findCompanyById,
    findCardById,
    removeCompany,
    removeCard,
    updateCompany,
    updateCard
}

async function addCompany(company){
    const[id] = await db('companies').insert(company);
    return id;
}

function findAllCompanies(){
    return db('companies');
}

function findAllCards(){
    return db('cards');
}

function findCompanyById(id){
    return db('companies')
    .where({ id })
    .first();
}

function removeCompany(id){
    return db('companies')
    .where({ id })
    .del();
}

function removeCard(id){
    return db('cards')
    .where({ id })
    .del();
}

function updateCompany(id, changes){
    return db('companies')
    .where({ id })
    .update(changes)
    .then(() => {
        return findCompanyById(id);
    });
}

function updateCard(id, changes){
    return db('cards')
    .where({ id })
    .update(changes)
    .then(() => {
        return findCardById(id);
    })
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