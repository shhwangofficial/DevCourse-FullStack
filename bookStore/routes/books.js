import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  allBooks,
  bookDetail,
} from "../controller/BookController.js";

const router = express.Router();
router.use(express.json());

// 전체 도서 조회 or 카테고리별 도서 목록 조회
router.get("/", allBooks);
// 개별 도서 조회
router.get("/:id", bookDetail);

export default router;
