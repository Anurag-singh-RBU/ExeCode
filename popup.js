document.getElementById("save").addEventListener("click", () => {

    const profile = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      college: document.getElementById("college").value,
      branch: document.getElementById("branch").value,
      gender: document.getElementById("gender").value
    };
  
    chrome.storage.sync.set({ profile }, () => {
      alert("Profile Saved Successfully !!");
    });
  
});
  