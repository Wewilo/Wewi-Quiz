let questionContainer = document.getElementById("question-container")
let correctAnswers = document.getElementById("correct-answers");
let wrongAnswers = document.getElementById("wrong-answers");
let leftQuestion = document.getElementById("question-left");
let questionParagraph = document.getElementById("question");
let labels = document.getElementsByTagName("label")
let btn = document.getElementById("next-question");



let i = 0;
let correctAns = 0;
let wrongAns = 0;

let element = document.querySelectorAll("input[name=flexRadioDefault]")

btn.addEventListener("click",()=>{
        if(i<10){  
            checkAnswer()
            gameStart();
        }
        else{
            checkAnswer();
            questionContainer.innerHTML = " ";
            showResult();
        }
    
})



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

async function getQuestion(){
    const question = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const response = await question.json();
    return response.results
}


async function gameStart(){
    let question = await getQuestion();

    window.correct_answer = question[0].correct_answer;
    const incorrect_answers = question[0].incorrect_answers;

    const answers = [window.correct_answer,...incorrect_answers]

    shuffle(answers)

    leftQuestion.innerHTML = `Question ${i+1}`;
    questionParagraph.innerHTML = question[0].question;
    
    for (let i = 0; i < labels.length; i++) {
        labels[i].innerHTML = answers[i]
    }

    i++;
}

function checkAnswer(){
    let answerId = document.querySelector('input[name="flexRadioDefault"]:checked').id;
    let selector = 'label[for=' + answerId + ']';
    let label = document.querySelector(selector);
    let selectedAnswer = label.textContent;

    if(selectedAnswer == window.correct_answer){
        correctAns++;
        correctAnswers.textContent = correctAns;
    }
    else{
        wrongAns++;
        wrongAnswers.textContent = wrongAns;
    }
}

function showResult(){
    
    questionContainer.innerHTML = `
    
    <div class="d-flex justify-content-between flex-wrap" id="result">
    <div>
        <i class="bi bi-check-circle text-success fs-1"></i>
        <span id="correct-answers">${correctAns}</span>
    </div>

    <div class="float-end">
        <i class="bi bi-x-circle-fill text-danger fs-1"></i>
        <span id="wrong-answers">${wrongAns}</span>
    </div>
</div>
<div class="flex-grow-1 text-center">
        <h2>Whatever the result :) Congratulations.</h2>
    </div>

    <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
    </div>


`
}


gameStart();