const Question_Answer = [
    {
        Question: "If you type the following code in the console window, what result will you get?                 (3 > 2 > 1 === false)",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "Null", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        Question: "What are you JavaScript is a ___ -side programming language.",
        answers: [
            { text: "Client", correct: false },
            { text: "Server", correct: false },
            { text: " Both", correct: true },
            { text: "None", correct: false },
        ]
    },
    {
        Question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        answers: [
            { text: " alert(“Hello DataFlair!”);", correct: true },
            { text: "msgAlert(“Hello DataFlair!”);", correct: false },
            { text: "alert(Hello DataFlair!);", correct: false },
            { text: "alertBox(“Hello DataFlair!”);", correct: false },
        ]
    },
    {
        Question: "How do you find the minimum of x and y using JavaScript?",
        answers: [
            { text: " min(xy);", correct: false },
            { text: " Math.min(xy)", correct: false },
            { text: "Math.min(x,y)", correct: true },
            { text: " min(x,y);", correct: false },
        ]
    },
    {
        Question: "If the value of x is 40, then what is the output of the following program?(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
        answers: [
            { text: "  None of the above", correct: false },
            { text: "  Not divisible by 10", correct: false },
            { text: " Divisible by 10", correct: true },
            { text: " ReferenceError", correct: false },
        ]
    },
];

const AskQuestion = document.getElementById("question");
const AnswerButton = document.getElementById("Answer_btn");
const Nextbutton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    Nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = Question_Answer[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    AskQuestion.innerHTML = questionNo + ". " + currentQuestion.Question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        AnswerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer);

    });
}

function resetState() {
    Nextbutton.style.display = "none";
    while (AnswerButton.firstChild) {
        AnswerButton.removeChild(AnswerButton.firstChild);
    }
}


function SelectAnswer(e) {
    const SelectBtn = e.target;
    const isCorrect = SelectBtn.dataset.correct === "true";
    if (isCorrect) {
        SelectBtn.classList.add("correct");
        SelectBtn.style.background = "#9aeabc";
        score++;
    }
    else {
        SelectBtn.classList.add("Incorrect");
        SelectBtn.style.background = "#ff9393";
    }

    Array.from(AnswerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            button.style.background = "#9aeabc";
        }
        button.disabled = true;
    });

    Nextbutton.style.display = "block";
}

function showScore() {
    resetState();
    AskQuestion.innerHTML = `You scored ${score} out of ${Question_Answer.length}!`;
    Nextbutton.innerHTML = "Play Again";
    Nextbutton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Question_Answer.length) {
        showQuestion();
    } else {
        showScore();
    }
}

Nextbutton.addEventListener("click", () => {
    if (currentQuestionIndex < Question_Answer.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();