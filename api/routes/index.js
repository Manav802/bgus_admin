const  authRoutes = require('./auth')
const  adminDashboard = require('./adminDashboard')


const express =require('express')
const router = express.Router()

//middlewares 
router.use("/api/admin", authRoutes)
router.use("/api/admin",adminDashboard)

const errorMessage = {
    pageNotFound: 'Page Not Found'
}

//handling error 404 (Not Found)
router.use((req, res, next) => {
  
    const error = new Error(errorMessage.pageNotFound);
    error.status = 404;
    res.status(error.status).json({
        message: error.message
    })
});
    
module.exports = router