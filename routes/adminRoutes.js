const express = require('express');

const router = express.Router();

const adminController=require('../controller/adminController')
const authentication=require('../middleware/userAuthentication')

router.post("/admin/invitesearch",authentication.authenticationOfAdmin, adminController.addviainput)
router.post("/admin",authentication.authenticationOfAdmin, adminController.verifyadmin)
router.post("/admin/promote",authentication.authenticationOfAdmin, adminController.promote)
router.post("/admin/kick",authentication.authenticationOfAdmin, adminController.kick)



module.exports = router;




