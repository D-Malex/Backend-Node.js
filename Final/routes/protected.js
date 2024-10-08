const router = require('express').Router();

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');

//This is a protected route - we pass in the authMiddleware function to verify the JWT token before returning anything.
router.get('/', authMiddleware, (req, res)=>{
    res.json(`This is a protected route - your user ID is: ${req.user.id}`);
    //modifco a res.json asi mando la rta en json
    //Si llego aca es pq esta logueado con su token
});



module.exports = router;