const express = require('express');
const groupChatController = require('../controller/groupChatController');
const authentication = require('../middleware/userAuthentication');

const router = express.Router();

router.get('/group/getgroup', authentication.authenticationOfToken, groupChatController.getGroup);
router.post("/group/creategroup",authentication.authenticationOfToken,groupChatController.createGroup);
router.post("/group/sendmess",authentication.authenticationOfToken,groupChatController.sendmess);
router.get("/group/getsmss/:group_id",authentication.authenticationOfToken,groupChatController.loadmsg);
router.post("/group/memberdetail",authentication.authenticationOfToken,groupChatController.memberdetail);
router.post("/group/sendfile/:group_id",authentication.authenticationOfToken,groupChatController.sendfile);


module.exports = router;