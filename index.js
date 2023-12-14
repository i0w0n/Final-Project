let express = require('express');
let app = express();

//MongoDB
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://EP:Ella3511@cluster0.g7izpmx.mongodb.net/?retryWrites=true&w=majority")
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();


app.use(express.json());

//////
let inputTracker = [];

app.post('/inputData', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        qZero: req.body.qZero,
        name: req.body.name,
        qOne: req.body.qOne,
        qTwo: req.body.qTwo,
        qThree: req.body.qThree
    }

    db.push("inputData", obj);

    // inputTracker.push(obj);
    // console.log(inputTracker);
    res.json({task:"success"});
})


app.use('/', express.static('public'));
app.listen(5000, ()=>{
    console.log('listening at localhost:5000');
}) 

app.get('/getInputData', (req,res) => {
    db.get("inputData").then(inputTrackerData => {
        let obj = {data: inputTrackerData};
        res.json(obj);
    })
})
