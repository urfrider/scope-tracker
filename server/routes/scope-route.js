// Import express 
const express = require('express')

// Import scope-controller
const scopeRoutes = require('./../controllers/scope-controller.js')

// Create router
const router = express.Router()


// Add route for GET request to retrieve all Scopes
// In server.js, Scopes is specified as '/scopes'
// this means that '/all' translates to '/scopes/all'
router.get('/all', scopeRoutes.scopesAll)

// Add route for POST request to create new Scopes
// In server.js, Scopes route is specified as '/scopes'
// this means that '/create' translates to '/scopes/create'
router.post('/create', scopeRoutes.scopeCreate)

// Add route for PUT request to delete specific Scope
// In server.js, Scopes route is specified as '/scopes'
// this means that '/delete' translates to '/scopes/delete'
router.put('/delete', scopeRoutes.scopeDelete)

// Add route for PUT request to reset scope list
// In server.js, Scopes route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/reset', scopeRoutes.scopeReset)

router.get('/avail', scopeRoutes.scopeAvail)

router.put('/updateStatus', scopeRoutes.updateScopeStatus)

router.get('/closestEvent', scopeRoutes.getClostestEvent)

router.get('/scoupeStatus', scopeRoutes.getScopeStatus)

router.put('/updateSchedule', scopeRoutes.updateScopeSchedule)

router.put('/nurseUpdateScopeStatus', scopeRoutes.nurseUpdateScopeStatus)

router.post('/authenthecateAdmin', scopeRoutes.authenthecateAdmin)

router.post('/authenthecateUser', scopeRoutes.authenthecateUser)

// router.put('/createUser', scopeRoutes.createUser)

// Export router
module.exports = router