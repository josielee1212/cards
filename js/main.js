const params = new URLSearchParams(window.location.search);

const user = params.get("user") || "jim";

const letterPath = `data/${user}/letter.txt`;
const imagePath = `data/${user}/01.jpg`;

console.log(letterPath);
console.log(imagePath);

fetch(letterPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("找不到信件");
        }
        return response.text();
    })
   .then(text => {

    const letterContent = document.getElementById("letterContent");

    letterContent.innerText = text;

})
    .catch(error => {
        console.log(error.message);
    });




const welcomePage = document.getElementById("welcome");
const galleryPage = document.getElementById("gallery");
const letterPage = document.getElementById("letter");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const mediaContainer = document.getElementById("mediaContainer");

startBtn.addEventListener("click", () => {

    welcomePage.style.display = "none";
    galleryPage.style.display = "block";

    mediaContainer.innerHTML = `
        <img src="${imagePath}" alt="Memory">
    `;

});

nextBtn.addEventListener("click", () => {
    galleryPage.style.display = "none";
    letterPage.style.display = "block";
});