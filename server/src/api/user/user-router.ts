import express from "express"
import jwt from "jsonwebtoken"

import { User } from "../../models/User";
import { logger } from "../../utils/logger";
import { generateTokens } from "./user-handler";

const router = express.Router();

router.post('/login', 
    (req, res) => {
        const { email, password, rememberMe } = req.body;

        const user = { id: 1, username: 'example_user' };

        const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

        res.json({ token });
    }
);

router.post('/register', 
    async (req, res) => {
        const user = req.body;
        const { email, password, rememberMe } = user

        const newUser = new User({email, password})

        await newUser.save();

        const { accessToken, refreshToken } = generateTokens({ email, password});

        res.json({ accessToken, refreshToken });
    
        logger.info('User created successfully:', user);
    }
);

export default router;