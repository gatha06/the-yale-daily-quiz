import { useState } from 'react';

function App() {
  // 1. Our database of Gilmore Girls trivia questions!
  const questions = [
    {
      hint: "What is the name of the secret, elite Yale society that Logan Huntzberger invites Rory to join?",
      options: ["The Pujo Society", "The Quill and Dagger", "The Life and Death Brigade", "The Skull and Bones"],
      answer: "The Life and Death Brigade"
    },
    {
      hint: "What is Luke Danes' ultimate, number-one rule posted clearly on the sign in his diner?",
      options: ["No Cell Phones", "No Outside Food", "No Loud Talking", "No Loitering"],
      answer: "No Cell Phones"
    },
    {
      hint: "Where does Rory accidentally fall asleep with Dean, causing a massive, town-wide panic for Lorelai and Emily?",
      options: ["The Chilton Library", "Miss Patty's Dance Studio", "The Dragonfly Inn", "Luke's Diner Garage"],
      answer: "Miss Patty's Dance Studio"
    },
    {
      hint: "What is the exact name of the fictional town in Connecticut where Lorelai and Rory live?",
      options: ["Woodbury", "Hartford", "Beacon Falls", "Stars Hollow"],
      answer: "Stars Hollow"
    }
  ];

  // 2. React States to keep track of the game's changing data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // 3. This runs whenever a user clicks an option button
  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) return; // Prevents clicking multiple times

    setSelectedAnswer(option);
    
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // 4. This runs when the user clicks "Next Question"
  const handleNextClick = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  // 5. This resets the game back to the beginning
  const handleRestartClick = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuizComplete(false);
  };

  // 6. Basic Inline Styles to keep it looking dark and modern without a CSS file
  const containerStyle = {
    backgroundColor: '#3B1F0F',
    color: '#F7E3C4',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: '#5D3823',
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 6px 24px rgba(0,0,0,0.25)'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#A47240',
    color: '#fff',
    border: '1px solid #8E5C2D',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s'
  };

  const actionButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#D2893B',
    border: 'none',
    fontWeight: 'bold',
    marginTop: '20px'
  };

  // 7. What actually gets rendered on the screen
  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#f87171', marginBottom: '30px' }}>🍂 The Yale Daily Quiz</h1>

      {quizComplete ? (
        <div style={cardStyle}>
          <h2>Quiz Complete! 🏁</h2>
          <p style={{ fontSize: '20px', margin: '20px 0' }}>
            Your Score: <strong>{score} / {questions.length}</strong>
          </p>
          <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '20px' }}>
            {score === questions.length ? "Oy with the poodles already! Perfect score!" : "Time for a coffee refill at Luke's!"}
          </p>
          <button style={actionButtonStyle} onClick={handleRestartClick}>Play Again</button>
        </div>
      ) : (
        <div style={cardStyle}>
          <p style={{ color: '#888', fontSize: '14px' }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          
          <h3 style={{ margin: '20px 0', lineHeight: '1.5', color: '#fca5a5' }}>
            "{questions[currentQuestionIndex].hint}"
          </h3>

          <div>
            {questions[currentQuestionIndex].options.map((option, index) => {
              // Highlight selected option color dynamically
              let currentBtnStyle = { ...buttonStyle };
              if (selectedAnswer === option) {
                currentBtnStyle.backgroundColor = option === questions[currentQuestionIndex].answer ? '#2e7d32' : '#c62828';
              }

              return (
                <button 
                  key={index} 
                  style={currentBtnStyle} 
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div>
              <p style={{ color: isCorrect ? '#4caf50' : '#f44336', fontWeight: 'bold', marginTop: '15px' }}>
                {isCorrect
                  ? "✨ In Omnia Paratus! Correct!"
                  : `❌ Wrong! The correct answer was: ${questions[currentQuestionIndex].answer}`}
              </p>
              <button style={actionButtonStyle} onClick={handleNextClick}>
                {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
