import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import { UserModel } from "../models/User";
import { logger } from "../utils/logger";
import { generateToken } from "./auth-handlers";

const router = express.Router();

router.post('/login', 
    (req, res) => {
        const { email, password } = req.body;

        const user = { id: 1, username: 'example_user' };

        const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

        res.json({ token });
    }
);

router.post('/register', 
    async (req, res, next) => {
        const { mail, password } = req.body

        const newUser = new UserModel({mail, password})

        try {
            await newUser.save();
        }
        catch (error) {
            if (error instanceof mongoose.Mongo && error.code === 11000) {
                // Duplicate key error (unique constraint violated)
                res.status(400).json({ error: 'Duplicate key error. The name must be unique.' });
              } else {
                // Handle other errors
                res.status(500).json({ error: 'Internal server error.' });
              }
        }

        const user = await UserModel.findById(newUser._id).lean();

        res.locals.user = user;

        next();
    },
    
);

export default router;