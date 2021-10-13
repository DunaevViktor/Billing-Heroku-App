
exports.up = function (knex) {
    return knex.schema
    .createTable('companies', tbl => {
        tbl.increments() //id field
        tbl.timestamps(true, true) //Created and Modified
        tbl.text('Name', 128)
            .notNullable()
    })
    .createTable('cards', tbl => {
        tbl.increments() //id field
        tbl.timestamps(true, true) //Created and Modified
        tbl.text('FirstName', 128)
            .notNullable()
        tbl.text('LastName', 128)
            .notNullable()
        tbl.text('CardNumber', 128)
            .notNullable()
        tbl.integer('Company_Id')
            .unsigned()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('payments', tbl => {
        tbl.increments() //id field
        tbl.timestamps(true, true) //Created and Modified
        tbl.integer('Amount')
            .notNullable()
        tbl.integer('Currency')
            .notNullable()
        tbl.datetime('Date')
        tbl.text('Type', 128) //switch on picklist
            .notNullable()
        tbl.integer('Company_Id')
            .unsigned()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('cards').dropTableIfExists('companies')
        .dropTableIfExists('payments').dropTableIfExists('companies')
};
