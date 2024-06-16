import { render, fireEvent } from '@testing-library/react';
import MainGame from '../src/components/MainGame';
import '@testing-library/jest-dom';
import { Question } from '../src/types';


describe('MainGame component', () => {
  const mockQuestions: Question[] = [
    {
      question: 'What is 2 + 2?',
      correct_answer: '4',
      incorrect_answers: ['3', '5', '6'],
      type: "multiple",
      difficulty: "easy",
      category: "math"
    },
    {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['London', 'Berlin', 'Rome'],
      type: "multiple",
      difficulty: "easy",
      category: "geography"
    },
  ];

  it('renders correctly with initial state', () => {
    const { getByText, getAllByRole } = render(
      <MainGame
        numCorrect={0}
        numQuestions={2}
        questions={mockQuestions}
        setNumCorrect={jest.fn()}
        handleFinishGame={jest.fn()}
      />
    );

    // Check if initial state renders correctly
    expect(getByText('Number of Questions Answers Correctly: 0')).toBeInTheDocument();
    expect(getByText('Number of Remaining Questions: 2')).toBeInTheDocument();

    // Check if the first question is rendered
    expect(getByText('What is 2 + 2?')).toBeInTheDocument();

    // Check if options (radio buttons) are rendered
    const radioInputs = getAllByRole('radio');
    expect(radioInputs.length).toBe(4); // 4 options total (including correct answer)
  });

  it('handles selecting an option and clicking Next Question', () => {
    const handleFinishGameMock = jest.fn();
    const { getByText, getAllByRole } = render(
      <MainGame
        numCorrect={0}
        numQuestions={2}
        questions={mockQuestions}
        setNumCorrect={jest.fn()}
        handleFinishGame={handleFinishGameMock}
      />
    );

    // Select an option (simulate user interaction)
    const radioInputs = getAllByRole('radio');
    fireEvent.click(radioInputs[0]); // Select the first option

    // Click the "Next Question" button
    const nextQuestionButton = getByText('Next Question');
    fireEvent.click(nextQuestionButton);

    // Check if handleNextQuestion function works correctly
    expect(handleFinishGameMock).not.toHaveBeenCalled(); // Should not finish game yet

    // Check if the second question is rendered
    expect(getByText('What is the capital of France?')).toBeInTheDocument();

    // Check if options for the second question are rendered
    const secondQuestionRadioInputs = getAllByRole('radio');
    expect(secondQuestionRadioInputs.length).toBe(4); // 4 options for the second question
  });

  it('handles finishing the game', () => {
    const handleFinishGameMock = jest.fn();
    const { getByText, getAllByRole } = render(
      <MainGame
        numCorrect={0}
        numQuestions={1} // Only one question remaining
        questions={mockQuestions.slice(0, 1)} // Only one question provided
        setNumCorrect={jest.fn()}
        handleFinishGame={handleFinishGameMock}
      />
    );

    // Select an option (simulate user interaction)
    const radioInputs = getAllByRole('radio');
    fireEvent.click(radioInputs[0]); // Select the correct answer

    // Click the "Next Question" button
    const nextQuestionButton = getByText('Next Question');
    fireEvent.click(nextQuestionButton);

    // Check if handleFinishGame function is called because it's the last question
    expect(handleFinishGameMock).toHaveBeenCalled();
  });
});
