// Funkcija za odprtje modalnega okna za kodo
function openCodeModal() {
  document.getElementById('codeModal').style.display = 'block';
}

// Funkcija za zapiranje modalnega okna za kodo
function closeCodeModal() {
  document.getElementById('codeModal').style.display = 'none';
}

// Funkcija za odklepanje urejevalnika (vnos kode)
function unlockEditor() {
  const code = document.getElementById('secretCode').value;
  if (code === "140197") {
    closeCodeModal(); // Zapri modal za kodo
    openDateModal();  // Odpri modal za datum
    showPopup("Urejevalnik odklenjen ✅");
  } else {
    showPopup("Napačna koda ❌", "#f44336");
  }
}

// Funkcija za odprtje modalnega okna za datum
function openDateModal() {
  document.getElementById('dateModal').style.display = 'block';
}

// Funkcija za zapiranje modalnega okna za datum
function closeDateModal() {
  document.getElementById('dateModal').style.display = 'none';
}

// Funkcija za shranjevanje sprememb (datum, reps, max set)
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
  closeDateModal(); // Zapri modal za datum
}

// Funkcija za prikaz sporočila (popup)
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
