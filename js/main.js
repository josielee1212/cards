const params = new URLSearchParams(window.location.search);

const user = params.get("user") || "jim";

const letterPath = `data/${user}/letter.txt`;

console.log(letterPath);

fetch(letterPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("找不到信件");
        }
        return response.text();
    })
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.log(error.message);
    });




const welcomePage = document.getElementById("welcome");
const galleryPage = document.getElementById("gallery");
const letterPage = document.getElementById("letter");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

startBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    galleryPage.style.display = "block";
});

nextBtn.addEventListener("click", () => {
    galleryPage.style.display = "none";
    letterPage.style.display = "block";
});