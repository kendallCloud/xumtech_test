// src/api/question/questionRepository.ts
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question } from "./QuestionModel";

export class QuestionRepository {
  private QuestionsFilePath: string;
  private UnsolvedQuestionsFilePath: string;
  private questions: Question[] = [];
  //make singleton
  private static instance: QuestionRepository;


  constructor() {
    this.QuestionsFilePath = path.join(__dirname, "../../common/utils/Q&A.json");
    this.UnsolvedQuestionsFilePath = path.join(__dirname, "../../common/utils/unsolvedQuestions.json");
    this.cachedQuestions();
  }

  cachedQuestions = async () => {
    this.questions = await this.findAllAsync();
  }

  // Retrieves all questions
  async findAllAsync(): Promise<Question[]> {
    const data = await fs.readFile(this.QuestionsFilePath, "utf-8");
    return JSON.parse(data).questions as Question[];
  }

  async findAllunsolvedQuestionsAsync(): Promise<string[]> {
    const data = await fs.readFile(this.UnsolvedQuestionsFilePath, "utf-8");
    return JSON.parse(data).unsolvedQuestions as string[];
  }

  async addQuestionAsync(question: Question): Promise<void> {
    const data = await fs.readFile(this.QuestionsFilePath, "utf-8");
    const questions = JSON.parse(data).questions as Question[];
    questions.push(question);
    fs.writeFile(this.QuestionsFilePath, JSON.stringify({ questions }), "utf-8");
  }

   findBestAnswer  = (query: string): string | undefined => {
    if (!query) {
      return 'error';
    }
    const queryKeywordsSet = new Set(query.toLowerCase().split(/\s+/)); // Convert query words to a Set
  
    let bestMatch: Question | undefined;
    let maxScore = 0;
  
    for (const q of this.questions) {
      // Count how many keywords match by checking Set membership
      const score = q.keyWord.filter((keyword:String) => queryKeywordsSet.has(keyword.toLowerCase())).length;
  
      // If this question has more matches, update the best match
      if (score > maxScore) {
        maxScore = score;
        bestMatch = q;
      }
    }
  
    // Return the best matching answer, undefined if no match
    return bestMatch?.answer || undefined;
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
    let answer = questionMap.get(question) ;
    console.log('ANSWER===>',answer);
    answer =  !answer? this.findBestAnswer(question) : answer;


    if (!answer) {
      console.log('unsolved question===>',question);
      //TRY to find the best match using keywords

      const data = await fs.readFile(this.UnsolvedQuestionsFilePath, "utf-8");
      const unsolvedQuestions = JSON.parse(data).unsolvedQuestions as string[];
      unsolvedQuestions.push(question);
      fs.writeFile(this.UnsolvedQuestionsFilePath, JSON.stringify({ unsolvedQuestions }), "utf-8");
      return "Sorry, I don't have an answer for that. You can talk to my human partner for help, yyyyyyy@zzzzz.com";
    }
    return answer || null;
  }

  // Retrieves top 5 questions
  async findTop5Async(): Promise<Question[]> {
    const questions = await this.findAllAsync();
    return questions.slice(0, 5);
  }
}
