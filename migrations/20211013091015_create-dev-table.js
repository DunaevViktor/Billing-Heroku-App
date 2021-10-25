
exports.up = function (knex) {
    return knex.schema
    .createTable('companies', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.text('Name', 128)
            .notNullable()
    })
    .createTable('cards', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.text('FirstName', 128)
            .notNullable()
        tbl.text('LastName', 128)
            .notNullable()
        tbl.text('CardNumber', 128)
            .notNullable()
        tbl.integer('Company_Id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('payments', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.integer('Amount')
            .notNullable()
        tbl.text('Currency', 128)
            .notNullable()
        tbl.datetime('Date')
        tbl.text('Type', 128) //switch on picklist type
            .notNullable()
        tbl.integer('Company_Id')
            .unsigned()
            .notNullable()
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
