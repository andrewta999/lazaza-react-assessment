import Button from "../componentLibrary/Button";
import Flex from "../componentLibrary/Flex";

type FinishGameProps = {
  numCorrect: number;
  numQuestions: string;
  resetGame: () => void;
};
export default function FinishGame({
  numCorrect,
  numQuestions,
  resetGame,
}: FinishGameProps) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      marginTop="50px"
    >
      <div>Your Score</div>
      <div>{`${numCorrect}/${numQuestions}`}</div>
      <Button onClick={resetGame}>Start A New Game</Button>
    </Flex>
  );
}
