import express from "express"
import { createFolder, getFoldersList, removeFolder } from "../controller/mainDirectory.controller"

const router=express.Router()

router.post("/create",createFolder)
router.post("/list",getFoldersList)
router.post("/remove",removeFolder)

export { router}