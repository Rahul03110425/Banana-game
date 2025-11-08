myApp.checkUser(); 
const user = myApp.user

const apiUrl = "http://localhost:3000";
const timer = document.getElementById("quiz__timer");
const img = document.getElementById("quiz__image");
const quizForm = document.querySelector('.quiz__form');
const submitButton = document.querySelector('.quiz__button--enter');
const resultIncorrect = document.querySelector('.result--incorrect');
const resultCorrect = document.querySelector('.result--correct');
const resultTimeup = document.querySelector('.result--timeup');
const resultCorrectBtn = document.querySelector('.result__button--correct');
let answer = null

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();  

    const quizAnswer = document.getElementById('quiz__answer').value;

    if (quizAnswer == answer) {  
        console.log('Correct answer!');
        clearInterval(intervalId);
        resultCorrect.style.display = "flex"
    } else {
        resultIncorrect.style.display = "flex"
    }
});

resultCorrectBtn.addEventListener('click', function() {
    fetch(`${apiUrl}/user/level`, {
        headers: {
            "Authorization": `Bearer ${myApp.user.token}`
        }, method: "POST"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("response was not okay");
            }
            return response.json();
        })
        .then(() => {
            localStorage.setItem('user', JSON.stringify({...user, level: user.level + 1}))
            window.location.href = '/levels.html'
        }
        )
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
});

function load_image () {
    fetch(`${apiUrl}/quiz`, {
        headers: {
            "Authorization": `Bearer ${myApp.user.token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("response was not okay");
            }
            return response.json();
        })
        .then((data) => {
            img.src = data.question;
            answer = data.solution
            console.log(answer)
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
};

function unload_img() {
    img.src = "";
}

let count = 90;
const intervalId = setInterval(() => {
    if (count === 0) {
        resultTimeup.style.display = "flex";
        // Reset the countdown or perform other actions
        clearInterval(intervalId);  // Stop the interval when the countdown reaches 0
    }

    if (count < 10) {
        timer.style = "color: red;";
    } else {
        timer.style = "color: black";
    }

    timer.innerText = `${Math.floor(count / 60)}.${count % 60}`;
    count = count - 1;
}, 1000);


load_image()