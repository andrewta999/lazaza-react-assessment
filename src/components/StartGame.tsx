import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import { Category } from "../types";
import Button from "../componentLibrary/Button";
import { DIFFICULTY } from "../utils/difficulty";

type StartGameProps = {
  categories: Category[];
  numQuestions: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setNumQuestions: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  startGame: () => void;
};

export default function StartGame({
  categories,
  numQuestions,
  setCategory,
  setNumQuestions,
  setDifficulty,
  startGame,
}: StartGameProps) {
  const theme = useTheme();
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      marginTop="50px"
    >
      <Flex direction="column">
        <div>How to Play</div>
        <ul>
          <li>Select number of questions, category, and difficulty mode</li>
          <li>Click "Start Playing" to start</li>
          <li>Answer questions one by one</li>
          <li>View scores at the end</li>
        </ul>
      </Flex>
      <Flex
        direction="row"
        justifyContent="space-around"
        marginBottom={theme.space_huge}
        width="90%"
      >
        <Flex direction="column">
          <div>Number of Questions:</div>
          <input
            type="text"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          />
        </Flex>

        <Flex direction="column">
          <div>Select Category:</div>
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </Flex>

        <Flex direction="column">
          <div>Select Difficulty:</div>
          <select onChange={(e) => setDifficulty(e.target.value)}>
            <option value={DIFFICULTY.EASY}>{DIFFICULTY.EASY}</option>
            <option value={DIFFICULTY.MEDIUM}>{DIFFICULTY.MEDIUM}</option>
            <option value={DIFFICULTY.HARD}>{DIFFICULTY.HARD}</option>
          </select>
        </Flex>
      </Flex>

      <Button onClick={startGame}>Start Playing</Button>
    </Flex>
  );
}
