import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
// src/api/question/questionService.ts
import { StatusCodes } from "http-status-codes";
import type { Question } from "./QuestionModel";
import { QuestionRepository } from "./QuestionRepository";

export class QuestionService {
  private questionRepository: QuestionRepository;

  constructor(repository: QuestionRepository = new QuestionRepository()) {
    this.questionRepository = repository;
  }

  // Retrieves all questions
  async findAll(): Promise<ServiceResponse<Question[] | null>> {
    try {
      const questions = await this.questionRepository.findAllAsync();
      if (!questions || questions.length === 0) {
        return ServiceResponse.failure("No questions found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Question[]>("Questions found", questions);
    } catch (ex) {
      const errorMessage = `Error finding all questions: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving questions.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addQuestion(question: Question): Promise<ServiceResponse<Question | null>> {
    try {
      await this.questionRepository.addQuestionAsync(question);
      logger.info("Question added successfully");
      return ServiceResponse.success<Question>("Question added successfully", question);
    } catch (ex) {
      const errorMessage = `Error adding question: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while adding the question.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllunsolvedQuestions(): Promise<ServiceResponse<string[] | null>> {
    try {
      console.log("inside service /unsolved");
      const questions = await this.questionRepository.findAllunsolvedQuestionsAsync();
      if (!questions || questions.length === 0) {
        logger.warn("No unsolved questions found");
        return ServiceResponse.failure("No questions found here", null, StatusCodes.NOT_FOUND);
      }
      console.log("unsolved questions found ",questions.length);
      logger.info("Unsolved questions found successfully ");
      return ServiceResponse.success<string[]>("Questions found", questions);
    } catch (ex) {
      const errorMessage = `Error finding all questions: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving questions.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAnswer(question: string): Promise<ServiceResponse<string>> {
    try {
      const answer = await this.questionRepository.getAnswerAsync(question);
      
      if (!answer) {
        return ServiceResponse.failure("No answer found", "null", StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<string>("result obtained", answer);
    } catch (ex) {
      const errorMessage = `Error finding answer: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving answer.",
        "null",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a question by ID
  async findById(id: number): Promise<ServiceResponse<Question | null>> {
    try {
      const question = await this.questionRepository.findByIdAsync(id);
      if (!question) {
        return ServiceResponse.failure("Question not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Question>("Question found", question);
    } catch (ex) {
      const errorMessage = `Error finding question with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding the question.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves top 5 questions
  async findTop5(): Promise<ServiceResponse<Question[] | null>> {
    try {
      const questions = await this.questionRepository.findTop5Async();
      if (!questions || questions.length === 0) {
        return ServiceResponse.failure("No questions found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Question[]>("Top 5 questions found", questions);
    } catch (ex) {
      const errorMessage = `Error finding top 5 questions: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving top questions.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const questionService = new QuestionService();
