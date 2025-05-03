import { Router } from "express";
import { getPreSignedUrl } from "../controllers/media-controllers";

const mediaRouter = Router(); 
mediaRouter.post("/signed-url", getPreSignedUrl)

export default mediaRouter; 