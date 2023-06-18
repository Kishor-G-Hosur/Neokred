const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
const User = require("./Model/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
    "mongodb://localhost:27017/userDetailss"
).then(() => {
    console.log("db is connected");
})

app.post("/", async (req, res) => {
    const {id}=req.body
    const users = await User.findOne({ _id: id });
    res.send(users);
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const users = await User.findOne({ email: email });
    if (users) {
        if (users.password == password) {
            res.send({message:"login Successful", user:users});
        }else{res.send({ message: "password not matching" })}
    } else {
        res.send({ message: "user not present... Register First!" })
    }
});

app.post("/signup", async (req, res) => {
    const { fullname, email, password, DOB, PhoneNO, Security, Address, City, State, Country, Zipcode } = req.body;
    const userdata = await new User({
        fullname: fullname,
        email: email,
        password: password,
        DOB: DOB,
        PhoneNO: PhoneNO,
        Security: Security,
        Address: Address,
        City: City,
        State: State,
        Zipcode: Zipcode,
        Country: Country
    });
    try {
        await userdata.save();
        res.send({ message: "Registered successfully" });
    } catch (err) {
        res.send({ message: err })
    }
});
app.listen(4000, () => {
    console.log("serve is running 3000 port");
});
