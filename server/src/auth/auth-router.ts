import express from "express"
import jwt from "jsonwebtoken";

import { UserViewModel } from "@mail/common"

import { InvalidTokenError } from "../errors/InvalidTokenError";
import { generateTokens } from "../api/user/user-handler";

const router = express.Router();

router.post('/refresh', 
    async (req, res) => {
        const refreshToken = req.body;

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, decodedPayload) => {
            if (error) {
                throw new InvalidTokenError();
            }

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(decodedPayload as UserViewModel);

            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    }
);