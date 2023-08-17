const express = require('express');

const middlewarePassValidation = (req, res, next) => {
    const body = req.body;

    if (body.password.length < 6) {
        res.status(400).send("Your password must be at least 6 character lenght");
        return;
    }

    next();

};    

module.exports = { middlewarePassValidation };