function startApp() {
  const name = document.getElementById("businessInput").value;
  if (name) {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
    document.getElementById("businessTitle").textContent = name;
  }
}

function showForm(type) {
  document.getElementById("purchaseForm").style.display = "none";
  document.getElementById("checkForm").style.display = "none";

  if (type === "purchase") {
    document.getElementById("purchaseForm").style.display = "block";
  } else if (type === "check") {
    document.getElementById("checkForm").style.display = "block";
  }
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
