// Rewards.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Rewards = () => {
  const questions = [
    {
      question: 'What is the first step in creating a budget?',
      options: ['Setting financial goals', 'Tracking expenses', 'Identifying income sources', 'None of the above'],
      answer: 'Setting financial goals'
    },
    {
      question: 'What percentage of your income should be allocated to savings according to the 50/30/20 rule?',
      options: ['20%', '30%', '50%', '10%'],
      answer: '20%'
    },
    {
      question: 'What is the purpose of an emergency fund?',
      options: ['To cover unexpected expenses', 'To invest in the stock market', 'To buy luxury items', 'None of the above'],
      answer: 'To cover unexpected expenses'
    },
    {
      question: 'What is the difference between a debit card and a credit card?',
      options: ['Debit cards require a PIN, credit cards do not', 'Debit cards are linked to a checking account, credit cards are not', 'Debit cards have a credit limit, credit cards do not', 'None of the above'],
      answer: 'Debit cards are linked to a checking account, credit cards are not'
    },
    {
      question: 'What is compound interest?',
      options: ['Interest paid on the principal amount only', 'Interest calculated on the sum of the principal and accrued interest', 'Interest paid at regular intervals', 'None of the above'],
      answer: 'Interest calculated on the sum of the principal and accrued interest'
    }
  ];

  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [lastAttemptDate, setLastAttemptDate] = useState(null);

  useEffect(() => {
    const lastAttempt = localStorage.getItem('lastAttemptDate');
    if (lastAttempt) {
      setLastAttemptDate(new Date(lastAttempt));
    }
  }, []);

  const handleAnswerClick = (index, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    if (lastAttemptDate && isSameDay(new Date(), lastAttemptDate)) {
      alert('You have already attempted the quiz today. Please try again tomorrow.');
      return;
    }

    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        newScore++;
      }
    }
    const newEarnedPoints = newScore * 100; // Each correct answer = 100 points
    setScore(newScore);
    setEarnedPoints(newEarnedPoints);
    setShowResult(true);

    localStorage.setItem('lastAttemptDate', new Date().toISOString());
  };

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const correctAnswers = questions.map((q) => q.answer);

  const giftCardExamples = [
    { name: 'Visa $10', points: 10000 },
    { name: 'Amazon $10', points: 15000 },
    { name: 'Best Buy $10', points: 12000 },
  ];

  return (
    <div>
      <h2>Rewards</h2>
      {!showResult ? (
        <div>
          <p>Test your financial knowledge with this quiz!</p>
          <ol>
            {questions.map((q, index) => (
              <li key={index}>
                <p>{q.question}</p>
                <div>
                  {q.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerClick(index, option)}
                      style={{
                        margin: '5px',
                        outline: 'none',
                        border: '1px solid #ccc',
                        padding: '5px 10px',
                        backgroundColor: answers[index] === option ? '#284a6e' : 'transparent', // Highlight selected option
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      ) : (
        <div>
          <h3>Quiz Result</h3>
          <p>You scored {score} out of {questions.length}!</p>
          <p>You earned {earnedPoints} points!</p>
          <p>Keep earning points every day! Limit 1 Quiz per day!</p>
          <h3>Gift Cards to Redeem:</h3>
          <ul>
            {giftCardExamples.map((giftCard, index) => (
              <li key={index}>
                {giftCard.name}: {giftCard.points} points
              </li>
            ))}
          </ul>
          <h3>Correct Answers:</h3>
          <ol>
            {questions.map((q, index) => (
              <li key={index}>
                {q.question} - <strong>{correctAnswers[index]}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Rewards;
