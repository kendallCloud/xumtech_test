// src/api/question/questionRepository.ts
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question } from "./QuestionModel";

export class QuestionRepository {
  private dataFilePath: string;

  constructor() {
    this.dataFilePath = path.join(__dirname, "../../common/utils/Q&A.json");
  }

  // Retrieves all questions
  async findAllAsync(): Promise<Question[]> {
    const data = await fs.readFile(this.dataFilePath, "utf-8");
    console.log(JSON.parse(data));
    return JSON.parse(data).questions as Question[];
  }

  // Retrieves a question by ID
  async findByIdAsync(id: number): Promise<Question | null> {
    const questions = await this.findAllAsync();
    return questions.find((q) => q.id === id) || null;
  }

  // Retrieves top 5 questions
  async findTop5Async(): Promise<Question[]> {
    const questions = await this.findAllAsync();
    console.log(questions);
    return questions.slice(0, 5);
  }
}
