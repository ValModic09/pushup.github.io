// Inicializacija Flatpickr za input element
flatpickr("#editDate", {
  dateFormat: "Y-m-d",  // Format datuma (leto-mesec-dan)
  allowInput: true       // Omogoči ročni vnos datuma
});

// Funkcija za odprtje modalnega okna za kodo
function openCodeModal() {
  document.getElementById('codeModal').style.display = 'block';
}

// Funkcija za zapiranje modalnega okna za kodo
function closeCodeModal() {
  document.getElementById('codeModal').style.display = 'none';
  document.getElementById('secretCode').value = '';  // Po zaprtju izprazni polje za kodo
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

  // Posodobi podatke za izbrani datum
  data[date] = {
    totalReps: reps,
    entries: [reps],
    maxSets: [maxSet]
  };

  // Shrani posodobljene podatke nazaj v localStorage
  localStorage.setItem("exerciseData", JSON.stringify(data));

  // Prikaz popup sporočila
  showPopup("Spremembe shranjene za " + date + " ✅");

  // Zapri modal za datum
  closeDateModal();

  // Osveži stran po 5 sekundah
  setTimeout(function() {
    location.reload(); // Osveži stran
  }, 1000);
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
  }, 2000);
}
