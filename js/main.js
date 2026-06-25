
// =========================
// 取得網址參數
// =========================
const params = new URLSearchParams(window.location.search);
const user = params.get("user") || "jim";

// =========================
// 路徑設定
// =========================
const letterPath = `data/${user}/letter.txt`;

// =========================
// DOM
// =========================
const welcomePage = document.getElementById("welcome");
const galleryPage = document.getElementById("gallery");
const letterPage = document.getElementById("letter");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const mediaContainer = document.getElementById("mediaContainer");
const letterContent = document.getElementById("letterContent");

// =========================
// 圖片設定
// =========================
let currentImage = 1;
let currentVideo = 1;
const maxImages = 3; // 先固定，下一版改成自動偵測

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

    };

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