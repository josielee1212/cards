const envelope=document.querySelector(".envelope");

envelope.addEventListener("click",()=>{

    envelope.style.transform="scale(.95)";

    setTimeout(()=>{

        envelope.style.transform="scale(1)";

    },150);

});
