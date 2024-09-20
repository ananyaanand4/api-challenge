import { Router, Request, Response } from "express";
import { StatusCode } from "status-code-enum";
import { isValidEncodeFormat } from "./hack-formats";

const hackRouter = Router();

let crypto = require('crypto');
let secret = '1234567890abcdef1234567890abcdef';
let iv = '1234567890abcdef';

/**
 * @api {post} /hack/encode/ POST /hack/encode/
 * @apiGroup Hack
 * @apiDescription Post the encoded version of the data
 *
 * @apiParam {Json} UINFO User and the information of the user
 * 
 * @apiSuccess (200: Success) {Json} token encoded string
 * @apiSuccess (200: Success) {Json} context empty dictionary

 * @apiSuccessExample Example Success Response:
 * 	HTTP/1.1 200 OK
 *	{
 *		"token": "ilovehackillinois",
 * 		"context": {}
 * 	}
 * 
 * @apiUse strongVerifyErrors
 * @apiError (CODE: 400) {String} MissingParam user info is not passed to api endpoint
 */
 hackRouter.post("/encode/",  async (req: Request, res: Response) => {
    const userInfo = req.body;

    if (!userInfo) {
        return res.status(400).send({ error: "User info parameter is undefined" });
    }

    //encoding userInfo json and getting hash string
    const userInfoStr = JSON.stringify(userInfo);
    if (!isValidEncodeFormat(userInfoStr)) {

    }

    const cipher = crypto.createCipheriv('aes-256-cbc', secret, iv);
    let hashToken = cipher.update(userInfoStr, 'utf-8', 'hex');
    hashToken += cipher.final('hex');

    return res.status(StatusCode.SuccessOK).send({ token: hashToken, context: {}});

 });

 /**
 * @api {post} /hack/decode/ POST /hack/decode/
 * @apiGroup Hack
 * @apiDescription Given the encoded token return the original json
 *
 * @apiParam {Json} HTOK token with the given string
 * 
 * @apiSuccess (200: Success) {Json} userInfo the orignal user information json

 * @apiSuccessExample Example Success Response:
 * 	HTTP/1.1 200 OK
 *	{
 *		"user": "ananya",
 * 		"data": {"role": "admin", "access_level": 5}
 * 	}
 * 
 * @apiUse strongVerifyErrors
 * @apiError (CODE: 400) {String} MissingParam token info is not passed to api endpoint
 */
 hackRouter.post("/decode/",  async (req: Request, res: Response) => {
    const tokenInfo = req.body;
    const token = tokenInfo.token;

    if (!tokenInfo) {
        return res.status(400).send({ error: "token info parameter is undefined" });
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', secret, iv);
    let userStr = decipher.update(token, 'hex', 'utf-8');
    userStr += decipher.final('utf-8');

    const userJson = JSON.parse(userStr);

    return res.status(StatusCode.SuccessOK).send(userJson);
 });


 export default hackRouter;