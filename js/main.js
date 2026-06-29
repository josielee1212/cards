
// =========================
// 取得網址參數
// =========================
const params = new URLSearchParams(window.location.search);
const user = params.get("user") || "everyone7";

// =========================
// 路徑設定
// =========================
const letterPath = `data/${user}/letter.txt`;
const goodbyeTextPath = `assets/goodbye.txt`;

// =========================
// DOM
// =========================
const welcomePage = document.getElementById("welcome");
const galleryPage = document.getElementById("gallery");
const letterPage = document.getElementById("letter");
const goodbyePage = document.getElementById("goodbye");

const goodbyeBtn = document.getElementById("goodbyeBtn");
const goodbyeContainer = document.getElementById("goodbyeContainer");
const goodbyeText = document.getElementById("goodbyeText");
const restartBtn = document.getElementById("restartBtn");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const mediaContainer = document.getElementById("mediaContainer");
const letterContent = document.getElementById("letterContent");

const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeSubtitle = document.getElementById("welcomeSubtitle");

const galleryTitle = document.getElementById("galleryTitle");
const letterTitle = document.getElementById("letterTitle");
const galleryCaption = document.getElementById("galleryCaption");

if (user === "everyone") {

    welcomeTitle.innerText = "謝謝每一段相遇";
    welcomeSubtitle.innerText = "這裡放了一些照片，和想說的一些話";

    galleryTitle.innerText = "前往下一趟旅程之前";

    letterTitle.innerText = "最後想說的話";

    galleryCaption.style.display = "block";
    galleryCaption.innerText = "沿途的一些片段";

}

// =========================
// 圖片設定
// =========================
let currentImage = 1;
let currentVideo = 1;

// =========================
// 讀取信件
// =========================
fetch(letterPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("找不到信件");
        }
        return response.text();
    })
    .then(text => {
        letterContent.innerText = text;
    })
    .catch(error => {
        letterContent.innerText = error.message;
    });

fetch(goodbyeTextPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("找不到 Goodbye 文字");
        }
        return response.text();
    })
    .then(text => {
        goodbyeText.innerText = text;
    })
    .catch(error => {
        goodbyeText.innerText = "";
    });

// =========================
// 顯示圖片
// =========================
function showImage() {

    const imagePath = `data/${user}/images/${String(currentImage).padStart(2, "0")}.jpg`;

    const img = new Image();

    img.onload = () => {

        mediaContainer.innerHTML = "";
        mediaContainer.appendChild(img);

    };

    img.onerror = () => {

        currentVideo = 1;

        showVideo();

    };

    img.src = imagePath;

}

function showVideo() {

    const videoPath = `data/${user}/videos/${String(currentVideo).padStart(2, "0")}.mp4`;

    const video = document.createElement("video");

    video.src = videoPath;
    video.controls = true;
    video.style.maxWidth = "100%";
    video.style.borderRadius = "16px";

    video.onloadeddata = () => {

        mediaContainer.innerHTML = "";
        mediaContainer.appendChild(video);

    };

    video.onerror = () => {

        galleryPage.style.display = "none";
        letterPage.style.display = "block";

        goodbyeBtn.addEventListener("click", () => {

            showGoodbye();

        });

    };

}

function showGoodbye() {

    letterPage.style.display = "none";
    goodbyePage.style.display = "block";

    goodbyeContainer.innerHTML = `
    <video
        src="assets/goodbye.mp4"
        autoplay
        muted
        loop
        playsinline
        style="width:100%; max-height:60vh; border-radius:18px;">
    </video>
`;

}

function nextImage() {

    currentImage++;

    showImage();

}

// =========================
// 首頁 → 回憶
// =========================
startBtn.addEventListener("click", () => {

    welcomePage.style.display = "none";
    galleryPage.style.display = "block";

    currentImage = 1;

    showImage();

});

// =========================
// 下一步
// =========================
nextBtn.addEventListener("click", () => {

    const currentMedia = mediaContainer.querySelector("video");

    if (currentMedia) {

        currentVideo++;

        showVideo();

    } else {

        currentImage++;

        showImage();

    }


});

restartBtn.addEventListener("click", () => {

    currentImage = 1;
    currentVideo = 1;

    goodbyePage.style.display = "none";
    galleryPage.style.display = "block";

    mediaContainer.innerHTML = "";

    showImage();

});