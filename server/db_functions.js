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

// Hash Function
const bcrypt = require('bcrypt');
const saltRounds = 10;
const kimTanStr = 'ttsh1';
const kimTanHash = '$2b$10$/YLOgYMoFUp/j97crhxKBetnWo9oeeL.MfHl5hFK7cpjtz3CE7BUC';
const cindyStr = 'candy';
const cindyHash = '$2b$10$JgcBDBEuj9UtudmLVOQpe.b16oW/LNcU68h4PHzZzBp9.naO0pZAu';

// -- Encrypt Password (Generate Hash)
// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(cindyStr, salt);
// console.log(hash)

// -- Decrypt password (Check Plaintxt against hash)
// console.log(bcrypt.compareSync(cindyStr, cindyHash));



/* 
    Get Closest Event
    closest_event: [ { scopeName: 'Scope A', eventDate: '2022-11-04 15:30:00' } ]
*/ 
knex.select('scopeName','eventDate').from('scopes').whereNotNull('eventDate').orderBy('eventDate').limit(1)
    .then(closest_event => console.log('closest_event:', closest_event))
    .catch(err => console.log(err))


/* 
    Get Count of each respective status
*/ 
knex('scopes').count('*').where('scopeStatus','Washing')
    .then(wash_count => console.log('wash_count:', wash_count[0]['count(*)']))
    .catch(err => console.log(err))

knex('scopes').count('*').where('scopeStatus','Drying')
    .then(drying_count => console.log('drying_count:', drying_count[0]['count(*)']))
    .catch(err => console.log(err))

knex('scopes').count('*').where('scopeStatus','Sample (Pass)')
    .then(pass_count => console.log('pass_count:', pass_count[0]['count(*)']))
    .catch(err => console.log(err))

knex('scopes').count('*').where('scopeStatus','Sample (Fail)')
    .then(fail_count => console.log('fail_count:', fail_count[0]['count(*)']))
    .catch(err => console.log(err))

knex.count('*').from('scopes').where('scopeStatus','Available')
    .then(avail_count => console.log('avail_count:', avail_count[0]['count(*)']))
    .catch(err => console.log(err))

knex('scopes').count('*').where('scopeStatus','Under Quarantine')
    .then(quarantine_count => console.log('quarantine_count:', quarantine_count[0]['count(*)']))
    .catch(err => console.log(err))
    
knex('scopes').count('*').where('scopeStatus','Out for Repair')
    .then(repair_count => console.log('repair_count:', repair_count[0]['count(*)']))
    .catch(err => console.log(err))


/* 
    Get Count of ALL GROUP STATUS
*/ 
knex('scopes').select('scopeStatus').count('*').groupBy('scopeStatus')
    .then(results => console.log('results:', results))
    // .then(results => console.log('results:', results[0]['scopeStatus']))
    .catch(err => console.log(err))




// SHUNYAO TODO: 
// (1) Linkup LOGIN
// (2) Linkup USER CREATION


/***** LOGIN *****/
// -- Step1: User Submit Username & Password [TAKE THIS 2 from FRONT-END]
var userName = 'kimTan'             // -- User typed (req.body)
var userPasswordString = 'ttsh1'    // -- User typed (req.body)

// -- Step2: Query DB for password hash and compare with userPasswordString
knex('users').select('password').where('userName', userName)
    .then(password => console.log("Login Attempt:", bcrypt.compareSync(userPasswordString, password[0]['password'])))
    .catch(err => console.log(err))
    // -- RETURNS TRUE/FALSE
    




/***** USER CREATION *****/
// -- Step1: HASH PASSWORD IN FRONT-END [WORKING IN home.tsx file]
const passwordString = "healthcare123"  // -- User typed NOT req.body YET
saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(passwordString, salt);
console.log(hash) // -- RETURN THIS HASH as req.body.password in form style

// -- Step2: Insert fields to DB
knex('users')
    .insert({
        'userName': req.body.userName,
        'password ': req.body.password, // THIS IS HASH NOT STRING
        'role': req.body.role,
        'fullName': req.body.fullName,
        'dateOfBirth': req.body.dateOfBirth,
        'phoneNumber': req.body.phoneNumber,
        'email': req.body.email
    })
    .then(() => {
        // Send a success message in response
        res.json({ message: `User \'${req.body.userName}\' is created!`})
    })
    .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.userName}: ${err}` })
    })


// var passwordHash1 = '$2a$10$b9.CUPmRYq1iXf4qw.t0xuJ9KVESqbtUuxqB..UhR6O/43LpGg1xi'
// var passwordHash2 = '$2a$10$9ph586Q1mnN/iqEoj9V2cuSR7d/iNgGUUPpxGJ2a1xCNUi4aXnx0q'
// console.log("1: ", bcrypt.compareSync("healthcare123", passwordHash1))
// console.log("2: ", bcrypt.compareSync("healthcare123", passwordHash2))
