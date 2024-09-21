// src/question/questionRouter.ts
import { Router } from "express";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {Question} from "./QuestionModel";
import { questionController } from "./QuestionController";
import { z } from "zod";
export const questionRegistry = new OpenAPIRegistry();
const QuestionRouter = Router();

const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  keyWord: z.array(z.string()),
  answer: z.string(),
  frequency: z.number(),
});

const UnsolvedQuestionsResponseSchema = z.array(QuestionSchema);

// Register the schema for each route
questionRegistry.registerPath({
  method: "get",
  path: "/questions/unsolved",
  description: "Get all unsolved questions",
  responses: {
    200: {
      description: "List of unsolved questions",
      content: {
        "application/json": {
          schema: UnsolvedQuestionsResponseSchema,
        },
      },
    },
  },
});

questionRegistry.registerPath({
  method: "get",
  path: "/questions",
  description: "Get all questions",
  responses: {
    200: {
      description: "List of all questions",
      content: {
        "application/json": {
          schema: z.array(QuestionSchema),
        },
      },
    },
  },
});

questionRegistry.registerPath({
  method: "get",
  path: "/questions/top5",
  description: "Get top 5 questions",
  responses: {
    200: {
      description: "Top 5 questions",
      content: {
        "application/json": {
          schema: z.array(QuestionSchema),
        },
      },
    },
  },
});

questionRegistry.registerPath({
  method: "get",
  path: "/questions/:id",
  description: "Get question by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {},
    },
  ],
  responses: {
    200: {
      description: "Question details",
      content: {
        "application/json": {
          schema: QuestionSchema,
        },
      },
    },
    404: {
      description: "Question not found",
    },
  },
});

questionRegistry.registerPath({
  method: "post",
  path: "/questions/answer",
  description: "Submit an answer to a question",
  requestBody: {
    content: {
      "application/json": {
        schema: {},
      },
    },
  },
  responses: {
    200: {
      description: "Answer submitted",
    },
    400: {
      description: "Invalid input",
    },
  },
});

QuestionRouter.get('/unsolved', (req, res) => {
    console.log("Route handler /api/questions/unsolved hit");
    questionController.getAllunsolvedQuestions(req, res);
  });

  

  QuestionRouter.get('/newAnswer', (req, res) => {
    console.log("Route handler /api/questions/newAnswer hit");
    questionController.addQuestion(req, res);
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
