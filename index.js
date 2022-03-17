

const express = require("express");
const cors = require("cors");
const admin = require("./firebase/cred.js");
const dotenv = require("dotenv").config();


const app = express();
const port = process.env.PORT;

// const auth = require("./auth/auth.js");


const database = admin.firestore();



// Middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

app.post("/checkin", async(request, response) => {
    let name = request.body.name;

    let type = request.body.type;
    //TODO: change firestore database to host list of meetings attended

    //time is done using Date.now()  - type this exactly in javascript frontend, returns exact time from 1970 in milliseconds
    // let time = request.body.checkin;
    let time = Date.now();
    let nameToCheckIn = await database.collection('roster').where('name', '==', name).get();
    let allMeetings = await database.collection('meetings').where('type', '==', type).get();
    let correctMeeting = undefined;
    //use
    let validTime = false;
    allMeetings.forEach((doc) => {
        let meetingdata = doc.data();

        if(meetingdata.start.toMillis() <= time && meetingdata.end.toMillis() >= time && type === meetingdata.type) {

            validTime = true;
            correctMeeting = doc;
        }

    })

    if(!validTime) {
        return response.json({msg: "invalid time"});
    } else if(nameToCheckIn.empty) {
        return response.json({msg: "name is not valid"});
    } else {
        nameToCheckIn.forEach((doc) => {
            let docData = doc.data();

            let meetingData = correctMeeting.data();

            //TODO: add boolean to determine if already checked in

            if(!meetingData.people.includes(docData.name)) {
                meetingData.people.push(docData.name);
                if(type === "Product") {
                    docData.Product.push(correctMeeting.id);
                }
                if(type === "General") {
                    docData.General.push(correctMeeting.id);
                }
                if(type === "Engineering") {
                    docData.Engineering.push(correctMeeting.id);
                }
                if(type === "Design") {
                    docData.Design.push(correctMeeting.id);
                }
            }


            correctMeeting.ref.set(meetingData);
            doc.ref.set(docData);


        });

        return response.json({msg: "name is valid"});
    }
});

//TODO: add authentication
app.post("/change-name", async(request, response) => {
    let name = request.body.name;
    let newName = request.body.newName;

    let temp = await database.collection('roster').where('name', '==', name).get();
    if(temp.empty) {
        return response.json({msg: "name is not valid"});
    } else {
        temp.forEach((doc) => {
            let docData = doc.data();
            docData.name = newName;
            let pms = docData.Product;
            let gms = docData.General;
            let ems = docData.Engineering;
            let dms = docData.Design;
            let meetings = pms.concat(gms, ems, dms);

            //update all the meetings that the person was in
            meetings.forEach(async(meeting) => {
                let meetingData = await database.collection('meetings').doc(meeting).get();
                let meetingToUpdate = await database.collection('meetings').doc(meeting);
                let dataToUpdate = meetingData.data();

                let index = dataToUpdate.people.indexOf(name);
                if(index !== -1) {
                    dataToUpdate.people[index] = newName;
                }
                meetingToUpdate.set(dataToUpdate);
            })
            doc.ref.set(docData);
        });
        return response.json({msg: "name is valid"});
    }
});


app.get("/current-time", async(request, response) => {
    let time = Date.now();
    return response.json({time: time});
});
app.get("/all-users", async(request, response) => {
    let allUsers = await database.collection('roster').get();
    let users = {};
    allUsers.forEach((doc) => {
        let docData = doc.data();
        let name = docData.name;
        users[name] = doc.id;
    });
    return response.json(users);
});


// //create meeting document under meetings collection
app.post("/create-meeting", async(request, response) => {
    let type = request.body.type;
    let start = request.body.start;
    let end = request.body.end;

    let allMeetings = await database.collection('meetings').where('type', '==', type).get();
    let validTime = false;
    allMeetings.forEach((doc) => {
        let meetingdata = doc.data();

        if(((meetingdata.start <= end && meetingdata.start >= start) ||  (meetingdata.end >= start && meetingdata.end <= end )) && type === meetingdata.type) {

            validTime = true;
            correctMeeting = doc;
        }

    })
    if(validTime) {
        return response.json({msg: "event type overlap"})
    }
    const count = await database.collection('stats').doc(`${type}`).get();
    const temptemp = await database.collection('stats').doc(`${type}`);
    let countTemp = count.data().num;
    countTemp++;
    temptemp.set({
        num: countTemp
    });


    const temp = await database.collection('meetings').add({
        type: type,
        start: new Date(start), //admin.firestore.Timestamp.fromDate(
        end: new Date(end),
        number: countTemp,
        people: []

    })

    return response.json({msg:"added successfully"});


});


app.post("/edit-meeting", async(request, response) => {
    let meetingID = request.body.meetingID;
    let type = request.body.type;
    let start = request.body.start;
    let end = request.body.end;
    let people = request.body.people;
    let meeting = await database.collection('meetings').doc(meetingID);
    if(!meeting) {
        return response.json({msg: "no such id"});
    }
    let meetingData = await meeting.get();
    let meetingToUpdate = meetingData.data();
    if(type) {
        meetingToUpdate.type = type;
    }
    if(start) {

        meetingToUpdate.start = start;
    }
    if(end) {
        meetingToUpdate.end = end;
    }
    if(people) {
        meetingToUpdate.people = people;
    }

    const temp = await database.collection('meetings').doc(meetingID).set({
        type:meetingToUpdate.type,
        start:new Date(meetingToUpdate.start),
        end: new Date(meetingToUpdate.end),
        people:meetingToUpdate.people
    })

    // meetingData.ref.set(meetingToUpdate);
    return response.json({msg: "meeting updated"});
});



app.post("/create-user", async(request, response) => {
    let name = request.body.name;
    let type = request.body.fellowship;
    let nameRoster = await database.collection('roster').get();
    let found = false;
    nameRoster.forEach((nameelement) => {
        let data = nameelement.data();
        if(data.name == name) {
            found = true;
            return response.json({msg: "user already exists"})
        }
    });

    if(!found) {
        const temp = await database.collection('roster').add({
            name: `${name}`,
            fellowship: `${type}`,
            Design: [],
            Engineering: [],
            General: [],
            Product: []

        })
        return response.json({msg: "user added"})
    }

});




app.get("/meetings", async(request, response) => {
    let name = request.body.name;
    let nameDocument = await database.collection('roster').where('name', '==', name).get();

})






