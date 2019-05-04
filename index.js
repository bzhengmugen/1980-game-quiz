'use strict';

function renderQuiz(){
  console.log("handleQuiz ran");
}

function handleNextButton(){
  console.log("handleNextButton ran");
}

function handleRestartButton(){
  console.log("handleRestartButton ran");
}

function handleStartButton(){
  console.log("handleStartButton ran");
}

function handleQuiz(){
  renderQuiz();
  handleStartButton();
  handleNextButton();
  handleRestartButton();
}

$(handleQuiz);