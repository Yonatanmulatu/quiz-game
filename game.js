const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainerElement = document.querySelector('#question-container');
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons');
const containerElement = document.querySelector('.container');
const startVideo = document.querySelector('#logo');
const correctAnswer = document.querySelector('#correctAnswer');
const incorrectAnswer = document.querySelector('#incorrectAnswer');
const progress = document.querySelector('#progress');
const scoreDiv = document.querySelector('#scoreContainer');
const counter = document.querySelector('#counter');
const timeGauge = document.querySelector('#timeGauge');

let currentQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame) 
nextButton.addEventListener('click', () => {
  runningQuestionIndex++
  setNextQuestion();
  renderCounter();
})

function renderProgress(lastQuestion){
  for(let currentQuestionIndex = 0; currentQuestionIndex <= lastQuestion; currentQuestionIndex++){
      progress.innerHTML += "<div class='prog' id=yoni"+ currentQuestionIndex +"></div>";
  }
}

let runningQuestionIndex = 0;
function answerIsCorrect() {
  document.querySelector(`#yoni${runningQuestionIndex}`).style.backgroundColor = 'green';
}

function answerIsWrong() {
  document.querySelector('#yoni'+runningQuestionIndex).style.backgroundColor = 'red';
}

function renderCounter(){
  if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
  } else{
     count = 0;
     answerIsWrong();
     if(runningQuestionIndex < lastQuestion){
        runningQuestionIndex++;
        renderQuestion();
        scoreDiv.add('hide');
    } else{
        clearInterval(TIMER);
        scoreDiv.style.display = "block";;
    }
  }
}

  function scoreRender(){
    scoreDiv.style.display = "block";
    const lastQuestion = shuffledQuestions.length- 1;
    const scorePerCent = Math.round(100 * score/lastQuestion);
    score = 0;
    let img = (scorePerCent >= 80) ? "5.png" :
            (scorePerCent >= 60) ? "4.png" :
            (scorePerCent >= 40) ? "3.png" :
            (scorePerCent >= 20) ? "2.png" :
            "1.png";
  
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
  }

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  const lastQuestion = shuffledQuestions.length- 1;
  runningQuestionIndex = 0;
  containerElement.classList.remove('hide');
  startVideo.classList.add('hide'); 
  progress.innerHTML = '';
  renderProgress(lastQuestion);
  scoreDiv.style.display = 'none';
  let TIMER;
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter,1000); 
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[runningQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
  const button = document.createElement('button')
  button.innerText = answer.text
  button.classList.add('btn')
  if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
} 

function selectAnswer(e) {
const selectedButton = e.target
const correct = selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  audioCorrecting(selectedButton, correct);

  if (shuffledQuestions.length > runningQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    scoreRender()
    containerElement.classList.add('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function audioCorrecting(selectedButton, correct) {
  if(correct) {
    document.querySelector('#correctAnswer').play()
    answerIsCorrect()
    score++
  } else {
    document.querySelector('#incorrectAnswer').play()
    answerIsWrong()
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'All people with diabetes are overweight.',
    answers: [
      {
        text: 'True',
        correct: false
      },
      {
        text: 'False',
        correct: true
      }
    ]
  },
  {
    question: 'In Type2 Diabetes...',
    answers: [
      {
        text: 'cells become resistant to insulin, pills are given to increase the sensitivity',
        correct: true
      },
      {
        text: 'insulin is always the first intervention',
        correct: false
      },
      {
        text: 'patients are often underweight and undernourished',
        correct: false
      },
      {  
        text: 'diagnosis is usually before adolescence',
        correct: false
      }
    ]
  },
  {
    question: 'The most common type of diabetes is',
    answers: [
      {
        text: 'Type 1 diabetes',
        correct: false
      },
      {
        text: 'Juvenile diabetes',
        correct: false
      },
      {
        text: 'Type 2 diabetes',
        correct: true
      }
      ]
    },
  {
    question: 'What is the function of insulin',
    answers: [
        {
          text: 'turn glucose into energy',
          correct: false
        },
        {
          text: 'help glucose enter the cells of the body',
          correct: true
        },
        {
          text: 'diagnose diabetes',
          correct: false
        },
        {
          text: 'all choices',
          correct: false
        }
      ]
    },
  {
    question: 'What are the 2 main problems associated with all diabetes patients',
    answers: [
          {
            text: 'high and low blood sugar',
            correct: true
          },
          {
            text: 'type 1 and 2',
            correct: false
          },
          {
            text: 'mood swings anf increased hunger',
            correct: false
          }
      ]
    },
  {
    question: 'No insulin is produced',
    answers: [
            {
              text: 'Type 1',
              correct: true
            },
            {
              text: 'type 2',
              correct: false
            }
      ]
    },
  {
    question: 'Type of diabetes characterised by insulin resistance',
    answers: [
            {
              text: 'Type 2',
              correct: true
            },
            {
              text: 'type 1',
              correct: false
            }
      ]
    },
  {
    question: 'What are the (2) main forms of diabetes',
    answers: [
              {
                text: 'NIDDM & IDDM',
                correct: false
              },
              {
                text: 'HHNKS & hypoglycemia',
                correct: false
              },
              {
                text: 'Hyperglycemia',
                correct: false
              },
              {
                text: 'Type 1 and Type 2',
                correct: true
              }
      ]
     },
  {
    question: 'Insulin',
    answers: [
                {
                  text: 'blocks the sugar in your bloodstream from doing what it is supposed to do',
                  correct: false
                },
                {
                  text: 'lowers your blood sugar levels',
                  correct: true
                },
                {
                  text: 'gives you dibaetes',
                  correct: false     
                }
       ]
    },
  {
    question: `High blood sugar level in the mother does not affect the fetus' sugar level`,
    answers: [
                  {
                    text: 'False',
                    correct: true
                  },
                  {
                    text: 'True',
                    correct: false
                  }
      ]
    }
]