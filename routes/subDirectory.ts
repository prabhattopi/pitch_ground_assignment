import express from "express"

const router=express.Router()

import {getGoals,setGoals,updateGoals,deleteGoals} from "../controller/subDirectory.controller"
import {protect} from "../middlewares/authMiddleware"

router.route("/list").post(protect,getGoals)
router.route("/create").post(protect,setGoals)

router.route("/mark-as-done").post(protect,updateGoals)
router.route("/mark-as-not-done").post(protect,updateGoals)
router.route("/move-to-directory").post(protect,updateGoals)



export {router}
