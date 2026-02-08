console.log("Form404 Loaded");

waitForForm();

function waitForForm(){

  const observer = new MutationObserver(() => {

    const questions =
      document.querySelectorAll(".Qr7Oae");

    if(questions.length > 0){

      console.log("Form detected");

      observer.disconnect();

      startAuto();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function clearAllSelections(){

  const radios =
    document.querySelectorAll('input[type="radio"]');

  radios.forEach(radio => {
    radio.checked = false;
    radio.removeAttribute("checked");
    radio.blur();
  });

  console.log("Default selections cleared");
}

async function startAuto(){

  console.log("Form404 started");

  clearAllSelections();

  const questions =
    document.querySelectorAll(".Qr7Oae");

  for(const q of questions){

    const mcq = await solveMCQ(q);
    if(!mcq){
      await solveParagraph(q);
    }
  }

  console.log("Form404 done");
}

async function getAI(question, options){

  const res = await fetch(
    "http://localhost:3000/api/answer",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        question,
        options
      })
    }
  );

  const data = await res.json();

  return data.answer;
}

async function solveMCQ(box){

  const qEl = box.querySelector(".M7eMe");
  if(!qEl) return false;

  const question = qEl.innerText.trim();

  const optionEls =
    box.querySelectorAll('[role="radio"]');

  if(optionEls.length === 0) return false;

  const options = [];

  optionEls.forEach(opt => {

    const label =
      opt.querySelector(".AB7Lab.Id5V1");

    let text = "";

    if(label){
      text = label.innerText.trim();
    }

    options.push(text);
  });

  const answer =
    (await getAI(question, options)).trim();

  console.log("Question :", question);
  console.log("AI :", answer);

  return true;
}

async function solveParagraph(box){

  const qEl = box.querySelector(".M7eMe");
  if(!qEl) return false;

  const question = qEl.innerText.trim();

  const input =
    box.querySelector("textarea, input[type='text']");

  if(!input) return false;

  console.log("Paragraph Question :", question);

  const answer = await getAI(
    question,
    ["Write a clear and short answer"]
  );

  console.log("AI :", answer);

  input.value = answer;

  input.dispatchEvent(
    new Event("input",{bubbles:true})
  );

  return true;
}

document.addEventListener("click", e => {

  if(e.target.closest('[role="radio"]')){
    e.preventDefault();
    e.stopPropagation();
  }

}, true);

document.addEventListener("keydown", e => {

  if(["Enter"," "].includes(e.key)){
    e.preventDefault();
  }

}, true);
