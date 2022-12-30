// Import Database
const knex = require('./../db')
const bcrypt = require("bcryptjs");
const e = require('express');
const saltRounds = 10;

// Retreve all scopes
exports.scopesAll = async(req, res) => {
    //Get all scopes from database
    knex
        .select('*') // select all records
        .from('scopes') // from 'scopes' table
        .then(userData => {
            // Send scopes extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving scopes: ${err}`})
        })
}

// Create new scope
exports.scopeCreate = async(req, res) => {
    // Add new scope to database
    knex('scopes')
        .insert({
            'scopeName': req.body.scopeName,
            'scopeType': req.body.scopeType,
            'brandName': req.body.brandName,
            'modelNumber': req.body.modelNumber,
            'scopeSerial': req.body.scopeSerial,
            'scopeStatus': req.body.scopeStatus,
            'personnelName': req.body.personnelName,
            'eventDate': req.body.eventDate,
            'updatedDate': req.body.updatedDate,
            'comments': req.body.comments
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `Scope \'${req.body.scopeName}\' is created on ${req.body.eventDate}!`})
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating ${req.body.scopeName}: ${err}` })
        })
}

// Remove Specific Scope
exports.scopeDelete = async (req, res) => {
    //Find Specific Scope and remove it
    knex('scopes')
        .where('scopeId', req.body.scopeId) // find correct record based on id
        .del() // delete the record
        .then(() => {
            // Sends a success message in response
            res.json({ message: `${req.body.scopeName} deleted.`})
        })
        .catch(err => {
            // Sends a error message in response
            res.json({ message: `There was an error deleting ${req.body.scopeName}.`})
        })
}

exports.scopeReset = async (req, res) => {
    // Remove all scopes from database
    knex
        .select('*') // Select all scopes
        .from('scopes') // from 'scopes' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'All Scopes cleared'})
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting scope list: ${err}.`})
        })
}

exports.scopeAvail = async (req, res) => {
    // Gather all scopes that are Available
    knex
        .count("*")
        .from('scopes')
        .where('scopeStatus', 'Available')
        .then(count => {
            res.json(count)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error counting scopes: ${err}`})
        })
}

exports.updateScopeStatus = async (req, res) => {
    knex('scopes')
        .where('scopeId', req.body.scopeId)
        .update({
            scopeStatus: req.body.scopeStatus
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: 'Scopes Updated!'})
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating scopes: ${err}`})
        })
}

exports.getClostestEvent = async (req, res) => {
    knex('scopes')
        .select('scopeName','eventDate')
        .from('scopes')
        .whereNotNull('eventDate')
        .where('eventDate', '>=', knex.fn.now())
        .orderBy('eventDate')
        .limit(1)
        .then((closestDate) => {
            // Send a success message in response
            res.json(closestDate)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retreiving closest dated scopes: ${err}`})
        })
}

exports.getScopeStatus = async(req, res) => {
    knex('scopes')
    .select('scopeStatus')
    .count('*')
    .groupBy('scopeStatus')
    .then((results) => {
        res.json(results)
    })
    .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retreiving scope status counts: ${err}`})
    })
}

exports.updateScopeSchedule = async (req, res) => {
    knex('scopes')
        .where('scopeId', req.body.scopeId)
        .update({
            personnelName: req.body.personnelName,
            eventDate: req.body.eventDate,
            updatedDate: req.body.updatedDate,
            comments: req.body.comments
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: 'Scopes Updated!'})
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating scopes: ${err}`})
        })
}

exports.nurseUpdateScopeStatus = async (req, res) => {
    knex('scopes')
        .where('scopeId', req.body.scopeId)
        .update({
            scopeStatus: req.body.scopeStatus,
            personnelName: req.body.personnelName,
            updatedDate: req.body.updatedDate,
            comments: req.body.comments
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: 'Scopes Updated!'})
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating scopes: ${err}`})
        })
}

exports.authenthecateAdmin = async (req, res) => {
    knex('users')
        .select('password')
        .where('userName', req.body.userName)
        .where('role', 'admin')
        .then((password) => {
                var status = bcrypt.compareSync(req.body.password, password[0]['password'])
                res.json(status);
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error authenticating!` + err})
        })
}

exports.authenthecateUser = async (req, res) => {
    knex('users')
        .select('password')
        .where('userName', req.body.userName)
        .then((password) => {
            var status = bcrypt.compareSync(req.body.password, password[0]['password'])
            res.json(status);          
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error authenticating!` + req.body.password });
        })
}

exports.createUsers = async (req, res) => {
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
}