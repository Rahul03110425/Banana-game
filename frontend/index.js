const apiUrl = "http://localhost:3000";
const timer = document.getElementById("quiz__timer");
const img = document.getElementById("quiz__image");
const quiz_answer = document.getElementById("quiz__answer")
let answer = null

// quiz_answer.addEventListener('change'. function() {
//     if (quiz_answer.value === answer)  {

//     }
// })

function load_image () {
    fetch(`${apiUrl}/quiz`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("response was not okay");
            }
            return response.json();
        })
        .then((data) => {
            img.src = data.question;
            answer = data.solution
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
setInterval(() => {
    if (count === 0) {
        alert("you lose")
        count = 90;
        unload_img()
        load_image()
    }
    if (count < 10) {
        timer.style = "color: red;"
    } else {
        timer.style = "color: black"
    }
    timer.innerText = `${Math.floor(count/60)}.${count%60}`
    count = count - 1;

}, 1000);

load_image()