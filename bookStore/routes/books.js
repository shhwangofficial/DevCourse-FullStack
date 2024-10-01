import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

// 전체 도서 조회
router.get("/", (req, res) => {});
// 개별 도서 조회
router.get("/:id", (req, res) => {});
// 카테고리별 도서 목록 조회
router.get("/?category", (req, res) => {});

export default router;