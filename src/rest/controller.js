const express = require('express');
const fs = require('fs');
require('dotenv').config();

const controller = express.Router();

// Required endpoint so the widget is registered on the Takahe Magic Mirror
controller.post('/', async (req, res, next) => {
    try {
        const { clients } = req;
        const { userId } = req.body;

        if (userId) {
            if (!clients[userId]) {
                clients[userId] = {};
                return res.sendStatus(201);
            }
            return res.sendStatus(201);
        }
        return res.sendStatus(400);
    } catch (error) {
        next(error);
    }
});

// Required endpoint that is used by the Takahe Magic Mirror to get the HTML that has is going to be displayed
// on the mirror. The mirror uses sandboxed i-frames to display the widget, so you are free to return what ever content you like, as long as its HTML.
// The i-frame has a height of 20vh and a width of 100vw.
controller.get('/:userId', async (req, res, next) => {
    try {
        // Load the index.html
        const fileBuffer = await new Promise((resolve, reject) => {
            fs.readFile(`./public/index.html`, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        // Create your own HTML
        const widgetHTML = `<p>Replace this with your own HTML</p>`;

        // Add it to the index.html
        const html = fileBuffer
            .toString()
            .replace('{{widgetHTML}}', widgetHTML);

        // Send it to the Takahe Magic Mirror
        res.set('Content-Type', 'text/html');
        return res.send(html);
    } catch (error) {
        next(error);
    }
});

// Below you can add your own endpoints that your widget uses to get data to display.
controller.get('/:userId/html', async (req, res, next) => {
    try {
        const html = `<p>Here you can write your HTML</p>`;
        res.set('Content-Type', 'text/html');
        return res.send(html);
    } catch (error) {
        next(error);
    }
});

module.exports = controller;
