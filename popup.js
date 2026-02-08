document.addEventListener("DOMContentLoaded", loadAnswers);

function loadAnswers(){

  chrome.storage.local.get(["answers"], data => {

    const list = data.answers || [];

    const box = document.getElementById("list");

    if(list.length === 0){

      box.innerHTML =
        `<p class="empty">No answers yet</p>`;

      return;
    }

    box.innerHTML = "";

    list.forEach((item, i) => {

      const div = document.createElement("div");

      div.className = "item";

      div.innerHTML = `
        <div class="q">${item.q}</div>
        <div class="a">${item.a}</div>
        <div class="copy" data-i="${i}">
          Copy
        </div>
      `;

      box.appendChild(div);
    });

    enableCopy();
  });
}

// ================= COPY =================

function enableCopy(){

  document.querySelectorAll(".copy")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        const i = btn.dataset.i;

        chrome.storage.local.get(["answers"], data => {

          const text = data.answers[i].a;

          navigator.clipboard.writeText(text);

          btn.textContent = "Copied";

          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1200);

        });
      });
  });
}
