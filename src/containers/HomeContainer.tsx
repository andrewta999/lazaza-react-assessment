import { useState } from "react";
import APIClient from "../api/client";
import { useQuery } from "react-query";
import { DIFFICULTY, GAME_MODE } from "../utils/difficulty";
import StartGame from "../components/StartGame";
import MainGame from "../components/MainGame";
import FinishGame from "../components/FinishGame";
import Flex from "../componentLibrary/Flex";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const [category, setCategory] = useState("9");
  const [numQuestions, setNumQuestions] = useState("10");
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

  const [gameState, setGameState] = useState(GAME_MODE.START);
  const [numCorrect, setNumCorrect] = useState(0);

  const {
    data: categories = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => props.apiClient.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    refetchInterval: false,
    retry: 3, // Retry up to 3 times on failure
    retryDelay: attemptIndex => Math.min(attemptIndex * 1000, 3000)
  });

  const {
    data: questions = [],
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useQuery(
    ["questions", gameState, numQuestions, category, difficulty], 
    () => props.apiClient.getQuestions(numQuestions, category, difficulty),
    {
      enabled: gameState === GAME_MODE.PLAYING,
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
      refetchInterval: false,
      retry: 3, // Retry up to 3 times on failure
      retryDelay: attemptIndex => Math.min(attemptIndex * 1000, 3000)
    }
  );

  if (isCategoryLoading || isQuestionsLoading) return <div>Loading ... </div>;

  if (isCategoryError || isQuestionsError) return <div>Error please reload the page</div>

  const handleStartGame = () => {
    setGameState(GAME_MODE.PLAYING);
  };

  const handleFinishGame = () => {
    setGameState(GAME_MODE.FINISH);
  };

  const handleNewGame = () => {
    setNumQuestions("10");
    setCategory("");
    setDifficulty(DIFFICULTY.EASY);
    setGameState(GAME_MODE.START);
    setNumCorrect(0);
  };

  const renderGame = () => {
    switch (gameState) {
      case GAME_MODE.START:
        return (
          <StartGame
            numQuestions={numQuestions}
            categories={categories}
            setCategory={setCategory}
            setDifficulty={setDifficulty}
            setNumQuestions={setNumQuestions}
            startGame={handleStartGame}
          />
        );
      case GAME_MODE.PLAYING:
        return (
          <MainGame
            numQuestions={parseInt(numQuestions)}
            numCorrect={numCorrect}
            questions={questions}
            setNumCorrect={setNumCorrect}
            handleFinishGame={handleFinishGame}
          />
        );
      case GAME_MODE.FINISH:
        return <FinishGame 
          resetGame={handleNewGame}
          numCorrect={numCorrect}
          numQuestions={numQuestions} 
        />;
      default:
        return null;
    }
  };

  return <div>{renderGame()}</div>;
}
