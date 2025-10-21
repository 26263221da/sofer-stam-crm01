// מימוש מינימלי של פונקציות CRM לשלב פרוטוטיפ (localStorage).
// מיועד להרצה ישירה בדפדפן; ניתן להרחבה לקונקרטיזציה עם backend/Firebase.

const screens = [
  'registerScreen','loginScreen','verifyScreen','choiceScreen',
  'purchaseScreen','checkScreen','receipt','receiptsScreen','reportsScreen'
];

function hideAll() {
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function toggleScreens(target) {
  hideAll();
  if (target === 'login') document.getElementById('loginScreen').style.display = '';
  else if (target === 'register') document.getElementById('registerScreen').style.display = '';
  else if (target === 'choice') document.getElementById('choiceScreen').style.display = '';
}

function register(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const user = { email, password, verified: false };
  localStorage.setItem('crm_user', JSON.stringify(user));
  alert('נרשמת בהצלחה — נשלח אימייל לדוגמה (לבדיקה, לחץ המשך אימות)');
  hideAll();
  document.getElementById('verifyScreen').style.display = '';
}

function login(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const raw = localStorage.getItem('crm_user');
  if (!raw) { alert('אין משתמש רשום'); return; }
  const user = JSON.parse(raw);
  if (user.email === email && user.password === password) {
    if (!user.verified) {
      hideAll();
      document.getElementById('verifyScreen').style.display = '';
    } else {
      hideAll();
      document.getElementById('choiceScreen').style.display = '';
    }
  } else {
    alert('אימייל או סיסמה שגויים');
  }
}

function continueAfterVerification() {
  const raw = localStorage.getItem('crm_user');
  if (!raw) return alert('אין משתמש לבדיקה');
  const user = JSON.parse(raw);
  user.verified = true;
  localStorage.setItem('crm_user', JSON.stringify(user));
  hideAll();
  document.getElementById('choiceScreen').style.display = '';
}

function chooseScreen(name) {
  hideAll();
  if (name === 'purchase') document.getElementById('purchaseScreen').style.display = '';
  if (name === 'check') document.getElementById('checkScreen').style.display = '';
}

function savePurchase(e) {
  e.preventDefault();
  const p = {
    id: Date.now(),
    name: document.getElementById('purchaseName').value,
    phone: document.getElementById('purchasePhone').value,
    type: document.getElementById('purchaseType').value,
    hidur: document.getElementById('purchaseHidur').value,
    size: document.getElementById('purchaseSize').value,
    qty: Number(document.getElementById('purchaseQty').value),
    price: Number(document.getElementById('purchasePrice').value),
    date: new Date().toISOString()
  };
  const arr = JSON.parse(localStorage.getItem('crm_purchases') || '[]');
  arr.push(p);
  localStorage.setItem('crm_purchases', JSON.stringify(arr));
  showReceiptFor(p);
}

function saveCheck(e) {
  e.preventDefault();
  const c = {
    id: Date.now(),
    name: document.getElementById('checkName').value,
    phone: document.getElementById('checkPhone').value,
    date: document.getElementById('checkDate').value,
    location: document.getElementById('checkLocation').value,
    status: document.getElementById('checkStatus').value,
    notes: document.getElementById('checkNotes').value
  };
  const arr = JSON.parse(localStorage.getItem('crm_checks') || '[]');
  arr.push(c);
  localStorage.setItem('crm_checks', JSON.stringify(arr));
  alert('בדיקה נשמרה');
  goBackToChoice();
}

function showReceiptFor(purchase) {
  hideAll();
  const el = document.getElementById('receipt');
  const content = document.getElementById('receiptContent');
  content.innerText = `\nקבלה\nשם: ${purchase.name}\nטלפון: ${purchase.phone}\nמזוזה: ${purchase.type} (${purchase.hidur}, גודל ${purchase.size})\nכמות: ${purchase.qty}\nמחיר: ${purchase.price}\nתאריך: ${new Date(purchase.date).toLocaleString('he-IL')}\n  `;
  el.style.display = '';
}

function showReceipts() {
  hideAll();
  const listEl = document.getElementById('receiptsList');
  listEl.innerHTML = '';
  const arr = JSON.parse(localStorage.getItem('crm_purchases') || '[]');
  if (arr.length === 0) {
    listEl.innerHTML = '<li>אין קבלות</li>';
  } else {
    arr.slice().reverse().forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} — ${p.phone} — ${p.type} — ${p.qty} — ${p.price} ₪ — ${new Date(p.date).toLocaleDateString('he-IL')}`;
      li.onclick = () => showReceiptFor(p);
      listEl.appendChild(li);
    });
  }
  document.getElementById('receiptsScreen').style.display = '';
}

function filterReceipts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const arr = JSON.parse(localStorage.getItem('crm_purchases') || '[]');
  const listEl = document.getElementById('receiptsList');
  listEl.innerHTML = '';
  const filtered = arr.filter(p => p.name.toLowerCase().includes(q) || p.phone.toLowerCase().includes(q));
  if (filtered.length === 0) listEl.innerHTML = '<li>אין קבלות תואמות</li>';
  else {
    filtered.slice().reverse().forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} — ${p.phone} — ${p.type} — ${p.qty} — ${p.price} ₪ — ${new Date(p.date).toLocaleDateString('he-IL')}`;
      li.onclick = () => showReceiptFor(p);
      listEl.appendChild(li);
    });
  }
}

function showReports() {
  hideAll();
  const purchases = JSON.parse(localStorage.getItem('crm_purchases') || '[]');
  const total = purchases.reduce((s, p) => s + (p.price || 0), 0);
  document.getElementById('reportSummary').innerText = `סה"כ קבלות: ${purchases.length} — סכום כולל: ${total} ₪`;
  document.getElementById('reportsScreen').style.display = '';
}

function goBackToChoice() {
  hideAll();
  document.getElementById('choiceScreen').style.display = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem('crm_user');
  if (!raw) {
    hideAll();
    document.getElementById('registerScreen').style.display = '';
  } else {
    const user = JSON.parse(raw);
    if (!user.verified) {
      hideAll();
      document.getElementById('verifyScreen').style.display = '';
    } else {
      hideAll();
      document.getElementById('choiceScreen').style.display = '';
    }
  }
});