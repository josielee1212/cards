const envelope = document.querySelector("#envelope");
const flap = document.querySelector(".flap");

let opened = false;

envelope.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    flap.style.transform = "rotateX(180deg)";

});