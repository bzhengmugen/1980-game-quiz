'use strict';

const questionSet = [
  {
    number: 1 ,
    question: "What are the names of the ghosts in Pac Man?",
    ans1: "Inky, Blinky, Pinky and Sue",
    ans2: "Bob, Anne, Jeff and Mike",
    ans3: "they don't have names",
    ans4: "One, Two, Three, Four"
  },

  {
    number: 2,
    question: "What year did the NES debut in the US?",
    ans1: "1990",
    ans2: "1985",
    ans3: "1987",
    ans4: "1980"
  },

  {
    number: 3,
    question: "What is the playable characer's name in Metroid and what gender is it?",
    ans1: "Seamus, Male",
    ans2: "Samus, Female",
    ans3: "Sam, Male",
    ans4: "Samantha, Female"
  },

  {
    number: 4,
    question: "What are the shapes in Tertris called?",
    ans1: "Tetrominoes",
    ans2: "Shapes",
    ans3: "Letters",
    ans4: "Blocks"
  },

  {
    number: 5,
    question: "Who was the hidden character in Mortal Kombat?",
    ans1: "Reptile",
    ans2: "Raiden",
    ans3: "Johnny Cage",
    ans4: "Quark"
  },
  {
    number: 6,
    question: "How many players could you have in Double Dragon 3?",
    ans1: "1",
    ans2: "2",
    ans3: "3",
    ans4: "4"
  },
  {
    number: 7,
    question: "What was the name of the Princess in Super Mario Brothers?",
    ans1: "Princess Cookie",
    ans2: "Princess Peach",
    ans3: "Princess Goomba",
    ans4: "Princess Toadstool"
  },

  {
    number: 8,
    question: "What is The Konami Code?",
    ans1: "up, down, up, down, left, right, left, right, B, A",
    ans2: "up, down, left, right, up, down, left, right, B, A",
    ans3: "up, up, left, left, down, down, right, right, B, A",
    ans4: "up, up, down, down, left, right, left, right, B, A"
  },
  
];


const ANSWER = [
  "Inky, Blinky, Pinky and Sue",
  "1985",
  "Samus, Female",
  "Tetrominoes",
  "Reptile",
  "2",
  "Princess Peach",
  "up, down, up, down, left, right, left, right, B, A",
];

let questionNum = 0;
let correctAns = 0;
const totalQuestions = 8;
function generateQuestion(){
  const currentQ = questionSet[questionNum];
  console.log("generate question");
  return `
  <section class="Q-page">
    <h2>${currentQ.question} </h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked autofocus></input>
          <span>${currentQ.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${currentQ.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${currentQ.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${currentQ.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit">Submit</button>

    </form>
    
    <div class="currentStatus">
      <span class="current-status"> Questions: ${currentQ.number} / ${totalQuestions} </span>
      <span class="current-scores"> Scores: ${correctAns} / ${totalQuestions} </span>
    </div>
  </section>`;
}

function nextQuestion(){
  console.log("generate next question");
  $(".container").html(generateQuestion());
  questionNum++;
}

function handleSubmitButton(){
  console.log("renderQuiz ran");
  $(".container").on('click', '#js-submit', function(event){
    console.log("hit submit");
    event.preventDefault();
    
    const selectAns = $('input:checked').siblings('span');
    console.log("checking");
    checkAnswer(selectAns)? correctAnswer() : wrongAnswer();
    console.log("finish checking");
  });
}

function checkAnswer(answer){
  return (answer.text() == ANSWER[questionNum-1]);
}

function correctAnswer(){
  correctAns++;
  $(".container").html(generateCorrectResp());
}

function generateCorrectResp(){
  return `
  <section class="feedback">
    <h2 class="success">Congratulation, You are right!</h2>
    <button class="js-next">Next</button>
    <div class="currentStatus">
      <span class="current-status"> Questions: ${questionSet[questionNum -1].number} / ${totalQuestions} </span>
      <span class="current-scores"> Scores: ${correctAns} / ${totalQuestions} </span>
    </div>
  </section>
  `;
}

function wrongAnswer(){
  $(".container").html(generateWrongResp());
}

function generateWrongResp(){
  return`
  <section class="feedback">
    <h2 class="failure">Sorry, the correct answer is:${"\n"} ${ANSWER[questionNum-1]} </h2>
    <button class="js-next">Next</button>
    <div class="currentStatus">
      <span class="current-status"> Questions: ${questionSet[questionNum -1].number} / ${totalQuestions} </span>
      <span class="current-scores"> Scores: ${correctAns} / ${totalQuestions} </span>
    </div>
  </section>`;
}

function handleNextButton(){
  console.log("handleNextButton ran");
  $(".container").on('click', '.js-next', function(event){
    event.preventDefault();
    (questionNum < totalQuestions)? nextQuestion() : $(".container").html(finalStatus());
  });
}

function finalStatus(){
  return `
  <section class="final-page">
    <h2>Congratulation!! Your final scores is ${correctAns}</h2>
    <button class="js-restart">Restart</button>
  </section>`;
}

function handleRestartButton(){
  console.log("handleRestartButton ran");
  $(".container").on('click', '.js-restart',function(event){
    event.preventDefault();
    questionNum = 0;
    correctAns = 0;
    nextQuestion();
  });

}

function renderQuiz(){
  console.log("handleStartButton ran");
  $("#js-start").click(function(event){
    console.log("restarted");
    nextQuestion();
  });
}

function handleQuiz(){
  renderQuiz();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

$(handleQuiz);