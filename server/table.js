// Import path module
const { Console } = require('console')
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

var datafile = require('./data_rows.json');
var data_rows = datafile.rowdata;
for (let rowid = 0; rowid < data_rows.length; rowid++) {
    // Mass insert of data
    var dataRow = data_rows[rowid]
    console.log(dataRow.scopeName)
    knex('scopes').insert({
            'scopeName': dataRow.scopeName,
            'scopeType ': dataRow.scopeType,
            'brandName': dataRow.brandName,
            'modelNumber': dataRow.modelNumber,
            'scopeSerial': dataRow.scopeSerial,
            'scopeStatus': dataRow.scopeStatus,
            'personnelName': dataRow.personnelName,
            'eventDate': dataRow.eventDate,
            'updatedDate': dataRow.updatedDate,
            'comments': dataRow.comments
        })
        .then(() => {
            // Send a success message in response
            console.log("[*] Inserted Row!")
        })
        .catch(err => {
            // Send a error message in response
            console.log("[!] Row failed to insert!")
        })
   
}

var userfile = require('./user_rows.json');
var user_rows = userfile.userdata;

for (let rowid = 0; rowid < user_rows.length; rowid++) {
    // Mass insert of data
    var userRow = user_rows[rowid]
    knex('users').insert({
            'userName': userRow.userName,
            'password ': userRow.password,
            'role': userRow.role,
            'fullName': userRow.fullName,
            'dateOfBirth': userRow.dateOfBirth,
            'phoneNumber': userRow.phoneNumber,
            'email': userRow.email
        })
        .then(() => {
            // Send a success message in response
            console.log("[*] Inserted Row!")
        })
        .catch(err => {
            // Send a error message in response
            console.log("[!] Row failed to insert!")
        })
   
}


// Just for debugging purposes:
// Log all data in "scopes" table
// knex.select('*').from('scopes')
//     .then(data => console.log('data:', data))
//     .catch(err => console.log(err))

// Export the database
module.exports = knex