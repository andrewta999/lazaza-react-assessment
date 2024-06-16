import { render, fireEvent } from '@testing-library/react';
import FinishGame from '../src/components/FinishGame';
import '@testing-library/jest-dom';

describe('FinishGame component', () => {
  it('renders correctly with props', () => {
    const { getByText } = render(
      <FinishGame
        numCorrect={5}
        numQuestions="10"
        resetGame={jest.fn()}
      />
    );

    // Check if "Your Score" text is rendered
    expect(getByText('Your Score')).toBeInTheDocument();

    // Check if correct score is displayed
    expect(getByText('5/10')).toBeInTheDocument();

    // Check if "Start A New Game" button is rendered
    expect(getByText('Start A New Game')).toBeInTheDocument();
  });

  it('calls resetGame function on button click', () => {
    const resetGameMock = jest.fn();
    const { getByText } = render(
      <FinishGame
        numCorrect={5}
        numQuestions="10"
        resetGame={resetGameMock}
      />
    );

    // Click the "Start A New Game" button
    const newGameButton = getByText('Start A New Game');
    fireEvent.click(newGameButton);

    // Check if resetGame function is called
    expect(resetGameMock).toHaveBeenCalled();
  });
});
