function unlockEditor() {
  const code = document.getElementById('secretCode').value;
  if (code === "140197") {
    document.getElementById('editSection').style.display = 'block';
    showPopup("Urejevalnik odklenjen ✅");
  } else {
    showPopup("Napačna koda ❌", "#f44336");
  }
}

function saveEditedData() {
  const date = document.getElementById('editDate').value;
  const reps = parseInt(document.getElementById('editReps').value);
  const maxSet = parseInt(document.getElementById('editMaxSet').value);

  if (!date || isNaN(reps) || isNaN(maxSet)) {
    showPopup("Prosim, izpolni vsa polja!", "#f44336");
    return;
  }

  let data = JSON.parse(localStorage.getItem("exerciseData")) || {};

  data[date] = {
    totalReps: reps,
    entries: [reps],
    maxSets: [maxSet]
  };

  localStorage.setItem("exerciseData", JSON.stringify(data));
  showPopup("Spremembe shranjene za " + date + " ✅");
}

function showPopup(message, color = "#4CAF50") {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.backgroundColor = color;
  popup.style.display = "block";
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.style.display = "none", 300);
  }, 5000);
}
