import express from "express"
import jwt from "jsonwebtoken"

import { User } from "../../models/User";
import { logger } from "../../utils/logger";

const router = express.Router();

router.get('/', 
    (req, res, next) => {
        res.send('yes')
    },
)

router.post('/login', 
    (req, res) => {
    const user = { id: 1, username: 'example_user' };

    const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
    res.json({ token });
    }
);

router.post('/register', 
    async (req, res) => {
        try {
            const user = req.body
            const newUser = new User({...user})

            await newUser.save();

            const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
            res.json({ token });
        
            logger.info('User created successfully:', user);
        } 
        catch (error) {
            logger.error('Error creating user:', error.message);

            console.log(error.message)
        }
    }
);

export default router;