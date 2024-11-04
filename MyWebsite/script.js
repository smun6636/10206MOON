document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const quizContainer = document.getElementById('quizContainer');
    const questionTitle = document.getElementById('questionTitle');
    const userInput = document.getElementById('userInput');
    const result = document.getElementById('result');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
    const finalScore = document.getElementById('finalScore');
    const scoreDisplay = document.getElementById('scoreDisplay');

    const questions = [
        {
            question: "컴퓨터의 중앙 처리 장치를 나타내는 약자는?",
            answers: ["cpu"]
        },
        {
            question: "하드웨어와 직접적인 접근이 가능하여 성능과 메모리 효율성이 뛰어나고,<br> 다양한 하드웨어로의 이식성이 좋은 프로그래밍 언어는?",
            answers: ["c언어", "c"]
        },
        {
            question: "다층 인공 신경망을 사용하여 대량의 데이터를 자동으로 분석하고 학습하여<br> 패턴을 인식하는 인공지능 기술의 이름은?",
            answers: ["딥 러닝", "딥러닝"]
        },
        {
            question: "조선 세종대왕 시기 장영실 등이 제작한 천체 관측 기구로,<br> 만원권 지폐 뒷면에도 그려져있는 이 것의 이름은?",
            answers: ["혼천의"]
        },
        {
            question: "그늘에 있으면 행복한 이유는?",
            answers: ["해피해서"]
        },
        {
            question: "부엉이가 물에 빠지면.",
            answers: ["첨부엉", "첨부엉 첨부엉"]
        },
        {
            question: "기생충이 목마를 때 하는 말은?",
            answers: ["숙주나물"]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startButton.addEventListener('click', () => {
        document.getElementById('greeting').classList.add('hidden');
        startButton.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    });

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTitle.innerHTML = currentQuestion.question;
        userInput.value = '';
        result.textContent = '';
        nextButton.classList.add('hidden');
        skipButton.classList.add('hidden');
        document.getElementById('inputForm').classList.remove('hidden'); // 정답 입력란과 버튼 표시
    }

    document.getElementById('inputForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const userAnswer = userInput.value.trim().toLowerCase();
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.answers.includes(userAnswer)) {
            result.textContent = '정답입니다!';
            result.style.color = 'green';
            score++;
            nextButton.classList.remove('hidden');
            skipButton.classList.add('hidden');
        } else {
            let wrongMessage;
            switch (currentQuestionIndex) {
                case 4:
                    wrongMessage = '해피해서~';
                    break;
                case 5:
                    wrongMessage = '첨부엉 첨부엉~';
                    break;
                case 6:
                    wrongMessage = '숙주나물~';
                    break;
                default:
                    wrongMessage = '오답!';
                    break;
            }

            result.textContent = wrongMessage;
            result.style.color = 'red';

            if (currentQuestionIndex >= 4) {
                skipButton.classList.remove('hidden');
                document.getElementById('inputForm').classList.add('hidden'); // 5, 6, 7번 문제에서 오답 시 정답 입력란 숨기기
            } else {
                setTimeout(() => {
                    result.textContent = '';
                    userInput.value = '';
                    skipButton.classList.remove('hidden');
                }, 1000);
            }
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    skipButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
        skipButton.classList.add('hidden');
    });

    function showFinalScore() {
        quizContainer.classList.add('hidden');
        finalScore.classList.remove('hidden');
        scoreDisplay.textContent = `맞춘 개수 ${score}/${questions.length}`;
    }
});
