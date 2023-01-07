const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address.");
            }
        }
    },
    password: {
        type: String,
        min: 7,
        trim: true,
        validate: (value) => {
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not contain the key password.");
            }
        }
    }
});

userSchema.pre("save", async function(next){
    const user = this;
    user.password = await bcryptjs.hash(user.password, 8);
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if(!user){
        return {error: "Invalid credentials"};
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch){
        return {error: "Invalid credentials"};
    }

    // if(!user.confirmed){
    //     return {error: "Please confirm your email account."};
    // }

    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

