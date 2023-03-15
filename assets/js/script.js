// creating variables 
var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var timerEl = document.getElementById("timer");
var initialsEl = document.getElementById("game-over-screen");
var initials = document.getElementById("initials")
var submitButton = document.getElementById("submit-score-btn");
var finalScoreEl = document.getElementById("final-score");
var startScreenEl = document.getElementById("start-screen");
var shuffledQuestions, currentQuestionIndex;
var score = 0;
var time = 75;
var timerInterval;
var startButton = document.getElementById("start-btn");

// when button is clicked start quiz
startButton.addEventListener("click", startQuiz);

  
// start button 
function startQuiz(){
  // shuffles question when quiz starts
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    startScreenEl.classList.add("hide");
    questionContainer.classList.remove("hide");
    // start timer and next questions
    setNextQuestion();
    startTimer();
}

function setNextQuestion(){
  // resets the state to clear any previous right or wrong answers that has changed
    resetState();
    // display a shuffled question and answer 
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  // displays and question and answers
    questionEl.innerHTML = question.question;
    question.answers.forEach((answer) => {
      var button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsEl.appendChild(button);
    });
  }

  // resets the buttons
  function resetState() {
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
  }

  // targets the user input to see what the user selects
  function selectAnswer(e) {
    var selectedButton = e.target;
    var isCorrect = selectedButton.dataset.correct;

    // if the user is correct git the button a correct class
setStatusClass(document.body, isCorrect);
    Array.from(answerButtonsEl.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });

    // if user answers correctly user gets 10 points but if the user answer wrongly timer is reduce by 15 sec
    // and if the timer runs out end game 
if (isCorrect) {
        score += 10;
      } else {
        time -= 15;
        if (time < 0) {
          time = 0;
          endQuiz();
        }
        timerEl.textContent = time;
      }

      // this shuffles the question and ends if the all question is displayed
currentQuestionIndex++;
      if (currentQuestionIndex < shuffledQuestions.length) {
        // this delays the next question after the user answers
        setTimeout(()=> {
          setNextQuestion();
       }
       ,500);
        
      } else {
        endQuiz();
      }
    }

    // if user answer correct add a correct class, if user answers wrongly add a wrong class
    // this would flag green if correct and red if wrong.
function setStatusClass(element, isCorrect) {
        clearStatusClass(element);
        if (isCorrect) {
          element.classList.add("correct");
        } else {
          element.classList.add("incorrect");
        }
      }

      // resets button color
function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("incorrect");
      }
      // this sets the timer to count down 
function startTimer() {
        timerInterval = setInterval(() => {
          time--;
          timerEl.textContent = time;
          if (time <= 0) {
            endQuiz();
            time = "";
          }
        }, 1000);
      }

      // when quiz ends display score, stops timer, display a bar to add initials
function endQuiz() {
      
        clearInterval(timerInterval);
        finalScoreEl.textContent = score;
        questionContainer.classList.add("hide");
        initialsEl.classList.remove("hide");
      }
// score is saved when button is click
submitButton.addEventListener("click", saveScore);

// stores the score and initials into the local storage
function saveScore() {
        var highScores = JSON.parse(localStorage.getItem("finalScoreEl"));
          initials = initials.value;
        var newScore = initials + ": " + score
       localStorage.setItem("highScores", JSON.stringify(newScore));
      }
      
// question and answers
var questions = [
        {
          question: "What are not JavaScript Data Types",
          answers: [
            { text: "number", correct: false },
            { text: "String", correct: false },
            { text: "boolean", correct: false },
            { text: "special charactors", correct: true }
          ]
        },
        {
          question: "What is the correct way to link id in CSS?",
          answers: [
            { text: "#", correct: true },
            { text: "%", correct: false },
            { text: "^", correct: false },
            { text: ".", correct: false }
          ]
        },
        {
            question: "What is the correct way to link class in CSS?",
            answers: [
                { text: "#", correct: false },
                { text: "%", correct: false },
                { text: "^", correct: false },
                { text: ".", correct: true }
            ]
          },
          {
            question: "how to create a button on html?",
            answers: [
              { text: "btn", correct: false },
              { text: "div" , correct: false },
              { text: "image", correct: false },
              { text: "button", correct: true }
            ]
          },
          {
            question: "What are not JavaScript Data Types",
            answers: [
              { text: "number", correct: false },
              { text: "String", correct: false },
              { text: "boolean", correct: false },
              { text: "special charactors", correct: true }
            ]
          },
      ];