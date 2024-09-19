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
