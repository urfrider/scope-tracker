// Import path module
const path = require('path')

// Get the Location of databse.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullasDefault: true
})

// Create a table in the database called "scopes"
knex.schema
    // Make sure no "scopes" table exists
    // before trying the create new
    .hasTable('scopes')
        .then((exists) => {
            if(!exists) {
                // If no "scopes" table exists
                // create new, with "scopeID", "scopeName", "scopeSerial", "eventDate",
                // "updatedDate" columns
                // and use "scopeID" as a primary identification
                // and increment "scopeID" with every new record (scope)
                return knex.schema.createTable('scopes', (table) => {
                    table.increments('scopeId').primary()
                    table.string('scopeName')
                    table.string('scopeType')
                    table.string('brandName')
                    table.string('modelNumber')
                    table.string('scopeSerial')
                    table.string('scopeStatus')
                    table.string('personnelName')
                    table.timestamp('eventDate').useNullasDefault
                    table.timestamp('updatedDate')
                    table.string('comments')
                })
                .then(() => {
                    // Log success message
                    console.log('Table \'Scopes\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            // Log success message
            console.log('done')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

knex.schema
    // Make sure no "scopes" table exists
    // before trying the create new
    .hasTable('users')
        .then((exists) => {
            if(!exists) {
                // If no "users" table exists
                return knex.schema.createTable('users', (table) => {
                    table.increments('userId').primary()
                    table.string('userName')
                    table.string('password')
                    table.string('role')
                    table.string('fullName')
                    table.string('dateOfBirth')
                    table.string('phoneNumber')
                    table.string('email')
                })
                .then(() => {
                    // Log success message
                    console.log('Table \'users\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            // Log success message
            console.log('done')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })




            
// Just for debugging purposes:
// Log all data in "scopes" table
knex.select('*').from('scopes')
    .then(data => console.log('data:', data))
    .catch(err => console.log(err))

// Export the database
module.exports = knex