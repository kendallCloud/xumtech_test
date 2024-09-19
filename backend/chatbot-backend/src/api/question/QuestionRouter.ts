// src/api/question/questionRouter.ts
import { Router } from "express";
import { questionController } from "./QuestionController";

const QuestionRouter = Router();

// GET /api/questions
QuestionRouter.get("/", (req, res) => questionController.getAllQuestions(req, res));

// GET /api/questions/top5
QuestionRouter.get("/top5", (req, res) => questionController.getTop5Questions(req, res));

// GET /api/questions/:id
QuestionRouter.get("/:id", (req, res) => questionController.getQuestionById(req, res));

export default QuestionRouter;
