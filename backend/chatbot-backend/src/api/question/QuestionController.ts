// src/api/question/questionController.ts
import type { Request, Response } from "express";
import { questionService } from "./QuestionService";

export class QuestionController {
  // GET /api/questions
  async getAllQuestions(req: Request, res: Response): Promise<void> {
    const serviceResponse = await questionService.findAll();
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }
//GET /api/questions/unsolved
  async getAllunsolvedQuestions(req: Request, res: Response): Promise<void> {
    console.log("controller /questions/unsolved hit");
    const serviceResponse = await questionService.findAllunsolvedQuestions();
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }

  // GET /api/questions/:id
  async getQuestionById(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params.id);
    const serviceResponse = await questionService.findById(id);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }

  // GET /api/questions/top5
  async getTop5Questions(req: Request, res: Response): Promise<void> {
    const serviceResponse = await questionService.findTop5();
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }

  //Get /api/questions/answer
  async getAnswer(req: Request, res: Response): Promise<void> {
    const serviceResponse = await questionService.getAnswer(req.body.question as string);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }

  // POST /api/question/newAnswer
  async addQuestion(req: Request, res: Response): Promise<void> {
    const serviceResponse = await questionService.addQuestion(req.body);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }
}

export const questionController = new QuestionController();
