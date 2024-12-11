const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "$ammarkhan9090";
const { user } = require("models/seeders/seeders");


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const alreadyexists = await user.findOne({
            where: { email: email },
        });

        if (alreadyexists) {
            return res.status(400).send({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_KEY || secretKey,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: newUser.name,
                id: newUser.id,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: "Missing email or password" });
        }

        const seeuser = await user.findOne({
            where: { email: email },
        });

        if (!seeuser) {
            return res.status(400).send({ error: "Email not found" });
        }

        const valid_pass = await bcrypt.compare(password, seeuser.password);

        if (!valid_pass) {
            return res.status(400).send({ error: "Password does not match" });
        }

        const token = jwt.sign(
            { id: seeuser.id },
            secretKey,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                name: seeuser.name,
                id: seeuser.id,
                email: seeuser.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to authenticate user" });
    }
};

module.exports = { signUp, signIn };
