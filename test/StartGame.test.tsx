import { render, fireEvent } from '@testing-library/react';
import StartGame from '../src/components/StartGame';
import { Category } from '../src/types';
import '@testing-library/jest-dom';

describe('StartGame component', () => {
  const mockCategories: Category[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];

  it('renders correctly with props', () => {
    const { getByText } = render(
      <StartGame
        categories={mockCategories}
        numQuestions="10"
        setCategory={jest.fn()}
        setNumQuestions={jest.fn()}
        setDifficulty={jest.fn()}
        startGame={jest.fn()}
      />
    );

    // Check if "How to Play" text is rendered
    expect(getByText('How to Play')).toBeInTheDocument();

    // Check if inputs and selects are rendered
    expect(getByText('Number of Questions:')).toBeInTheDocument();
    expect(getByText('Select Category:')).toBeInTheDocument();
    expect(getByText('Select Difficulty:')).toBeInTheDocument();
    
    // Check if start button is rendered
    expect(getByText('Start Playing')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const setNumQuestionsMock = jest.fn();
    const { getByLabelText } = render(
      <StartGame
        categories={mockCategories}
        numQuestions="10"
        setCategory={jest.fn()}
        setNumQuestions={setNumQuestionsMock}
        setDifficulty={jest.fn()}
        startGame={jest.fn()}
      />
    );

    const numQuestionsInput = getByLabelText('number of questions');
    fireEvent.change(numQuestionsInput, { target: { value: '15' } });

    expect(setNumQuestionsMock).toHaveBeenCalledWith('15');
  });

  it('calls startGame function on button click', () => {
    const startGameMock = jest.fn();
    const { getByText } = render(
      <StartGame
        categories={mockCategories}
        numQuestions="10"
        setCategory={jest.fn()}
        setNumQuestions={jest.fn()}
        setDifficulty={jest.fn()}
        startGame={startGameMock}
      />
    );

    const startButton = getByText('Start Playing');
    fireEvent.click(startButton);

    expect(startGameMock).toHaveBeenCalled();
  });
});
