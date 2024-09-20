// src/api/question/questionRouter.ts
import { Router } from "express";
import { questionController } from "./QuestionController";

const QuestionRouter = Router();

QuestionRouter.get('/unsolved', (req, res) => {
    console.log("Route handler /api/questions/unsolved hit");
    questionController.getAllunsolvedQuestions(req, res);
  });

// GET /questions
QuestionRouter.get("/", (req, res) => questionController.getAllQuestions(req, res));

// GET /questions/top5
QuestionRouter.get("/top5", (req, res) => questionController.getTop5Questions(req, res));

// GET /questions/:id
QuestionRouter.get("/:id", (req, res) => questionController.getQuestionById(req, res));
// GET /questions/answer/:question
QuestionRouter.post("/answer", (req, res) => questionController.getAnswer(req, res));

export default QuestionRouter;
