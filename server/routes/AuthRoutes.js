import { Router } from "express";
import { getUserInfo, login, signup, updateProfile, addProfileImage, removeProfileImage } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middelware/AuthMiddelware.js";
import multer from 'multer';
const routes = Router();
const upload = multer({dest:"uploads/profiles"});

routes.post('/signup',signup);
routes.post('/login', login);
routes.get('/user-info',verifyToken, getUserInfo);
routes.post('/update-profile',verifyToken, updateProfile);
routes.post('/add-profile-image', verifyToken, upload.single("profile-image"), addProfileImage);
routes.delete('/remove-image', verifyToken, removeProfileImage);
export default routes;