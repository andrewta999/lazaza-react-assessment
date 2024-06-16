import { Question, Category } from "../types";
import unreliableAxios from "./unreliableAxios";

const TYPE = "multiple";

export default class APIClient {
  baseURL: string;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getQuestions(numQuestions: string, category: string, difficulty: string) {
    const res = (await unreliableAxios.get(
      this.baseURL +
        `/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${TYPE}`
    )) as unknown as { data: { results: Question[] } };

    return res.data.results;
  }

  public async getCategories() {
    const res = (await unreliableAxios.get(
      `${this.baseURL}/api_category.php`
    )) as unknown as { data: { trivia_categories: Category[] } };

    return res.data.trivia_categories;
  }
}
