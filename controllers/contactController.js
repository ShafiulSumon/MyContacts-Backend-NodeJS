const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get All Contacts
// @route GET /api/contacts
// @access private 
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

// @desc Create New Contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body: ", req.body);

    const { name, email, phone } = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact);
});

// @desc Get Contact By Id
// @route GET /api/contacts/:id
// @access private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Get Update Contact By Id
// @route PUT /api/contacts/:id
// @access private
const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Permission denied due to this is other user's information!")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    );

    res.status(200).json(updatedContact);
});

// @desc Get Delete Contact By Id
// @route DELETE /api/contacts/:id
// @access private
const deleteContactById = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Permission denied due to this is other user's information!")
    }

    // await Contact.findByIdAndDelete(
    //     req.params.id,
    //     req.body
    // );

    await Contact.deleteById({ _id: req.params.id });
    console.log("wow--------wow")

    res.status(200).json(contact);
});

module.exports = {
    getContact,
    createContact,
    getContactById,
    updateContactById,
    deleteContactById
};