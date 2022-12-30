var sqlite3 = require('sqlite3');

let db = initializeDatabase()
runQueries(db);
queryNumberOfScopes(db);

function initializeDatabase(){
    var dbname = 'main.db'
    var db = new sqlite3.Database('./' + dbname, sqlite3.OPEN_READWRITE, (err) => {
        if (err && err.code == "SQLITE_CANTOPEN") {
            console.log("[*] Input DB does not exist ...");
            createDatabase();
            return;
            } else if (err) {
                console.log("[!] Getting error " + err);
                exit(1);
        }
    });
    return db
}

function createDatabase() {
    console.log("[*] Creating DB...");
    var newdb = new sqlite3.Database(dbname, (err) => {
        if (err) {
            console.log("[!] Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(newdb) {
    console.log("[*] Creating Tables...");
    newdb.exec(`
    CREATE TABLE scopes (
        scopeId INT PRIMARY KEY NOT NULL,
        scopeName TEXT,
        scopeSerial TEXT,
        scopeStatus TEXT,
        eventDate NUMERIC,
        updatedDate NUMERIC
    );
    Insert into scopes 
        (scopeId, scopeName, scopeSerial, scopeStatus, eventDate, updatedDate) 
        values 
        (1, 'A', 'H41GH2', 'Available', 0, 1666323098512),
        (2, 'B', 'SF3511', 'Under Repair', 1666340867125, 1666210059863),
        (3, 'C', 'KJGJ21', 'Sampling', 1666399224636, 1666369163125),
        (4, 'D', 'G51JT1', 'Washing', 1666390241136, 1666373169215);
        `, ()  => {
            runQueries(newdb);
    });
}


function convertTime(epochDate){
    var epochObj = new Date(epochDate); // The 0 there is the key, which sets the date to the epoch
    return epochObj
}

function queryNumberOfScopes(db){
    console.log("[*] Getting number of scopes...");
    let totalCount = 0;
    let query = `select count(*) from scopes`
    // let query = `select count(*) totalCount from scopes where scopeStatus == 'Available'`
    db.get(query, (err, results) => 
        console.log(results['count(*)'])
        // totalCount = results['count(*)']
    );
    // return totalCount
    
}

function runQueries(db) {
    console.log("[*] Running Queries...");
    db.all(`select * from scopes`, (err, rows) => {
        rows.forEach(row => {
            var eventDate = convertTime(row.eventDate);
            var updatedDate = convertTime(row.updatedDate);

            console.log(row.scopeId + "\t" +row.scopeName + "\t" +row.scopeSerial + "\t" +row.scopeStatus + "\t" + eventDate + "\t" + updatedDate);
        });
    });
}