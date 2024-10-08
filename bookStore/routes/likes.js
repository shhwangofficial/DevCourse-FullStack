import express from "express";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
    addLike,
    removeLike,
  } from "../controller/LikeController.js";

const router = express.Router();
router.use(express.json());

// 좋아요 추가
router.post('/:id', addLike);

// 좋아요 삭제
router.delete('/:id', removeLike);

export default router;