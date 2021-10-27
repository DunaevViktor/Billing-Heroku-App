const db = require('../dbConfig');

module.exports = {
    addCompany,
    addCard,
    addPayment,
    findAllCompanies,
    findAllCards,
    findAllPayments,
    findCompanyById,
    findCardById,
    findPaymentById,
    findCardByCompany,
    removeCompany,
    removeCard,
    removePayment,
    updateCompany,
    updateCard,
    updatePayment
}

async function addCompany(company){
    return await db('companies').insert(company, ['id', 'Name']);
}

function findAllCompanies(){
    return db('companies');
}

function findAllCards(){
    return db('cards');
}

function findAllPayments(){
    return db('payments');
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

function removePayment(id){
    return db('payments')
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

function updatePayment(id, changes){
    return db('payments')
    .where({ id })
    .update(changes)
    .then(() => {
        return findPaymentById(id);
    })
}

function findCardById(id){
    return db('cards')
    .where({ id })
    .first();
}

function findPaymentById(id){
    return db('payments')
    .where({ id })
    .first();
}

function findCardByCompany(Company_Id){
    return db('companies')
    .join('cards', 'companies.id', 'cards.Company_Id')
    .select(
        "companies.id as CompanyId",
        "companies.Name as CompanyName",
        "cards.id as CardId",
        "cards.FirstName",
        "cards.LastName",
        "cards.CardNumber"
    )
    .where({ Company_Id });
}

async function addCard(card, Company_Id){
    return await db('cards')
    .where({ Company_Id })
    .insert(card, ['id']);
}

async function addPayment(payment, Company_Id){
    return await db('payments')
    .where({ Company_Id })
    .insert(payment, ['id']);
}