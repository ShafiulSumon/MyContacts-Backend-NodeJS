const { 
    getContact, 
    createContact, 
    getContactById, 
    updateContactById, 
    deleteContactById 
} = require("../controllers/contactController");

const express = require('express');
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContact);
router.route("/").post(createContact);
router.route("/:id").get(getContactById);
router.route("/:id").put(updateContactById); 
router.route("/:id").delete(deleteContactById);



module.exports = router;