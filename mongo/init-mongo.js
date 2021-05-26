db.createCollection("events", {});
db.createCollection("registrations", {});

let res = db.events.insertOne({
    "name": "Grand Concert",
    "date": "2021-04-10",
    "location": "ASG group",
    "guests": [
        "Bryan Adams"
    ]
});

db.registrations.insertOne({
    eventId: res.insertedId.valueOf(),
    externalAttendeeDetailsId: 1
})

db.registrations.insertOne({
    eventId: res.insertedId.valueOf(),
    externalAttendeeDetailsId: 2
})

res = db.events.insertOne({
    name: 'Bike Show',
    date: '2021-04-10',
    location: 'ASG group',
    guests: [
        'Valentino Rossi'
    ]
})

db.registrations.insertOne({
    eventId: res.insertedId.valueOf(),
    externalAttendeeDetailsId: 4
})

db.events.insertOne({
    name: 'We run Vilnius',
    date: '2021-04-10',
    location: 'ASG group',
    guests: [
        'Usain Bolt'
    ]
})


