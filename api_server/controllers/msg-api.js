const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
    messageModel
    .find()
    .sort( {'_id': -1} )
    .exec( (err, messages) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(messages);
        }
    });
};

const getMessage = (req, res) => {
    res.status(200).send("Successful API GET Request");
};

// POST Request Handler
const addNewMessage = (req, res) => {
    messageModel
    .create( req.body, (err, message) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(message);
        }
    });
};

// PUT Request Handler
const updateMessage = (req, res) => {
    res.status(200).send('Successful API PUT Request');
};

// DELETE Request Handler
const deleteAllMessages = (req, res) => {
    res.status(200).send('Successful API DELETE Request');
};

const deleteMessage = (req, res) => {
    res.status(200).send('Successful API DELETE Request');
};



module.exports = {
    getAllMessagesOrderedByLastPosted,
    getMessage,
    addNewMessage,
    updateMessage,
    deleteAllMessages,
    deleteMessage
}