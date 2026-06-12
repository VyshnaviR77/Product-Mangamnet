const user = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')



exports.registerController = async (req, res) => {
    console.log("inside register api");

    const { name, email, password } = req.body
    console.log(name, email, password);


    try {
        const exitingUser = await user.findOne({ email })
        if (exitingUser) {
            res.status(409).json("User Already Exist")
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new user({ name, email, password: hashedPassword })
            await newUser.save()
            res.status(200).json(newUser)

        }
    }
    catch (err) {
        res.status(400).json(err)
    }


}

// login
exports.loginController = async (req, res) => {
    console.log("inside loginController");

    const { email, password } = req.body
    try {
        const exitingloginUser = await user.findOne({ email })

        if (!exitingloginUser) {
            return res.status(401).json("Account Not Exist");
        }


        const isMatch = await bcrypt.compare(
            password,
            exitingloginUser.password
        );

        if (!isMatch) {
            return res.status(404).json("Invalid email or password");
        }


        //token

        const token = jwt.sign({id: user._id, UserEmail: exitingloginUser.email }, process.env.jwt_password)
        res.status(200).json({ user: exitingloginUser, token })

    }

       
    
    catch (err) {
    res.status(500).json(err)
}
}


