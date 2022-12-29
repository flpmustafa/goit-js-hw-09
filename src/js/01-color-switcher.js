  const btnStart = document.querySelector("[data-start]");
  const btnStop = document.querySelector("[data-stop]");
  let btnStopDefaultState = btnStop.setAttribute("disabled", "disabled");


  let timerId = null;

  btnStart.addEventListener('click', () => {
    btnStop.removeAttribute("disabled", "disabled");
    btnStart.setAttribute("disabled", "disabled");
    
    timerId = setInterval(() => {
      let randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, 1000);
  });
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  btnStop.addEventListener('click', ()=> {
    btnStart.removeAttribute("disabled", "disabled")
    btnStop.setAttribute("disabled", "disabled")
    clearInterval(timerId);
  });

