import { useState } from "react";
import Flex from "../componentLibrary/Flex";
import { Question } from "../types";
import Button from "../componentLibrary/Button";
import { shuffleAnswers } from "../utils/game";

type MainGameProps = {
    numQuestions: number;
    numCorrect: number;
    questions: Question[];
    setNumCorrect: React.Dispatch<React.SetStateAction<number>>;
    handleFinishGame: () => void;
}

export default function MainGame({numCorrect, numQuestions, questions, setNumCorrect, handleFinishGame}: MainGameProps) {
  const [curQuetionIndex, setCurQuestionIndex] = useState(0);
  const [curQuestion, setCurQuestion] = useState<Question>(questions[0])
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState<string[]>(shuffleAnswers(questions[0]))
  const [numRemain, setNumRemain] = useState(numQuestions);

  const handleNextQuestion = () => {
    if (selectedOption === "") {
      return;
    }

    if (selectedOption === curQuestion.correct_answer) {
      setNumCorrect(numCorrect + 1);
    }

    // handle end game
    if(numRemain === 1) {
      handleFinishGame();
      return;
    }

    const nextQuestion = questions[curQuetionIndex + 1];
    setNumRemain(numRemain - 1);
    setCurQuestionIndex(curQuetionIndex + 1);
    setCurQuestion(nextQuestion)
    setOptions(shuffleAnswers(nextQuestion))
    setSelectedOption("");
  }

  return (<Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="100%"
    width="100%"
    marginTop="50px"
  >
    <div>
      Number of Questions Answers Correctly: {numCorrect}
    </div>
    <div>
      Number of Remaining Questions: {numRemain}
    </div>
    <div>
      <h3><div dangerouslySetInnerHTML={{ __html: curQuestion.question }} /></h3>
      <div>
        {options.map(option => <div key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
          />
          {option}
        </div>)}
      </div>
    </div>
    <Button onClick={handleNextQuestion}>Next Question</Button>
  </Flex>);
}
