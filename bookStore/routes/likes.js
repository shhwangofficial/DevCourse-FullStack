import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

// 좋아요 추가
router.post('/:bookId', (req, res) => {
    
})

// 좋아요 삭제
router.delete('/:bookId', (req, res) => {

})

export default router;