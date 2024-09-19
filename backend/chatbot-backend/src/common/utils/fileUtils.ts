import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question } from "../../api/question/QuestionModel";

const dataFilePath = path.join(__dirname, "src/common/utils/Q&A.json");

export const readQuestionsFromFile = async (): Promise<Question[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) as Question[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File does not exist, return empty array
      return [];
    } else {
      throw error;
    }
  }
};
