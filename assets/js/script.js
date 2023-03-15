
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
startButton.addEventListener("click", startQuiz);

document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.getElementById("start-btn");
    if (startButton) {
      startButton.addEventListener("click", startQuiz);
    }

  });
  
// start button 
function startQuiz(){
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    startScreenEl.classList.add("hide");
    questionContainer.classList.remove("hide");
    setNextQuestion();
    startTimer();
}

function setNextQuestion(){
    resetState();
    // display question and answer 
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
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

  function resetState() {
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
  }

  function selectAnswer(e) {
    var selectedButton = e.target;
    var isCorrect = selectedButton.dataset.correct;

setStatusClass(document.body, isCorrect);
    Array.from(answerButtonsEl.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });

if (isCorrect) {
        score += 10;
      } else {
        time -= 15;
        if (time < 0) {
          time = 0;
        }
        timerEl.textContent = time;
      }
    
currentQuestionIndex++;
      if (currentQuestionIndex < shuffledQuestions.length) {
        setTimeout(()=> {
          setNextQuestion();
       }
       ,500);
        
      } else {
        endQuiz();
      }
    }

function setStatusClass(element, isCorrect) {
        clearStatusClass(element);
        if (isCorrect) {
          element.classList.add("correct");
        } else {
          element.classList.add("incorrect");
        }
      }

function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("incorrect");
      }

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

function endQuiz() {
      
        clearInterval(timerInterval);
        finalScoreEl.textContent = score;
        questionContainer.classList.add("hide");
        initialsEl.classList.remove("hide");
      }

submitButton.addEventListener("click", saveScore);


function saveScore() {
  console.log("test")
        var highScores = JSON.parse(localStorage.getItem("finalScoreEl"));
          initials = initials.value;
        var newScore = initials + ": " + score
       localStorage.setItem("highScores", JSON.stringify(newScore));
      }
      

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