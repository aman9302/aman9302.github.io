window.selectOption = function(selectedOption, correctAnswer, explanation, questionElement) {
    let resultMessage = selectedOption === correctAnswer ? "Correct! Well done!" : "Incorrect. Let's learn why.";
    let explanationMessage = selectedOption === correctAnswer ? "" : explanation;
    
    questionElement.querySelector('.result-display').innerText = resultMessage + " " + explanationMessage;

    setTimeout(() => {
        currentQuestionIndex++; 
        displayNextQuestion();  
    }, 3000); 
};

document.addEventListener('DOMContentLoaded', function() {
    const quizButton = document.querySelector('.quiz-button');
    const quizSection = document.querySelector('.quiz-section');
    const landingPageInfo = document.querySelector('.Landing-page-info');
    const lightBulb = document.querySelector('.light');
    const resultsSection = document.getElementById('resultsSection');
    let currentQuestionIndex = 0;  

    quizButton.addEventListener('click', function() {
        landingPageInfo.classList.add('fade-out');
        lightBulb.classList.add('move-up-out');

        setTimeout(() => {
            landingPageInfo.style.display = 'none';
            lightBulb.style.display = 'none';
            quizSection.classList.add('quiz-active'); 
            displayNextQuestion();
        }, 500); 

        if (!quizSection.classList.contains('quiz-active')) {
            displayQuiz(10); 
        } else {
            quizSection.innerHTML = ''; 
        }
    });

    let questions = [
        // {
        //     "question": "True or False: Only people over the age of 60 have brain tumors.",
        //     "options": ["True", "False"],
        //     "answer": "False",
        //     "explanation": "Brain tumors can happen to anyone, not just older people. Even kids and young adults can get them."
        // },
        // {
        //     "question": "Which symptom do people mistakenly believe to be universally present in all cases of brain tumors?",
        //     "options": ["Sudden loss of vision", "Memory loss", "Severe, persistent headaches", "All of the above"],
        //     "answer": "Severe, persistent headaches",
        //     "explanation": "Some people think that all brain tumors cause really bad headaches, but that's not true. Different tumors can cause different problems, like trouble seeing or remembering things."
        // },
        // {
        //     "question": "What does the term 'benign' imply about a brain tumor, which is a common misunderstanding?",
        //     "options": ["The tumor cannot cause any harm.", "The tumor will definitely turn malignant.", "The tumor is safe and doesn't need treatment.", "The tumor is non-cancerous, but can still be harmful depending on size and location."],
        //     "answer": "The tumor is non-cancerous, but can still be harmful depending on size and location.",
        //     "explanation": "Sometimes people think 'benign' means a tumor is totally safe, but even though it's not cancer, it can still cause problems depending on where it is and how big it gets."
        // },
        // {
        //     "question": "It's commonly believed that cell phones are a proven cause of brain tumors. What does the majority of current research suggest?",
        //     "options": ["Strongly proven to cause brain tumors", "Proven safe with no associated risk", "No definitive link has been established, but research continues.", "Only old cell phones were harmful."],
        //     "answer": "No definitive link has been established, but research continues.",
        //     "explanation": "Some people think that using cell phones can give you a brain tumor, but scientists are still figuring it out. Right now, they're not sure if there's a definite connection."
        // },
        // {
        //     "question": "Which symptom is often overlooked as being associated with brain tumors?",
        //     "options": ["Nausea", "Changes in hearing", "Fatigue", "Weight gain"],
        //     "answer": "Changes in hearing",
        //     "explanation": "Some people don't realize that trouble hearing can be a sign of a brain tumor. It's important to pay attention to all kinds of changes in your body."
        // },
        // {
        //     "question": "What percentage of brain tumors are malignant?",
        //     "options": ["Less than 10%", "About 33%", "More than 50%", "Nearly 75%"],
        //     "answer": "About 33%",
        //     "explanation": "About one-third of brain tumors are cancerous. That means they can spread to other parts of the body and need to be treated very carefully."
        // },
        // {
        //     "question": "Which statement about brain cancer survival rates is true and addresses a common misconception?",
        //     "options": ["Survival rates are the same for all types of brain tumors.", "Most brain tumors are always rapidly fatal.", "Survival can vary significantly depending on the type and stage of the tumor at diagnosis.", "Brain tumors are the least fatal type of cancer."],
        //     "answer": "Survival can vary significantly depending on the type and stage of the tumor at diagnosis",
        //     "explanation": "Not all brain tumors are the same, and survival rates can be different for each person. It depends on what kind of tumor you have and when it's found."
        // },
        // {
        //     "question": "True or False: If you have a primary brain tumor, it means it will definitely spread to other parts of your body.",
        //     "options": ["True", "False"],
        //     "answer": "False",
        //     "explanation": "Having a primary brain tumor doesn't mean it will spread to other parts of your body. Sometimes it stays in the brain, which is called 'primary'."
        // },
        // {
        //     "question": "What is a widespread misconception about the treatment of brain tumors?",
        //     "options": ["Surgery is the only treatment option.", "Treatment always results in complete cure.", "Non-invasive treatments are never an option.", "Radiation and chemotherapy can be effective, though often thought to be too risky for brain tumors."],
        //     "answer": "Radiation and chemotherapy can be effective, though often thought to be too risky for brain tumors.",
        //     "explanation": "Some people think that surgery is the only way to treat a brain tumor, but there are other options like radiation and chemotherapy. These treatments can be tough, but they can help get rid of the tumor."
        // },
        // {
        //     "question": "How do misconceptions affect public perception of brain tumor prognosis?",
        //     "options": ["They accurately reflect the realities of brain tumor treatment and outcomes.", "They often make the prognosis seem more uniformly dire or hopeful than it actually is.", "They have no effect on public perception.", "They lead to an overestimation of survival rates."],
        //     "answer": "They often make the prognosis seem more uniformly dire or hopeful than it actually is.",
        //     "explanation": "Sometimes people think that brain tumors are always really bad and there's no hope, or they think that everything will be fine. But the truth is, it's different for everyone and there's a lot of hope."
        // },
        // {
        //     "question": "What is a key factor in determining the treatment approach for a brain tumor?",
        //     "options": ["The patient's hair color", "The size and location of the tumor", "The patient's preference for treatment timing", "The cost of the treatment"],
        //     "answer": "The size and location of the tumor",
        //     "explanation": "When doctors decide how to treat a brain tumor, they look at where it is in the brain and how big it is. This helps them figure out the best way to get rid of it."
        // },
        // {
        //     "question": "True or False: New treatment methods are constantly being developed for brain tumors.",
        //     "options": ["True", "False"],
        //     "answer": "False",
        //     "explanation": "Doctors and scientists are always working hard to find new ways to treat brain tumors, but it takes time. Right now, there aren't new treatments coming out all the time."
        // },
        // {
        //     "question": "Which imaging technique has improved the diagnosis of brain tumors in recent years?",
        //     "options": ["CT scans", "PET scans", "Advanced MRI techniques", "Ultrasound"],
        //     "answer": "Advanced MRI techniques",
        //     "explanation": "Doctors have gotten better at finding brain tumors with special MRI scans. These scans show really detailed pictures of the brain and help doctors see what's going on inside."
        // },
        {
            "question": "What role does genetics play in the treatment of brain tumors?",
            "options": ["No role", "A significant role, as genetic analysis can guide personalized treatment plans", "Only determines the color of the medical equipment used", "Only affects the choice of hospital"],
            "answer": "A significant role, as genetic analysis can guide personalized treatment plans",
            "explanation": "Sometimes, the way a brain tumor grows can be affected by our genes, like the traits we inherit from our parents. Doctors can study these genes to figure out the best treatment for each person."
        },
        {
            "question": "True or False: The symptoms of a brain tumor often depend on the tumor's location within the brain.",
            "options": ["True", "False"],
            "answer": "True",
            "explanation": "Where a brain tumor is in the brain can change how it affects our bodies. That's why people with brain tumors might have different symptoms."
        }

    ];

    function displayQuiz(numQuestions) {
        questions = shuffleArray(questions);

        questions = questions.slice(0, numQuestions);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function displayQuiz(numQuestions) {
        questions = shuffleArray(questions);

        questions = questions.slice(0, numQuestions);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        let questionDiv = document.createElement("div");
        questionDiv.className = 'quiz-card';
        questionDiv.innerHTML = `
            <p class="quiz-question">${question.question}</p>
            <div class="quiz-options">
                ${question.options.map(option => 
                    `   <button class="option" onclick="selectOption('${option}', '${question.answer}', '${question.explanation}', this.parentNode.parentNode)">${option}</button>`
                ).join('')}
            </div>
            <p class="result-display"></p>
            <button class="next-button">Next</button> <!-- Remove onclick attribute -->
        `;
        quizSection.innerHTML = ''; 
        quizSection.appendChild(questionDiv);

        questionDiv.style.display = 'flex';
        questionDiv.style.flexDirection = 'column';
        questionDiv.style.alignItems = 'center';
        questionDiv.style.opacity = 1; 

        let optionButtons = questionDiv.querySelectorAll('.option');
        optionButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                selectOption(question.options[index], question.answer, question.explanation, questionDiv);
            });
        });

        let nextButton = questionDiv.querySelector('.next-button');
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++; 
            displayNextQuestion(); 
        });
    } else {
        quizSection.innerHTML = '';
        showScore(); 
    }
}

    function selectOption(selectedOption, correctAnswer, explanation, questionElement) {
    let resultMessage = selectedOption === correctAnswer ? "Correct! Well done!" : "Incorrect. Let's learn why.";
    let explanationMessage = selectedOption === correctAnswer ? "" : explanation;

    let questionIndex = questions.findIndex(question => question.question === questionElement.querySelector('.quiz-question').textContent);
    questions[questionIndex].selectedOption = selectedOption;

    let resultDisplay = questionElement.querySelector('.result-display');
    resultDisplay.innerText = resultMessage + " " + explanationMessage;

    let selectedOptionButton = questionElement.querySelector(`.option[value="${selectedOption}"]`);
    selectedOptionButton.classList.add('selected');

    let nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'next-button';
    nextButton.addEventListener('click', () => {
        displayNextQuestion();
    });
    questionElement.appendChild(nextButton);
}


    function showScore() {
    let correctAnswers = 0;
    questions.forEach(question => {
        if (question.selectedOption === question.answer) {
            correctAnswers++;
        }
    });

    let totalQuestions = questions.length;
    let scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    let scoreElement = document.querySelector('.percent__int');
    scoreElement.textContent = scorePercentage + "%";

    let progress = document.querySelector('#quizRing .circle-chart__circle');
    let radius = progress.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    let offset = circumference * ((100 - scorePercentage) / 100);

    progress.style.strokeDasharray = `${circumference},${circumference}`;
    progress.style.strokeDashoffset = offset;

    let resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');

    let scoreText = document.getElementById('scoreExplanation');
    scoreText.textContent = getScoreText(scorePercentage); 
}

    function getScoreText(scorePercentage) {
        if (scorePercentage === 100) {
            return "Congratulations! You seem to know a lot about brain tumors";
        } else if (scorePercentage >= 90) {
            return "Great job! You have a solid understanding about brain tumors";
        } else if (scorePercentage >= 80) {
            return "Well done! You're pretty knowledgable about brain tumors";
        } else if (scorePercentage >= 70) {
            return "Not bad! Keep learning about brain tumors and improve!";
        } else if (scorePercentage >= 60) {
            return "You're getting there! Keep practicing!";
        } else if (scorePercentage >= 50) {
            return "You're progressing! Keep it up!";
        } else if (scorePercentage >= 40) {
            return "There's room for improvement! Keep learning about brain tumors!";
        } else if (scorePercentage >= 30) {
            return "You're on the right path to learning! Keep trying!";
        } else if (scorePercentage >= 20) {
            return "Keep trying! Learning takes time!";
        } else if (scorePercentage >= 10) {
            return "Keep going! Every step counts!";
        } else {
            return "It looks like you need to study some more. Don't give up!";
        }
    }

});

document.getElementById('continueButton').addEventListener('click', function() {
    var visualizer = document.getElementById('brainFunctionVisualization');
    var scoreSection = document.getElementById('resultsSection'); 

    scoreSection.style.display = 'none';

    visualizer.classList.toggle('show');
});




