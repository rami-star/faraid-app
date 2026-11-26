/* ==
   نظام تسجيل الطلاب ومزامنة التقدم مع Google Sheets == */
(function () {
  "use strict";

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzoPScSXWElpl_vVY6GohqOgysEKU5ygaZ16eiinvZnLXV6tG1RSIb4u66rZLn0J8fR0Q/exec"; // رابط Web App الذي ينتهي بـ /exec
  const STUDENT_KEY = "miras_student_v1";

  /* حقن تنسيق نافذة التسجيل وشريط الطالب تلقائياً */
  if (!document.getElementById("st-inline-css")) {
    const style = document.createElement("style");
    style.id = "st-inline-css";
    style.textContent = `
      #st-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;max-width:960px;margin:10px auto 6px;padding:10px 14px;background:#f0f5fc;border:1px solid #b8c9e8;border-radius:10px;font-size:14px;color:#17375e;direction:rtl}
      #st-bar .st-info{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
      #st-bar .st-name{font-weight:700}
      #st-bar .st-id{font-size:12px;color:#546e7a;direction:ltr}
      #st-bar .st-prog{background:#e2efda;color:#1b5e20;padding:2px 10px;border-radius:99px;font-size:13px}
      #st-bar .st-actions{display:flex;gap:6px}
      #st-bar .st-actions button{padding:5px 11px;border:1px solid #2f5597;background:#fff;color:#17375e;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
      #st-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,28,46,.62);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:16px}
      .st-modal{width:min(94vw,420px);background:#fff;border-radius:14px;padding:22px 24px;box-shadow:0 14px 36px rgba(0,0,0,.28);direction:rtl;text-align:right}
      .st-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
      .st-head h3{margin:0;color:#17375e;font-size:19px}
      .st-close{border:none;background:#f1f5f9;color:#333;width:30px;height:30px;border-radius:50%;cursor:pointer;font-weight:700}
      .st-sub{margin:0 0 16px;font-size:13px;color:#555;line-height:1.6}
      #st-form{display:flex;flex-direction:column;gap:12px}
      #st-form label{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:700;color:#17375e}
      #st-form .opt{font-weight:400;color:#777;font-size:12px}
      #st-form input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #b8c9e8;border-radius:8px;font-size:14px;font-family:inherit}
      #st-form input:focus{outline:2px solid #2f5597;border-color:transparent}
      .st-submit{margin-top:6px;padding:11px;background:#17375e;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}
      .st-submit:hover{background:#1f4b82}
      .st-submit:disabled{opacity:.7;cursor:wait}
    `;
    document.head.appendChild(style);
  }

  const arNum = s => String(s).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);

  function getStudent() {
    try { return JSON.parse(localStorage.getItem(STUDENT_KEY)); }
    catch (_) { return null; }
  }

  function saveStudent(obj) {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(obj));
  }

  function nv(s) {
    return parseInt(String(s).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)), 10);
  }

  function unitNum(name) {
    try { name = decodeURIComponent(name); } catch (_) {}
    const m = /(?:الباب|الوحدة)[_\s-]*([٠-٩0-9]+)/.exec(name);
    return m ? nv(m[1]) : null;
  }

  function isUnitCompleted(n) {
    if (localStorage.getItem("miras_done_" + n) === "1") return true;
    if (localStorage.getItem("faraid_ch_done_" + n) === "1") return true;
    if (localStorage.getItem("ch_done_" + n) === "1") return true;

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith("miras_prog_") || unitNum(k.slice(11)) !== n) continue;
      try {
        const st = JSON.parse(localStorage.getItem(k) || "{}");
        const ks = Object.keys(st);
        if (ks.length && ks.every(g => st[g] && ((st[g].total && st[g].ok === st[g].total) || st[g].done))) {
          return true;
        }
      } catch (_) {}
    }
    return false;
  }

  function countCompletedChapters() {
    let count = 0;
    for (let i = 1; i <= 25; i++) {
      if (isUnitCompleted(i)) count++;
    }
    return count;
  }

  function generateId() {
    const rnd = Math.floor(1000 + Math.random() * 9000);
    return "MR-" + new Date().getFullYear() + "-" + rnd;
  }

  async function syncToSheet(extra = {}) {
    const st = getStudent();
    if (!st) return;

    const payload = {
      id: st.id,
      name: st.name,
      nationality: st.nationality,
      phone: st.phone,
      email: st.email || "",
      createdAt: st.createdAt,
      completedChapters: countCompletedChapters(),
      examScore: extra.examScore !== undefined ? extra.examScore : (st.examScore ?? ""),
      certStatus: extra.certStatus || st.certStatus || "قيد الدراسة"
    };

    if (extra.examScore !== undefined) st.examScore = extra.examScore;
    if (extra.certStatus) st.certStatus = extra.certStatus;
    saveStudent(st);

    if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR_WEB_APP_URL_HERE")) return;

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    } catch (_) {}
  }

  function openRegModal(force) {
    let overlay = document.getElementById("st-overlay");
    if (overlay) overlay.remove();

    const cur = getStudent() || {};
    overlay = document.createElement("div");
    overlay.id = "st-overlay";
    overlay.innerHTML = `
      <div class="st-modal" role="dialog" aria-modal="true">
        <div class="st-head">
          <h3>${cur.id ? "تعديل بيانات الطالب" : "تسجيل طالب جديد"}</h3>
          ${!force ? `<button type="button" class="st-close" aria-label="إغلاق">✕</button>` : ""}
        </div>
        <p class="st-sub">يُكتب الاسم كما ترغب أن يظهر في شهادة إتمام الدورة لاحقاً.</p>
        <form id="st-form">
          <label>الاسم الكامل *
            <input type="text" name="name" required placeholder="مثال: عبد الله بن محمد السالم" value="${cur.name || ""}">
          </label>
          <label>الجنسية *
            <input type="text" name="nationality" required placeholder="مثال: سعودي" value="${cur.nationality || ""}">
          </label>
          <label>رقم الجوال *
            <input type="tel" name="phone" required dir="ltr" style="text-align:right" placeholder="05xxxxxxxx" value="${cur.phone || ""}">
          </label>
          <label>البريد الإلكتروني <span class="opt">(اختياري)</span>
            <input type="email" name="email" dir="ltr" style="text-align:right" placeholder="name@email.com" value="${cur.email || ""}">
          </label>
          <button type="submit" class="st-submit">${cur.id ? "حفظ التعديلات" : "بدء الدراسة"}</button>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector(".st-close");
    if (closeBtn) closeBtn.onclick = () => overlay.remove();

    overlay.querySelector("#st-form").onsubmit = async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = String(fd.get("name") || "").trim();
      const nationality = String(fd.get("nationality") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      if (!name || !nationality || !phone) return;

      const btn = overlay.querySelector(".st-submit");
      btn.disabled = true;
      btn.textContent = "جارٍ الحفظ...";

      const student = {
        id: cur.id || generateId(),
        name,
        nationality,
        phone,
        email,
        createdAt: cur.createdAt || new Date().toISOString().slice(0, 10),
        examScore: cur.examScore ?? "",
        certStatus: cur.certStatus || "قيد الدراسة"
      };

      saveStudent(student);
      await syncToSheet();
      overlay.remove();
      renderStudentBar();
    };
  }

  function renderStudentBar() {
    const st = getStudent();
    let bar = document.getElementById("st-bar");
    if (!st) {
      if (bar) bar.remove();
      return;
    }

    // تحديث اسم الترحيب وحقل حسابي باسم المسجّل فقط
    const wName = document.getElementById("welcome-name");
    if (wName) wName.textContent = st.name.split(/\s+/)[0];
    const nameInp = document.getElementById("nameInput");
    if (nameInp) nameInp.value = st.name;
    localStorage.setItem("faraid_user", st.name);

    if (!bar) {
      bar = document.createElement("div");
      bar.id = "st-bar";
      document.body.prepend(bar);
    }

    const done = countCompletedChapters();
    bar.innerHTML = `
      <div class="st-info">
        <span class="st-name">👤 ${st.name}</span>
        <span class="st-id">(${st.id})</span>
        <span class="st-prog">الأبواب المنجزة: <b>${arNum(done)} / ٢٥</b></span>
      </div>
      <div class="st-actions">
        <button type="button" id="st-sync-btn"> تحديث التقدم↻</button>
        <button type="button" id="st-edit-btn">تعديل</button>
      </div>
    `;

    bar.querySelector("#st-edit-btn").onclick = () => openRegModal(false);
    bar.querySelector("#st-sync-btn").onclick = async function () {
      const progEl = bar.querySelector(".st-prog b");
      if (progEl) progEl.textContent = arNum(countCompletedChapters()) + " / ٢٥";
      this.textContent = "تم التحديث ✓";
      await syncToSheet();
      setTimeout(() => { this.textContent = "تحديث التقدم ↻"; }, 1800);
    };
  }

  window.MirasStudent = {
    get: getStudent,
    sync: syncToSheet,
    openModal: () => openRegModal(false)
  };

  function initStudent() {
    const st = getStudent();
    const isHome = !!document.getElementById("mainView") || /(?:^|\/)(?:index\.html)?$/i.test(location.pathname);

    if (st) {
      if (isHome) renderStudentBar();
      syncToSheet();
    } else if (isHome) {
      openRegModal(true);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStudent);
  } else {
    initStudent();
  }

  window.addEventListener("pageshow", () => {
    const isHome = !!document.getElementById("mainView") || /(?:^|\/)(?:index\.html)?$/i.test(location.pathname);
    if (isHome && getStudent()) renderStudentBar();
  });
})();