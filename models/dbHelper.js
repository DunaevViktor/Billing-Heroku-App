const db = require('../dbConfig');

module.exports = {
    addCompany,
    addCard,
    findAllCompanies,
    findAllCards,
    findCompanyById,
    findCardById,
    findCardByCompany,
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
    const [id] = await db('cards')
    .where({ Company_Id })
    .insert(card);
    return findCardById(id);
}