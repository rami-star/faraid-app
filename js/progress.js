/* progress.js — مؤشر التقدم الذكي + قفل الانتقال بين التدريبات والأبواب */
(function () {
  "use strict";
  if (typeof EXD === "undefined") return;

  var ar = (typeof window.ar === "function") ? window.ar : function (s) {
    return String(s).replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩"[d]; });
  };
  var nv = (typeof window.nv === "function") ? window.nv : function (s) {
    return parseInt(String(s).replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); }), 10);
  };

  var unitKey = (location.pathname.split("/").pop() || "bab").replace(/\.html?$/i, "");
  var storeKey = "miras_prog_" + unitKey;

  /* ===== ترتيب الأبواب: الباب N تُفتح تمارينه بعد إكمال تمارين الباب N-1 ===== */
  function unitNum(name) {
    try { name = decodeURIComponent(name); } catch (e) {}
    var m = /(?:الباب|الوحدة)[_\s-]*([٠-٩0-9]+)/.exec(name);
    return m ? nv(m[1]) : null;
  }

  var curN = unitNum(unitKey) || unitNum(document.title);
  var prevN = curN ? curN - 1 : null;

  var KNOWN = {
    1: "المدخل", 2: "أصحاب النصف", 3: "أصحاب الربع", 4: "أصحاب الثمن",
    5: "أصحاب الثلثين", 6: "أصحاب الثلث", 7: "أصحاب السدس", 8: "أحوال الجدات",
    9: "التعصيب", 10: "الحجب", 11: "العول", 12: "الرد",
    13: "الانكسار على جنس واحد", 14: "الانكسار على أجناس", 15: "المناسخات"
  };

  function nameFromFile(f) {
    try { f = decodeURIComponent(f); } catch (e) {}
    return f.replace(/\.html?$/, "").replace(/^الباب_[٠-٩0-9]+_/, "").replace(/_/g, " ");
  }

  try {
    if (curN) localStorage.setItem("miras_file_" + curN, location.pathname.split("/").pop());
  } catch (e) {}

  function unitName(n) {
    var v = "";
    try { v = localStorage.getItem("miras_name_" + n) || ""; } catch (e) {}
    return v || KNOWN[n] || "";
  }

  function unitDone(n) {
    try {
      if (localStorage.getItem("miras_done_" + n) === "1") return true;
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf("miras_prog_") !== 0 || unitNum(k.slice(11)) !== n) continue;
        var st = JSON.parse(localStorage.getItem(k) || "{}"), ks = Object.keys(st);
        if (ks.length && ks.every(function (g) { return st[g] && st[g].total && st[g].ok === st[g].total; })) return true;
      }
    } catch (e) {}
    return false;
  }

  function markDone() {
    try { if (curN) localStorage.setItem("miras_done_" + curN, "1"); } catch (e) {}
  }

  function isLocked() {
    return !!(curN && prevN >= 1 && !unitDone(prevN));
  }

  function loadState() {
    try { return JSON.parse(localStorage.getItem(storeKey)) || {}; } catch (e) { return {}; }
  }

  function saveState(s) {
    try { localStorage.setItem(storeKey, JSON.stringify(s)); } catch (e) {}
  }

  /* ===== استخراج المجموعات الفريدة (بدون تكرار عندما يمتد التدريب لعدة صفحات) ===== */
  var allBtns = Array.prototype.slice.call(document.querySelectorAll("[data-chk]"));
  var groups = [];
  var firstBtnByGroup = {};
  var lastBtnByGroup = {};

  allBtns.forEach(function (b) {
    var g = b.dataset.chk;
    if (!g) return;
    if (groups.indexOf(g) === -1) {
      groups.push(g);
      firstBtnByGroup[g] = b;
    }
    lastBtnByGroup[g] = b;
  });

  function compute(g) {
    var L = EXD[g];
    if (!L) return null;
    var ok = 0;
    var ns = function (v) { return String(v || "").replace(/\s/g, ""); };
    var norm = function (s) { return ns(s).replace(/ـ/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه"); };

    L.forEach(function (x, i) {
      var q = function (k) {
        return document.querySelector('[data-g="' + g + '"][data-i="' + i + '"][data-k="' + k + '"]');
      };
      var good = true;
      try {
        var qt = q("t");
        if (!qt || String(qt.value || "").trim() === "") {
          good = false;
        } else {
          good = nv(qt.value) === x.t;
        }
        (x.hs || []).forEach(function (h, k) {
          if (h[1] !== null && h[1] !== undefined) {
            var qs = null;
            for (var js = k; js >= 0 && !qs; js--) {
              var elS = q("s" + js);
              if (elS && (!elS.closest("td") || elS.closest("td").style.display !== "none")) qs = elS;
            }
            good = (!!qs && String(qs.value || "").trim() !== "" && nv(qs.value) === h[1]) && good;
          }
          if (h[2]) {
            var qm = null;
            for (var j = k; j >= 0 && !qm; j--) {
              var elM = q("m" + j);
              if (elM && (!elM.closest("td") || elM.closest("td").style.display !== "none")) qm = elM;
            }
            good = (!!qm && ns(qm.dataset.v) === ns(h[2])) && good;
          }
        });
        
        var qhFn = function (k) {
          for (var jh = k; jh >= 0; jh--) {
            var elH = q("h" + jh);
            if (elH && (!elH.closest("td") || elH.closest("td").style.display !== "none")) return elH;
          }
          return null;
        };

        Object.keys(x.c || {}).forEach(function (key) {
          var el = /^h(\d+)$/.test(key) ? qhFn(parseInt(RegExp.$1, 10)) : q(key);
          var val = x.c[key];
          if (typeof val === "string") {
            var uVal = el ? norm(el.value) : "";
            var okStr = val.split("|").some(function (opt) { return uVal !== "" && uVal === norm(opt); });
            good = okStr && good;
          } else {
            good = (!!el && String(el.value || "").trim() !== "" && nv(el.value) === val) && good;
          }
        });
        /* حماية الخانات التي يُفترض أن تبقى فارغة */
        Array.prototype.forEach.call(
          document.querySelectorAll('[data-g="' + g + '"][data-i="' + i + '"]'),
          function (el) {
            var k = el.dataset.k;
            if (!k || k === "t" || (x.c && k in x.c)) return;
            if (/^s(\d+)$/.test(k)) {
              var idx = parseInt(RegExp.$1, 10);
              if (x.hs && x.hs[idx] && x.hs[idx][1] !== null && x.hs[idx][1] !== undefined) return;
            }
            if (/^m(\d+)$/.test(k)) {
              var idx2 = parseInt(RegExp.$1, 10);
              if (x.hs && x.hs[idx2] && x.hs[idx2][2]) return;
            }
            var hasVal = el.matches && el.matches(".mi") ? !!(el.dataset.v || "") : String(el.value || "").trim() !== "";
            if (hasVal) good = false;
          }
        );
      } catch (e) {
        good = false;
      }
      if (good) ok++;
    });
    return { ok: ok, total: L.length };
  }

  /* ===== إدراج بوابة انتقال واحدة فقط لكل مجموعة تدريبية إلى بداية المجموعة التي تليها ===== */
  groups.forEach(function (g, idx) {
    if (idx === groups.length - 1) return; // المجموعة الأخيرة في الباب لا تحتاج بوابة تدريب تالٍ
    var nextGroup = groups[idx + 1];
    var firstInNext = document.querySelector('[data-g="' + nextGroup + '"]') || firstBtnByGroup[nextGroup];
    var nextSection = firstInNext ? firstInNext.closest("section.pg") : null;
    var target = nextSection ? nextSection.id : "";

    var anchor = document.querySelector('.prog[data-group="' + g + '"]') || document.getElementById(g + "-r");
    if (!anchor) return;

    /* منع الإضافة المكررة إذا كانت البوابة موجودة مسبقاً */
    if (document.querySelector('.tr-gate[data-group="' + g + '"]')) return;

    var gate = document.createElement("div");
    gate.className = "nxt-box tr-gate";
    gate.dataset.group = g;
    var a = document.createElement("a");
    a.className = "nxt-btn full";
    a.href = "#" + target;
    a.textContent = "الانتقال إلى التدريب التالي ↓";
    gate.appendChild(a);
    anchor.insertAdjacentElement("afterend", gate);
  });

  /* ===== حفظ النص الأصلي لبوابة الباب التالي وإنشاء رسالة التنبيه ===== */
  var ng = document.getElementById("next-gate");
  var ngLink = ng ? ng.querySelector("a.nxt-btn") : null;
  if (ngLink && !ng.dataset.label) ng.dataset.label = ngLink.textContent;

  var hint = ng ? ng.querySelector(".nxt-hint") : null;
  if (ng && !hint) {
    var rawHref = (ngLink && ngLink.getAttribute("href")) ? ngLink.getAttribute("href").trim() : "";
    var cleanHref = rawHref.split(/[?#]/)[0];
    var isHome = !cleanHref || /(^|\/)(index\.html?)?$/i.test(cleanHref);
    var isExam = /exam\.html?$/i.test(cleanHref);

    hint = document.createElement("div");
    hint.className = "nxt-hint";
    hint.hidden = true;

    if (isHome) {
      hint.textContent = "أكمل تمارين هذا الباب بشكل صحيح ليُفتح لك الاختبار النهائي (اختبار الشهادة) من الرئيسية 🎓";
    } else if (isExam) {
      hint.textContent = "أكمل تمارين هذا الباب بشكل صحيح لفتح الاختبار النهائي (اختبار الشهادة) 🎓";
    } else {
      var nxtName = nameFromFile(cleanHref);
      var nxtTitle = nxtName ? "باب «" + nxtName + "»" : "الباب التالي";
      hint.textContent = "يمكنك تصفّح " + nxtTitle + " الآن، لكن تمارينه تبقى مقفلة 🔒 حتى تُكمل تمارين هذا الباب بشكل صحيح.";
    }
    ng.appendChild(hint);
  }

  var doneMap = {};

  function applyLock() {
   /* return; /* تم تعطيل القفل مؤقتاً */
  }

  function update() {
    if (!groups.length) {
      var d1 = unitDone(curN);
      if (hint) hint.hidden = !!d1;
      return;
    }

    var state = loadState();
    var allDone = groups.length > 0;

    groups.forEach(function (g) {
      var r = compute(g);
      if (!r) { allDone = false; return; }
      if (r.ok === 0 && state[g] && state[g].ok === state[g].total && state[g].total === r.total) {
        r = { ok: state[g].ok, total: state[g].total, prev: true };
      }
      var wasDone = !!(state[g] && state[g].done);
      state[g] = { ok: r.ok, total: r.total };
      if (r.ok === r.total || wasDone) { state[g].done = true; }
      doneMap[g] = !!state[g].done;

      var pct = r.total ? Math.round(r.ok * 100 / r.total) : 0;

      var el = document.querySelector('.prog[data-group="' + g + '"]');
      if (el) {
        var txt = el.querySelector(".prog-txt");
        var fill = el.querySelector(".prog-fill");
        if (txt) {
          txt.textContent = r.prev
            ? "أتممت هذا التدريب سابقاً بشكل كامل ✓"
            : "أجبت بشكل صحيح: " + ar(r.ok) + " من " + ar(r.total) + " — " + ar(pct) + "٪";
        }
        if (fill) fill.style.width = pct + "%";
        el.classList.remove("low", "mid", "full");
        el.classList.add(pct === 100 ? "full" : (pct >= 50 ? "mid" : "low"));
      }

      var done = r.ok === r.total;
      if (!done) allDone = false;

      document.querySelectorAll('.tr-gate[data-group="' + g + '"]').forEach(function (gate) {
        var ga = gate.querySelector("a");
        if (!ga) return;
        if (done) {
          gate.classList.remove("locked");
          ga.textContent = "الانتقال إلى التدريب التالي ↓";
        } else {
          gate.classList.add("locked");
          ga.textContent = "🔒 أجب عن جميع أسئلة هذا التدريب بشكل صحيح للانتقال";
        }
      });
    });

    saveState(state);

    if (allDone) markDone();
    applyLock();
    if (ngLink) {
      ngLink.classList.remove("locked");
      ngLink.textContent = ng.dataset.label || ngLink.textContent;
      if (hint) hint.hidden = !!allDone;
    }
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest && (e.target.closest("[data-chk]") || e.target.closest("#qz-chk-btn"))) {
      setTimeout(update, 0);
    }
  });

  update();
  applyLock();
  window.addEventListener("pageshow", applyLock);
  window.addEventListener("storage", applyLock);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) applyLock(); });
})();