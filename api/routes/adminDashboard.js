const express = require('express')
const { getContacts, getFeedbacks, getReports, getServices, deleteContacts, deleteFeedbacks, deleteReports, deleteServices } =
require('../controllers/adminDashboard')
const { isSignedIn, isAdmin } = require('../controllers/auth')
const Router = express.Router()


// Get All Contacts 
Router.get('/contact/all',isSignedIn,isAdmin, getContacts)

//Get All  Feedbacks
Router.get('/feedback/all',isSignedIn,isAdmin,getFeedbacks)

//Get all  Reports 
Router.get('/report/all',isSignedIn,isAdmin,getReports)

//Get all  Service Demands
Router.get('/service/all',isSignedIn,isAdmin,getServices)



// toggling API
Router.put('/contact/delete',isSignedIn,isAdmin,deleteContacts)
Router.put('/feedback/delete',isSignedIn,isAdmin,deleteFeedbacks)
Router.put('/report/delete',isSignedIn,isAdmin,deleteReports)
Router.put('/service/delete',isSignedIn,isAdmin,deleteServices)


//exporting the module
module.exports = Router