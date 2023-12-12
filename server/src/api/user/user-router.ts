import express from "express"
import jwt from "jsonwebtoken"

import { User } from "../../models/UserModel";

const router = express.Router();

router.get('/', (req, res, next) => {
        const user = new User({emailAddress: "yahali100@gmail.com"});

        user.save()
    },
)

router.post('/login', (req, res) => {
    const user = { id: 1, username: 'example_user' };

    // Generate a token and send it as a response
    const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
    res.json({ token });
});

router.post('/register', async (req, res) => {
    try {
        const user = req.body
        const newUser = new User({...user})

        await newUser.validate();;
        const savedUser = await newUser.save();

        const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
        res.json({ token });
    
        console.log('User created successfully:', savedUser);
    } 
    catch (error) {
        console.error('Error creating user:', error.message);
    }
});

export default router;