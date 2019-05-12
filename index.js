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
    ans2: "1986",
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

const bonusQuestion={
  ans1: 0,
  ans2: 0,
  ans3: 0,
  ans4: 0
}

const ANSWER = [
  "Inky, Blinky, Pinky and Sue",
  "1986",
  "Samus, Female",
  "Tetrominoes",
  "Reptile",
  "2",
  "Princess Peach",
  "up, up, down, down, left, right, left, right, B, A",
];

let questionNum = 0;
let correctAns = 0;
const totalQuestions = 8;
let hiddenContent = [];
function generateQuestion(){
  const currentQ = questionSet[questionNum];

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
  //console.log("generate next question");
  $(".container").html(generateQuestion());
  questionNum++;
}

function handleSubmitButton(){
  console.log("renderQuiz ran");
  $(".container").on('click', '#js-submit', function(event){
    //console.log("hit submit");
    event.preventDefault();
    
    const selectAns = $('input:checked').siblings('span');
    //console.log("checking");
    checkAnswer(selectAns)? correctAnswer() : wrongAnswer();
    //console.log("finish checking");
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
  if (correctAns < 4 ){
    return `
    <section class="final-page">
      <h2>Wo Ho Ho!! It is my great pleasure to have an such young audience!</br> And your final score is</h2>
      <span class="final-scores">${correctAns}</span>
      <button class="js-restart">Restart</button>
    </section>`;
  } else if (correctAns < totalQuestions){
    return `
    <section class="final-page">
      <h2>Congratulation!! You almost the king of The 80s </br> 
      Your final score is</h2>
      <span class="final-scores">${correctAns}</span>
      <button class="js-restart">Restart</button>
    </section>`;
  } else if (!hiddenWork()){
    return `
    <section class="final-page">
      <h2>Awesome!! Your have all the question right!! </br>
      But you still miss something, take a look at the last question! </h2>
      <span class="final-scores">${correctAns}</span>
      <button class="js-restart">Restart</button>
    </section>`;
  } else {
  return `
    <section class="feedback">
      <h2>Incredible! You find the hidden content!</br>
      Perparing to answer the most difficult question in the world!</h2>
      <button class="js-bonus">Next</button>
    </section>`;
  }
}

function handleBonusQuestion(){
  console.log("handleBonusQuestion ran");
  $(".container").on('click', '.js-bonus', function(event){
    event.preventDefault();
    $(".container").html(generateBonus());
  });

  $(".container").on('click','.js-submit-bonus', function(event){
    event.preventDefault();
    const selectAns = $('input:checked').siblings('span');
    console
    updateBonus(selectAns.text());
    $(".container").html(checkBonus());
  });
}

function updateBonus(ans){
  if (ans === "Tom Cruise"){
    bonusQuestion.ans1++;
  } else if (ans === "Dwayne Johnson"){
    bonusQuestion.ans2++;
  } else if (ans === "Leonardo Dicaprio"){
    bonusQuestion.ans3++;
  } else {
    bonusQuestion.ans4++;
  }
}

function checkBonus(){
  if (bonusQuestion.ans4 === 1){
    return `
      <section class="final-page">
        <h2>Liar! Where did you find my picture!!!</br> 
        But I will accept this answer (*^__^*)</h2>
        <button class="js-restart">Restart</button>
      </section>`;
  } else if(bonusQuestion.ans1 === 3){
      return `
      <section class="final-page">
        <h2>Well you win!!!</br> 
        The most handsome man is Tom Cruise</h2>
        <button class="js-restart">Restart</button>
      </section>`;
  } else if(bonusQuestion.ans2 === 3){
      return `
      <section class="final-page">
        <h2>Well you win!!!</br> 
        The most handsome man is Dwayne Johnson</h2>
        <button class="js-restart">Restart</button>
      </section>`;
  } else if(bonusQuestion.ans2 === 3){
      return `
      <section class="final-page">
        <h2>Well you win!!!</br> 
        The most handsome man is Leonardo Dicaprio</h2>
        <button class="js-restart">Restart</button>
      </section>`;
  } else{
    return `
      <section class="feedback">
        <h2 class="failure">Really? You might want to reconsider this</h2>
        <button class="js-bonus">Next</button>
    `;
  }
}

function generateBonus(){
  return`
  <section class="Q-page">
    <h2>Who is the most handsome man?</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked autofocus></input>
          <span>Tom Cruise</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>Dwayne Johnson</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>Leonardo Dicaprio</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>Bin Zheng</span>
        </label>
      </fieldset>  
      <button class="js-submit-bonus">Submit</button>

    </form>
    </section>
  `;
}

function handleRestartButton(){
  console.log("handleRestartButton ran");
  $(".container").on('click', '.js-restart',function(event){
    event.preventDefault();
    questionNum = 0;
    correctAns = 0;
    hiddenContent =[];
    bonusQuestion.ans1 = 0;
    bonusQuestion.ans2 = 0;
    bonusQuestion.ans3 = 0;
    bonusQuestion.ans4 = 0;
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

function handleHiddenContent(){
  console.log("handleHiddenContent ran");
  $("html").keydown(function(event){
      if(questionNum === 8 & correctAns != 8){
        
        hiddenContent.push(event.which);
        console.log(hiddenContent);
      }
  });
}

function hiddenWork(){
  const goal = [38,38,40,40,37,39,37,39,66,65];
  if(hiddenContent.length != goal.length){
    return false;
  }
  for (let i = 0; i<hiddenContent.length; i++){
    if (hiddenContent[i] != goal[i]){
      return false;
    }
  }
  return true;
}


function handleQuiz(){
  renderQuiz();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
  handleHiddenContent();
  handleBonusQuestion();
}

$(handleQuiz);