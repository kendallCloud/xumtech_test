// src/api/question/questionRepository.ts
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question } from "./QuestionModel";

export class QuestionRepository {
  private QuestionsFilePath: string;
  private UnsolvedQuestionsFilePath: string;


  constructor() {
    this.QuestionsFilePath = path.join(__dirname, "../../common/utils/Q&A.json");
    this.UnsolvedQuestionsFilePath = path.join(__dirname, "../../common/utils/unsolvedQuestions.json");
  }

  // Retrieves all questions
  async findAllAsync(): Promise<Question[]> {
    const data = await fs.readFile(this.QuestionsFilePath, "utf-8");
    return JSON.parse(data).questions as Question[];
  }
// post unsolved questions
  async setUnsolvedQuestionsAsync(question: string): Promise<void> {
    const data = await fs.readFile(this.UnsolvedQuestionsFilePath, "utf-8");
    //add question to unsolved questions
    const unsolvedQuestions = JSON.parse(data).unsolvedQuestions as string[];
    unsolvedQuestions.push(question);
    // console.log(unsolvedQuestions);
    fs.writeFile(this.UnsolvedQuestionsFilePath, data, "utf-8");
  }

  // Retrieves a question by ID
  async findByIdAsync(id: number): Promise<Question | null> {
    const questions = await this.findAllAsync();
    return questions.find((q) => q.id === id) || null;
  }
  // Retrieves an answer by question
  async getAnswerAsync(question: string): Promise<string | null> {
    const questions = await this.findAllAsync();

    // let answer = questions.find((q) => q.question === question)?.answer;

    const questionMap = new Map(questions.map(q => [q.question, q.answer]));
    let answer = questionMap.get(question);
    if (!answer) {
      const data = await fs.readFile(this.UnsolvedQuestionsFilePath, "utf-8");
      const unsolvedQuestions = JSON.parse(data).unsolved as string[];
      unsolvedQuestions.push(question);
      fs.writeFile(this.UnsolvedQuestionsFilePath, JSON.stringify({ unsolvedQuestions }), "utf-8");
      return "Sorry, I don't have an answer for that. You can talk to my human partner for help, yyyyyyy@zzzzz.com";
    }
    return answer || null;
  }

  // Retrieves top 5 questions
  async findTop5Async(): Promise<Question[]> {
    const questions = await this.findAllAsync();
    console.log(questions);
    return questions.slice(0, 5);
  }
}
