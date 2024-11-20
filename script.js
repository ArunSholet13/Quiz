const questions=[
    {
        question: "What is the most abundant element in the universe?",
        answers:[
            {text: "Oxygen", correct: false},
            {text: "Hydrogen", correct: true},
            {text: "Carbon", correct: false},
            {text: "Nitrogen", correct: false}
        ]
    },
    {
        question: 'Which state is known as the "LAND OF FIVE RIVERS"',
        answers:[
            {text: "Punjab", correct: true},
            {text: "Gujarat", correct: false},
            {text: "Uttarakhand", correct: false},
            {text: "Kerala", correct: false}
        ]
    },
    {
        question: "Vishnu Deo Sai is the new Chief Minister of which Indian state?",
        answers:[
            {text: "Madhya Pradesh", correct: false},
            {text: "Rajasthan", correct: false},
            {text: "Chhattisgarh", correct: true},
            {text: "Mizoram", correct: false}
        ] 
    },
    {
        question: "Which country is known as the “Land of the Rising Sun”?",
        answers:[
            {text: "India", correct: false},
            {text: "Russia", correct: false},
            {text: "Japan", correct: true},
            {text: "New Zealand", correct: false}
        ] 
    },
    {
        question: "In which year were the first modern Olympics held?",
        answers:[
            {text: "1952", correct: false},
            {text: "1900", correct: false},
            {text: "1920", correct: false},
            {text: "1896", correct: true}
        ] 
    },
    {
        question: "What is the capital of Egypt?",
        answers: [
            {text: "Alexandria", correct: false},
            {text: "Cairo", correct: true},
            {text: "Faiyum", correct: false},
            {text: "Giza", correct: false}
        ]
    },
    {
        question: "When is World Hindi Day celebrated?",
        answers: [
            {text: "January 10", correct: true},
            {text: "March 8", correct: false},
            {text: "April 14", correct: false},
            {text: "July 22", correct: false}
        ]
    },
    {
        question: "What year did World War II end?",
        answers: [
            {text: "1944", correct: false},
            {text: "1945", correct: true},
            {text: "1946", correct: false},
            {text: "1947", correct: false}
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Brisbane", correct: false}
        ]
    },
    {
        question: "Which article of the Indian Constitution guarantees the right to equality?",
        answers: [
            {text: "Article 19", correct: false},
            {text: "Article 21", correct: false},
            {text: "Article 32", correct: false},
            {text: "Article 14", correct: true}
        ]
    }
]
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again!"
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();