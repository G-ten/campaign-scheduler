const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/createUser", function (req, res) {
    authController.createUser(req.body)
        .then(status => {
            res.status(200).send(status)
        })
        .catch(status => {
            res.status(404).send(status)
        });
});

router.post("/login", function (req, res) {
    authController.userLogin(req.body)
        .then(status => {
            res.status(200).send(status)
        })
        .catch(status => {
            res.status(404).send(status)
        });
});

module.exports = router;