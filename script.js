function updateBusinessName() {
  const name = document.getElementById(nameInput).value;
  if (name) {
    document.getElementById(businessName).textContent = name;
  }
}

document.getElementById(purchaseForm).addEventListener(submit, function(e) {
  e.preventDefault();
  const fields = Array.from(e.target.elements).map(el = el.value).filter(v = v);
  const text = `קבלה ללקוחn${fields.join(n)}`;
  downloadFile(kabbala.txt, text);
});

document.getElementById(checkForm).addEventListener(submit, function(e) {
  e.preventDefault();
  const fields = Array.from(e.target.elements).map(el = el.value).filter(v = v);
  const text = `דוח בדיקת מזוזותn${fields.join(n)}`;
  downloadFile(duch_bedika.txt, text);
});

function downloadFile(filename, content) {
  const blob = new Blob([content], { type textplain });
  const link = document.createElement(a);
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
