// src/api/question/questionController.ts
import type { Request, Response } from "express";
import { questionService } from "./QuestionService";

export class QuestionController {
  // GET /api/questions
  async getAllQuestions(req: Request, res: Response): Promise<void> {
    const serviceResponse = await questionService.findAll();
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
    console.log("pregunta --++>",req.body);
    const serviceResponse = await questionService.getAnswer(req.body.question as string);
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }
}

export const questionController = new QuestionController();
