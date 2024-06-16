export type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Category = {
  id: number;
  name: string;
}
