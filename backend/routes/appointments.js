const moment = require("moment");
const express = require("express");
const appointmentmodeltemplate = require("../models/appointment");
const router = express.Router();
var crypto = require('crypto');


router.post("/newAppointment", async (req, res) => {

    console.log("in newAppointments")
    const meetingurl = "video.curabl.me/" + crypto.randomUUID();

    const slot = new appointmentmodeltemplate({
        doctorId: req.body.doctorId,
        date: req.body.date,
        slottime: req.body.slottime,
        slotperiod: req.body.slotperiod,
        meetingurl: meetingurl,
        patientId: req.body.patientId,
        status: "confirmed"
    });
    // res.send("temp"); 
    console.log("donecheck");
    slot.save()
        .then(data => {
            res.json(data);
            console.log(data);
        })
        .catch(error => {
            res.json(error);
            console.log(error);
        })
    // res.sendStatus( 201);
    console.log("done");
});

router.post('/getAppointments', async (req, res, next) => {
    console.log("in getAppointments")
    try {
        var patientId = req.body.patientId;
        // Date = moment(Date);
        console.log(Date);
        appointmentmodeltemplate.find({ patientId: patientId }).sort({ slottime: 1 }).exec((err, data) => {
            if (err) {
                console.log(err);
                res.send(data);
            }
            else {
                console.log(data);
                res.send(data);
            }


        });
        // res.send("Date response got");

        // slotmodeltemplate("date")


    } catch (error) {
        // res.status(400).send(error);

        res.send(error);
    }

});

module.exports = router;