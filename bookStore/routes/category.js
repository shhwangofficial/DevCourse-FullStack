import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  allCategory
} from "../controller/CategoryController.js";

const router = express.Router();
router.use(express.json());

// 카테고리별 전체 목록 조회
router.get("/", allCategory);


export default router;