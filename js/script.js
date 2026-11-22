/* ==========================================================================
   ١. الأدوات المساعدة لتحويل الأرقام والكسور
   ========================================================================== */
const ar = s => String(s).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
const nv = s => parseInt(String(s).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)), 10);
const fr = s => {
  const [n, d] = s.split("/");
  return `<span class="f"><i>${ar(n)}</i><b>${ar(d)}</b></span>`;
};
const cmb = (a, b) => `<span class="cmb">${a}<span class="bq">${b}</span></span>`;

const MKV = {
  "1/2": fr("1/2"),
  "1/3": fr("1/3"),
  "1/4": fr("1/4"),
  "1/6": fr("1/6"),
  "1/8": fr("1/8"),
  "2/3": fr("2/3"),
  "1/3ب": cmb(fr("1/3"), "ب"),
  "1/6+ب": cmb(fr("1/6"), "+ ب"),
  "مقاسمة": "مقاسمة"
};

/* ==========================================================================
   ٢. تنسيق أبيات الشعر (.pm) في جميع الأبواب: مدّ الكشيدة الأصلية كالكتاب
   ========================================================================== */
const pmLayout = (function () {
  const TAT = "\u0640";
  const NONJOIN = "ادذرزوؤأإآةءىئ";
  const MARK = /[\u064B-\u065F\u0670\u06D6-\u06ED]/;
  const LETTER = /[\u0621-\u064A\u066E-\u06D3]/;

  function getStretchPoints(rawText) {
    const cleanChars = [];
    const tatPositions = [];
    for (let i = 0; i < rawText.length; i++) {
      if (rawText[i] === TAT) {
        if (cleanChars.length > 0 && tatPositions[tatPositions.length - 1] !== cleanChars.length) {
          tatPositions.push(cleanChars.length);
        }
      } else {
        cleanChars.push(rawText[i]);
      }
    }
    const base = cleanChars.join("");
    if (tatPositions.length > 0) {
      return { base, cands: tatPositions.map(at => ({ at })) };
    }

    const pos = [], n = base.length;
    for (let i = 0; i < n; i++) {
      const c = base[i];
      if (!LETTER.test(c) || NONJOIN.indexOf(c) > -1) continue;
      let j = i + 1;
      while (j < n && MARK.test(base[j])) j++;
      if (j >= n || !LETTER.test(base[j])) continue;
      if (c === "ل" && "اأإآ".indexOf(base[j]) > -1) continue;
      pos.push({ at: j });
    }
    return { base, cands: pos };
  }

  function build(base, cands, n) {
    if (!n || !cands.length) return base;
    const step = cands.length;
    const cnt = new Array(step).fill(0);
    const q = Math.floor(n / step), r = n % step;
    for (let k = 0; k < step; k++) cnt[k] = q;
    for (let k = 0; k < r; k++) cnt[Math.floor((k + 0.5) * step / r)] += 1;

    let out = "", last = 0;
    for (let k = 0; k < step; k++) {
      out += base.slice(last, cands[k].at) + new Array(cnt[k] + 1).join(TAT);
      last = cands[k].at;
    }
    return out + base.slice(last);
  }

  function inner(td) {
    const cs = getComputedStyle(td);
    return td.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  }

  function natural(td, text) {
    const sp = document.createElement("span");
    sp.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;text-align:start;text-align-last:auto;word-spacing:normal";
    sp.textContent = text;
    td.appendChild(sp);
    const w = sp.offsetWidth;
    td.removeChild(sp);
    return w;
  }

  return function layout() {
    document.querySelectorAll("table.pm").forEach(t => {
      const tds = t.querySelectorAll("td");
      tds.forEach(td => {
        if (td.dataset.raw === undefined) td.dataset.raw = td.textContent.trim();
        const info = getStretchPoints(td.dataset.raw);
        td.dataset.base = info.base;
        td._cands = info.cands;
        td.textContent = info.base;
      });

      t.style.fontSize = "";
      let fs = parseFloat(getComputedStyle(t).fontSize);
      const over = () => Array.prototype.some.call(tds, d => natural(d, d.dataset.base) > inner(d) + 0.5);
      while (fs > 8 && over()) {
        fs -= 0.5;
        t.style.fontSize = fs + "px";
      }

      tds.forEach(td => {
        const base = td.dataset.base, avail = inner(td), w0 = natural(td, base);
        const cands = td._cands || [];
        const tw = natural(td, "ب" + TAT.repeat(10) + "ب") - natural(td, "بب");
        const oneTat = tw > 0 ? tw / 10 : 3;
        let n = Math.floor((avail - w0) / oneTat);
        if (n <= 0 || !cands.length) return;
        let txt = build(base, cands, n);
        while (n > 0 && natural(td, txt) > avail - 1) {
          n--;
          txt = build(base, cands, n);
        }
        td.textContent = txt;
      });
    });
  };
})();

/* ==========================================================================
   ٣. رسم أسهم الكتاب في جداول العول والانكسار والمناسخات (.bxw)
   ========================================================================== */
const drawArrows = () => {
  document.querySelectorAll(".bxw").forEach(w => {
    const oldSvg = w.querySelector("svg.arw");
    if (oldSvg) oldSvg.remove();

    const R = w.getBoundingClientRect();
    const N = "http://www.w3.org/2000/svg";
    let d = "", dots = "";

    const P = (e, side, out) => {
      const r = e.getBoundingClientRect();
      const x0 = r.left - R.left, x1 = r.right - R.left;
      const y0 = r.top - R.top, y1 = r.bottom - R.top, cy = (y0 + y1) / 2;
      return side === "l" ? [x0 - (out ? 9 : -1), cy]
           : side === "r" ? [x1 + (out ? 9 : 1), cy]
           : side === "bl" ? [x0, y1 + 1]
           : [x0 - (out ? 9 : 0), y0];
    };

    const f = w.querySelector('[data-arw="from"]');
    const t = w.querySelector('[data-arw="to"]');
    if (f && t) {
      const a = f.getBoundingClientRect(), b = t.getBoundingClientRect();
      const fx = a.left - R.left - 9, fy = a.top - R.top + a.height / 2;
      const tx = b.right - R.left + 1, ty = b.top - R.top + b.height / 2;
      const vx = Math.max(tx + 10, Math.min(fx - 18, (tx + fx) / 2));
      d += `<path d="M${fx} ${fy}H${vx}V${ty}H${tx}" fill="none" stroke="#c0504d" stroke-width="1.3" marker-end="url(#ah)"/>`;
      dots += `<circle cx="${fx}" cy="${fy}" r="3.6" fill="#c0504d"/>`;
    }

    if (w.dataset.arws) {
      try {
        JSON.parse(w.dataset.arws).forEach(a => {
          const fe = w.querySelector("#" + a.f), te = w.querySelector("#" + a.t);
          if (!fe || !te) return;
          const p = P(fe, a.fa || "l", true), q = P(te, a.ta || "r", false);
          d += `<path d="M${p[0]} ${p[1]}L${q[0]} ${q[1]}" fill="none" stroke="#c0504d" stroke-width="1.2" marker-end="url(#ah)"/>`;
          dots += `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="#c0504d"/>`;
        });
      } catch (_) {}
    }

    if (!d) return;
    const s = document.createElementNS(N, "svg");
    s.setAttribute("class", "arw");
    s.innerHTML = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c0504d"/></marker></defs>${d}${dots}`;
    w.appendChild(s);
  });
};

/* ==========================================================================
   ٤. ضبط أحجام الأسماء والتخطيط العام والاحتواء التلقائي لصفحات الشرح
   ========================================================================== */
   const fitNm = () => {
    document.querySelectorAll(".ec .nm").forEach(e => {
      let z = 14;
      e.style.fontSize = z + "px";
      while (e.scrollWidth > e.clientWidth && z > 8) {
        z -= 0.5;
        e.style.fontSize = z + "px";
      }
    });
  };

const dedupeNavBoxes = () => {
  document.querySelectorAll(".pg").forEach(pg => {
    const navBoxes = Array.from(pg.querySelectorAll("div")).filter(d =>
      d.children.length === 1 &&
      d.firstElementChild.tagName === "BUTTON" &&
      d.textContent.includes("الانتقال إلى التدريب")
    );
    navBoxes.slice(1).forEach(d => d.remove());
  });
};

const bookPageFit = (function () {
  let zoomMode = "fit";
  let zoomFactor = 1;
  let initialized = false;

  function initPages() {
    if (initialized) return;
    initialized = true;

    const vp = document.querySelector('meta[name="viewport"]');
    if (vp) {
      vp.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover");
    }

    document.querySelectorAll("section.pg").forEach(pg => {
      const isWideMunasakhat = !!pg.querySelector(".sw15");
      if (!isWideMunasakhat && pg.querySelector(".eg, .qz-wrap, [data-chk], .ec")) return;

      pg.classList.add("book-pg");
      if (isWideMunasakhat && pg.querySelector(".ec")) {
        pg.classList.add("fit-w");
      }

      if (!pg.parentElement.classList.contains("pg-stage")) {
        const stage = document.createElement("div");
        stage.className = "pg-stage";
        pg.parentNode.insertBefore(stage, pg);
        stage.appendChild(pg);
      }

      pg.addEventListener("dblclick", e => {
        if (e.target.closest("a, button, input")) return;
        zoomMode = (zoomMode === "fit" && zoomFactor === 1) ? "width" : "fit";
        zoomFactor = 1;
        updateCtrlUI();
        applyScale();
      });
    });

    if (document.querySelector(".pg.book-pg") && !document.getElementById("zoom-ctrl")) {
      const ctrl = document.createElement("div");
      ctrl.id = "zoom-ctrl";
      ctrl.innerHTML = `
        <button type="button" data-z="out" title="تصغير">➖</button>
        <button type="button" data-z="fit" class="active" title="إظهار الصفحة كاملة">صفحة كاملة</button>
        <button type="button" data-z="in" title="تكبير">➕</button>
      `;
      document.body.appendChild(ctrl);

      ctrl.addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const act = btn.dataset.z;
        if (act === "fit") { zoomMode = "fit"; zoomFactor = 1; }
        else if (act === "in") zoomFactor = Math.min(2.2, +(zoomFactor + 0.15).toFixed(2));
        else if (act === "out") zoomFactor = Math.max(0.6, +(zoomFactor - 0.15).toFixed(2));
        updateCtrlUI();
        applyScale();
      });
    }
  }

  function updateCtrlUI() {
    const fitBtn = document.querySelector('#zoom-ctrl button[data-z="fit"]');
    if (!fitBtn) return;
    const isDefaultFit = zoomMode === "fit" && zoomFactor === 1;
    fitBtn.classList.toggle("active", isDefaultFit);
    fitBtn.textContent = isDefaultFit ? "صفحة كاملة" : `احتواء (${ar(Math.round(zoomFactor * 100))}٪)`;
  }

  function resetScale() {
    initPages();
    document.querySelectorAll(".pg.book-pg").forEach(pg => {
      pg.style.transform = "none";
      if (pg.parentElement && pg.parentElement.classList.contains("pg-stage")) {
        pg.parentElement.style.height = "auto";
      }
    });
  }

  function applyScale() {
    const availW = document.documentElement.clientWidth - 20;
    const availH = window.innerHeight - 24;

    document.querySelectorAll(".pg.book-pg").forEach(pg => {
      const stage = pg.parentElement;
      const naturalW = pg.offsetWidth || 680;
      const naturalH = pg.offsetHeight || 930;

      const useWidthFit = zoomMode === "width" || pg.classList.contains("fit-w");
      const baseScale = useWidthFit
        ? Math.min(availW / naturalW, 1.15)
        : Math.min(availW / naturalW, availH / naturalH, 1.1);

      const finalScale = Math.max(0.35, Math.min(2.2, baseScale * zoomFactor));
      pg.style.transform = `scale(${finalScale})`;
      pg.classList.toggle("is-zoomed", finalScale > baseScale + 0.05 || zoomMode === "width");

      if (stage && stage.classList.contains("pg-stage")) {
        stage.style.height = Math.ceil(naturalH * finalScale) + "px";
        stage.style.overflowX = (naturalW * finalScale > availW + 4) ? "auto" : "hidden";
      }
    });
  }

  return { resetScale, applyScale };
})();

const refreshLayout = () => {
  bookPageFit.resetScale();
  fitNm();
  pmLayout();
  drawArrows();
  dedupeNavBoxes();
  bookPageFit.applyScale();
};

let _resizeTimer;
refreshLayout();
window.addEventListener("load", refreshLayout);
window.addEventListener("resize", () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => requestAnimationFrame(refreshLayout), 120);
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    requestAnimationFrame(refreshLayout);
    setTimeout(refreshLayout, 800);
  });
}

/* ==========================================================================
   ٥. نظام دمج الخلايا العمودي ولوحة مفاتيح الفروض (#kp) والتنقل بالأسهم
   ========================================================================== */
let ki = null;
const kp = document.getElementById("kp");
const mergeErrCount = {};

function getMiRows(table) {
  return Array.from(table.querySelectorAll("tr"))
    .map(tr => ({ tr, td: tr.querySelector("td:has(.mi)") }))
    .filter(x => x.td);
}

function mergeDown(cell) {
  if (!cell) return;
  const td = cell.closest("td");
  const table = td && td.closest("table");
  if (!table) return;
  const rows = getMiRows(table);
  const idx = rows.findIndex(r => r.td === td);
  if (idx === -1) return;

  const span = td.rowSpan || 1;
  const nextRow = rows[idx + span];
  if (!nextRow) return;

  const nextTd = nextRow.td;
  const nextSpan = nextTd.rowSpan || 1;
  const nextMi = nextTd.querySelector(".mi");
  if (nextMi) {
    nextMi.innerHTML = "";
    delete nextMi.dataset.v;
    nextMi.style.outline = "";
  }

  nextTd.style.display = "none";
  nextTd.dataset.mergedInto = idx;
  td.rowSpan = span + nextSpan;

  const prevList = td.dataset.mergedRows ? td.dataset.mergedRows.split(",").map(Number) : [idx];
  const nextList = nextTd.dataset.mergedRows ? nextTd.dataset.mergedRows.split(",").map(Number) : [idx + span];
  td.dataset.mergedRows = [...prevList, ...nextList].join(",");
}

function unmergeCell(cell) {
  if (!cell) return;
  const td = cell.closest("td");
  const table = td && td.closest("table");
  const span = td ? (td.rowSpan || 1) : 1;
  if (!table || span <= 1) return;

  const rows = getMiRows(table);
  const idx = rows.findIndex(r => r.td === td);

  for (let i = idx + 1; i < idx + span; i++) {
    if (rows[i]) {
      rows[i].td.style.display = "";
      delete rows[i].td.dataset.mergedInto;
      rows[i].td.rowSpan = 1;
      delete rows[i].td.dataset.mergedRows;
    }
  }
  td.rowSpan = 1;
  delete td.dataset.mergedRows;
}

function checkMandatoryMerge(g, i, item, table, started) {
  const rows = getMiRows(table);
  const required = item.merge || [];
  const actual = [];
  rows.forEach((r, idx) => {
    if (r.td.style.display !== "none" && (r.td.rowSpan || 1) > 1) {
      const grp = [];
      for (let k = 0; k < r.td.rowSpan; k++) grp.push(idx + k);
      actual.push(grp.join(","));
    }
  });
  const expected = required.map(grp => grp.join(","));
  const ok = actual.length === expected.length && expected.every(e => actual.includes(e));

  if (!ok && started) {
    required.flat().forEach(rIdx => {
      const mi = rows[rIdx] && rows[rIdx].td.querySelector(".mi");
      if (mi) {
        mi.style.outlineOffset = "-2px";
        mi.style.outline = "2px solid #c0392b";
      }
    });
  }
  return ok;
}

/* ===== نظام دمج وفك دمج خانات السهام (قابل للسحب والتحريك) ===== */
let si = null;
const kpS = document.createElement("div");
kpS.id = "kp-s";
kpS.hidden = true;
kpS.innerHTML = `
  <span class="kp-drag" title="اسحب لتحريك الشريط" style="cursor:grab;padding:0 6px;user-select:none;touch-action:none;font-size:16px;color:#546e7a">⠿</span>
  <button type="button" class="kp-merge" data-a="merge-s">دمج السهام ↕</button>
  <button type="button" class="kp-unmerge" data-a="unmerge-s">فك ⤢</button>
  <button type="button" data-a="close-s" style="padding:4px 8px;border:none;background:transparent;color:#666;cursor:pointer;font-weight:700">✕</button>
`;
document.body.appendChild(kpS);

/* تفعيل السحب والتحريك (ماوس + لمس) */
(function makeDraggable(bar) {
  const handle = bar.querySelector(".kp-drag");
  let dragging = false, startX = 0, startY = 0, origLeft = 0, origTop = 0;

  handle.addEventListener("pointerdown", e => {
    e.preventDefault();
    dragging = true;
    const rect = bar.getBoundingClientRect();
    bar.style.left = rect.left + "px";
    bar.style.top = rect.top + "px";
    bar.style.right = "auto";
    bar.style.bottom = "auto";
    bar.style.transform = "none";
    startX = e.clientX;
    startY = e.clientY;
    origLeft = rect.left;
    origTop = rect.top;
    handle.setPointerCapture(e.pointerId);
    handle.style.cursor = "grabbing";
  });

  handle.addEventListener("pointermove", e => {
    if (!dragging) return;
    const maxL = window.innerWidth - bar.offsetWidth - 6;
    const maxT = window.innerHeight - bar.offsetHeight - 6;
    const newL = Math.max(6, Math.min(maxL, origLeft + (e.clientX - startX)));
    const newT = Math.max(6, Math.min(maxT, origTop + (e.clientY - startY)));
    bar.style.left = newL + "px";
    bar.style.top = newT + "px";
  });

  const stop = () => { dragging = false; handle.style.cursor = "grab"; };
  handle.addEventListener("pointerup", stop);
  handle.addEventListener("pointercancel", stop);
})(kpS);

kpS.addEventListener("pointerdown", e => {
  if (!e.target.closest(".kp-drag")) e.preventDefault();
});
kpS.onclick = e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.a === "close-s") { kpS.hidden = true; return; }
  if (!si) return;
  if (b.dataset.a === "merge-s") mergeDownS(si);
  if (b.dataset.a === "unmerge-s") unmergeCellS(si);
};

function getShareRows(table, prefix = "s") {
  const re = new RegExp("^" + prefix + "\\d+$");
  return Array.from(table.querySelectorAll("tr"))
    .map(tr => {
      const inp = Array.from(tr.querySelectorAll("input[data-k]")).find(el => re.test(el.dataset.k));
      return inp ? { tr, td: inp.closest("td"), inp } : null;
    })
    .filter(Boolean);
}

function mergeDownS(inp) {
  if (!inp) return;
  const td = inp.closest("td");
  const table = td && td.closest("table");
  if (!table) return;
  const prefix = (inp.dataset.k || "s")[0];
  const rows = getShareRows(table, prefix);
  const idx = rows.findIndex(r => r.td === td);
  if (idx === -1) return;

  const span = td.rowSpan || 1;
  const nextRow = rows[idx + span];
  if (!nextRow) return;

  const nextTd = nextRow.td;
  const nextSpan = nextTd.rowSpan || 1;
  if (nextRow.inp) {
    nextRow.inp.value = "";
    nextRow.inp.style.outline = "";
  }

  nextTd.style.display = "none";
  nextTd.dataset.mergedInto = idx;
  td.rowSpan = span + nextSpan;
}

function unmergeCellS(inp) {
  if (!inp) return;
  const td = inp.closest("td");
  const table = td && td.closest("table");
  const span = td ? (td.rowSpan || 1) : 1;
  if (!table || span <= 1) return;

  const prefix = (inp.dataset.k || "s")[0];
  const rows = getShareRows(table, prefix);
  const idx = rows.findIndex(r => r.td === td);

  for (let i = idx + 1; i < idx + span; i++) {
    if (rows[i]) {
      rows[i].td.style.display = "";
      delete rows[i].td.dataset.mergedInto;
      rows[i].td.rowSpan = 1;
    }
  }
  td.rowSpan = 1;
}

function checkMandatoryMergeS(g, i, item, table, started) {
  const rows = getShareRows(table);
  const required = item.mergeS || [];
  const actual = [];
  rows.forEach((r, idx) => {
    if (r.td.style.display !== "none" && (r.td.rowSpan || 1) > 1) {
      const grp = [];
      for (let k = 0; k < r.td.rowSpan; k++) grp.push(idx + k);
      actual.push(grp.join(","));
    }
  });
  const expected = required.map(grp => grp.join(","));
  const ok = actual.length === expected.length && expected.every(e => actual.includes(e));

  if (!ok && started) {
    required.flat().forEach(rIdx => {
      if (rows[rIdx] && rows[rIdx].inp) {
        rows[rIdx].inp.style.outlineOffset = "-2px";
        rows[rIdx].inp.style.outline = "2px solid #c0392b";
      }
    });
  }
  return ok;
}

/* إظهار الشريط المصغر عند التركيز على خانة سهم أو محفوظ */
document.addEventListener("focusin", e => {
  const t = e.target;
  if (t.tagName === "INPUT" && /^[sh]\d+$/.test(t.dataset.k || "")) {
    si = t;
    kpS.hidden = false;
  } else if (!kpS.contains(t)) {
    si = null;
    kpS.hidden = true;
  }
});

let kpOpenedAt = 0;

const closeKp = () => {
  if (!kp) return;
  kp.hidden = true;
  if (ki && document.activeElement === ki) ki.blur();
  ki = null;
  document.body.style.paddingBottom = "";
};

const showCard = el => requestAnimationFrame(() => {
  const c = el.closest(".ec") || el;
  const r = c.getBoundingClientRect();
  const kpH = (kp && !kp.hidden) ? kp.offsetHeight : 0;
  const vh = (window.visualViewport ? visualViewport.height : innerHeight) - kpH;
  const m = 10;
  if (r.top < m || r.bottom > vh - m) {
    const d = r.height > vh - 2 * m ? r.top - m : r.top - (vh - r.height) / 2;
    scrollBy({ top: d, behavior: "smooth" });
  }
});

const openKpFor = el => {
  if (!kp || !el) return;
  ki = el;
  kpOpenedAt = Date.now();
  kp.hidden = false;
  document.body.style.paddingBottom = (kp.offsetHeight + 24) + "px";
  showCard(el);
};

const moveToNextMi = currentEl => {
  const card = currentEl.closest(".ec");
  if (card) {
    const cardMis = Array.from(card.querySelectorAll(".mi")).filter(el => {
      const td = el.closest("td");
      return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
    });
    const idxInCard = cardMis.indexOf(currentEl);
    if (idxInCard > -1 && idxInCard < cardMis.length - 1) {
      const nextMi = cardMis[idxInCard + 1];
      if (!nextMi.hasAttribute("tabindex")) nextMi.tabIndex = 0;
      kpOpenedAt = Date.now();
      nextMi.focus();
      openKpFor(nextMi);
      return;
    }
    const firstInput = card.querySelector('input[data-k="t"]:not(:disabled), input:not(:disabled)');
    if (firstInput) {
      closeKp();
      firstInput.focus();
      firstInput.select();
      return;
    }
  }

  const scope = currentEl.closest(".eg") || currentEl.closest("section.pg") || document;
  const list = Array.from(scope.querySelectorAll(".mi")).filter(el => {
    const td = el.closest("td");
    return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
  });
  if (!list.length) return;
  const idx = list.indexOf(currentEl);
  const nextEl = list[(idx + 1) % list.length];
  if (nextEl) {
    if (!nextEl.hasAttribute("tabindex")) nextEl.tabIndex = 0;
    kpOpenedAt = Date.now();
    nextEl.focus();
    openKpFor(nextEl);
  }
};

if (kp) {
  kp.hidden = true;
  kp.innerHTML =
    ["1/2", "1/3", "1/4", "1/6", "1/8", "2/3", "1/3ب", "1/6+ب", "مقاسمة"]
      .map(v => `<button type="button" class="w" data-v="${v}">${MKV[v]}</button>`).join("") +
    ["ع", "ب", "م", "غ", "ر"]
      .map(v => `<button type="button" data-v="${v}">${v}</button>`).join("") +
    `<button type="button" data-a="next" title="الانتقال للخانة التالية">التالي ◄</button>` +
    `<button type="button" class="kp-merge" data-a="merge">دمج ↕</button>` +
    `<button type="button" class="kp-unmerge" data-a="unmerge">فك ⤢</button>` +
    `<button type="button" data-a="d">⌫</button>` +
    `<button type="button" data-a="x">تصحيح</button>`;

  kp.addEventListener("pointerdown", e => e.preventDefault());
  kp.onclick = e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.a === "x") {
      const g = ki && ki.dataset.g;
      closeKp();
      if (g) {
        const chkBtn = document.querySelector(`[data-chk="${g}"]`);
        if (chkBtn) chkBtn.click();
      }
      return;
    }
    if (!ki) return;
    if (b.dataset.a === "next") return moveToNextMi(ki);
    if (b.dataset.a === "merge") return mergeDown(ki);
    if (b.dataset.a === "unmerge") return unmergeCell(ki);
    if (b.dataset.a === "d") {
      ki.innerHTML = "";
      delete ki.dataset.v;
      ki.style.outline = "";
      return;
    }
    ki.innerHTML = MKV[b.dataset.v] || b.dataset.v;
    ki.dataset.v = b.dataset.v;
    ki.style.outline = "";
  };
}

document.addEventListener("focusin", e => {
  const t = e.target;
  if (t && t.classList && t.classList.contains("mi") && kp) {
    openKpFor(t);
  } else if (!kp || !kp.contains(t)) {
    closeKp();
  }
});

document.addEventListener("click", e => {
  const miEl = e.target.closest && e.target.closest(".mi");
  if (miEl && kp) {
    miEl.focus();
    openKpFor(miEl);
    return;
  }
  if (kp && !kp.hidden && !kp.contains(e.target)) {
    closeKp();
  }
});

/* إخفاء الكيبورد تلقائياً عند التمرير بعيداً عن التدريب إلى صفحات الشرح */
window.addEventListener("scroll", () => {
  if (!kp || kp.hidden || !ki) return;
  if (Date.now() - kpOpenedAt < 650) return;
  const box = ki.closest(".ec") || ki;
  const r = box.getBoundingClientRect();
  const visibleBottom = window.innerHeight - kp.offsetHeight;
  if (r.bottom < 0 || r.top > visibleBottom) {
    closeKp();
  }
}, { passive: true });

document.addEventListener("input", e => {
  const t = e.target;
  if (t.tagName === "INPUT") {
    const p = t.selectionStart;
    t.value = ar(t.value);
    try { t.setSelectionRange(p, p); } catch (_) {}
  }
});

document.addEventListener("keydown", e => {
  const keys = ["Enter", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (!keys.includes(e.key) || (e.key === "Tab" && e.shiftKey)) return;
  const t = e.target;
  if (!t || t.tagName !== "INPUT") return;

  const table = t.closest("table");
  if (!table) return;
  e.preventDefault();

  const allInputs = Array.from(table.querySelectorAll("input:not(:disabled)"));
  const curRect = t.getBoundingClientRect();
  const cx = (curRect.left + curRect.right) / 2;
  const cy = (curRect.top + curRect.bottom) / 2;
  const tolX = curRect.width * 0.6;
  const tolY = curRect.height * 0.6;

  let target = null;

  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === "Tab") {
    const below = allInputs
      .filter(el => el !== t && ((el.getBoundingClientRect().top + el.getBoundingClientRect().bottom) / 2) > cy + 4 && Math.abs(((el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2) - cx) < tolX)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    target = below[0];

    if (!target) {
      const nextCol = allInputs
        .filter(el => ((el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2) < cx - tolX)
        .sort((a, b) => {
          const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
          const dx = rb.left - ra.left;
          return Math.abs(dx) > 8 ? dx : ra.top - rb.top;
        });
      target = nextCol[0];
    }
  } else if (e.key === "ArrowUp") {
    const above = allInputs
      .filter(el => el !== t && ((el.getBoundingClientRect().top + el.getBoundingClientRect().bottom) / 2) < cy - 4 && Math.abs(((el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2) - cx) < tolX)
      .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top);
    target = above[0];
  } else if (e.key === "ArrowLeft") {
    const lefts = allInputs
      .filter(el => el !== t && ((el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2) < cx - 4)
      .sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        const sameRowA = Math.abs(((ra.top + ra.bottom) / 2) - cy) < tolY ? 0 : 1;
        const sameRowB = Math.abs(((rb.top + rb.bottom) / 2) - cy) < tolY ? 0 : 1;
        if (sameRowA !== sameRowB) return sameRowA - sameRowB;
        const dx = rb.left - ra.left;
        return Math.abs(dx) > 8 ? dx : Math.abs(((ra.top + ra.bottom) / 2) - cy) - Math.abs(((rb.top + rb.bottom) / 2) - cy);
      });
    target = lefts[0];
  } else if (e.key === "ArrowRight") {
    const rights = allInputs
      .filter(el => el !== t && ((el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2) > cx + 4)
      .sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        const sameRowA = Math.abs(((ra.top + ra.bottom) / 2) - cy) < tolY ? 0 : 1;
        const sameRowB = Math.abs(((rb.top + rb.bottom) / 2) - cy) < tolY ? 0 : 1;
        if (sameRowA !== sameRowB) return sameRowA - sameRowB;
        const dx = ra.left - rb.left;
        return Math.abs(dx) > 8 ? dx : Math.abs(((ra.top + ra.bottom) / 2) - cy) - Math.abs(((rb.top + rb.bottom) / 2) - cy);
      });
    target = rights[0];
  }

  if (target) {
    target.focus();
    target.select();
  } else if (e.key === "Enter" || e.key === "Tab") {
    const card = t.closest(".ec");
    const scope = card && (card.closest(".eg") || card.closest("section.pg") || document);
    if (card && scope) {
      const cards = Array.from(scope.querySelectorAll(".ec"));
      const nextCard = cards[cards.indexOf(card) + 1];
      const firstMi = nextCard && Array.from(nextCard.querySelectorAll(".mi")).find(el => {
        const td = el.closest("td");
        return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
      });
      if (firstMi) {
        e.stopImmediatePropagation();
        t.blur();
        if (!firstMi.hasAttribute("tabindex")) firstMi.tabIndex = 0;
        firstMi.focus();
        openKpFor(firstMi);
      }
    }
  }
});

/* ==========================================================================
   ٦. محرك تصحيح مسائل التمارين ([data-chk]) — مع الدمج الإلزامي وحماية الفارغ
   ========================================================================== */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-chk]");
  if (!b || typeof EXD === "undefined") return;
  const g = b.dataset.chk, L = EXD[g];
  if (!L) return;

  let ok = 0;
  L.forEach((x, i) => {
    let bad = false;
    const allInputs = Array.from(document.querySelectorAll(`[data-g="${g}"][data-i="${i}"]`));
    const started = allInputs.some(el =>
      el.matches && el.matches(".mi") ? !!(el.dataset.v || "") : String(el.value || "").trim() !== ""
    );

    const q = k => document.querySelector(`[data-g="${g}"][data-i="${i}"][data-k="${k}"]`);
    const qm = k => {
      for (let j = k; j >= 0; j--) {
        const el = q("m" + j);
        if (el && el.closest("td")?.style.display !== "none") return el;
      }
      return null;
    };

    const qsFn = k => {
      for (let j = k; j >= 0; j--) {
        const el = q("s" + j);
        if (el && el.closest("td")?.style.display !== "none") return el;
      }
      return null;
    };

    const mark = (el, v) => {
      if (el && !v) {
        const empty = el.matches && el.matches(".mi") ? !(el.dataset.v || "") : !String(el.value || "").trim();
        if (!empty || started) bad = true;
        el.style.outlineOffset = "-2px";
        el.style.transition = "";
        el.style.outline = "2px solid #c0392b";
        if (empty && !started) {
          setTimeout(() => {
            el.style.transition = "outline-color .6s";
            el.style.outlineColor = "transparent";
            setTimeout(() => { el.style.outline = ""; el.style.transition = ""; }, 650);
          }, 900);
        }
      }
      return v;
    };

    allInputs.forEach(el => { el.style.outline = ""; });
    const ns = v => String(v || "").replace(/\s/g, "");
    const norm = s => String(s || "").trim().replace(/ـ/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/(^|\s)ال/g, "$1").replace(/شقيقه|شقيق/g, "ش").replace(/\s+/g, "");

    /* ١. فحص أصل/جامعة المسألة النهائية (t) */
    const tEl = q("t");
    let good = mark(tEl, !!tEl && String(tEl.value || "").trim() !== "" && nv(tEl.value) === x.t);

    /* ٢. فحص سهام وفروض الورثة النهائية (s0, s1... / m0, m1...) */
    (x.hs || []).forEach(([n, s, m], k) => {
      if (s !== null && s !== undefined) {
        const qs = qsFn(k);
        good = mark(qs, !!qs && String(qs.value || "").trim() !== "" && nv(qs.value) === s) && good;
      }
      if (m) {
        const mc = qm(k);
        good = mark(mc, !!mc && ns(mc.dataset.v) === ns(m)) && good;
      }
    });

    const qhFn = k => {
      for (let j = k; j >= 0; j--) {
        const el = q("h" + j);
        if (el && el.closest("td")?.style.display !== "none") return el;
      }
      return null;
    };

    /* ٣. فحص الخانات الفرعية الإضافية (x.c) */
    Object.entries(x.c || {}).forEach(([key, val]) => {
      const el = /^h(\d+)$/.test(key) ? qhFn(parseInt(RegExp.$1, 10)) : q(key);
      const raw = el ? String(el.value || "").trim() : "";
      if (typeof val === "string") {
        const uVal = norm(raw);
        const okStr = val.split("|").some(opt =>
          opt === "" ? raw === "" : (uVal !== "" && (uVal === norm(opt) || (opt === "0" && nv(raw) === 0)))
        );
        good = mark(el, okStr) && good;
      } else if (val === 0) {
        good = mark(el, raw === "" || nv(raw) === 0) && good;
      } else {
        good = mark(el, raw !== "" && nv(raw) === val) && good;
      }
    });

    /* ٤. فحص الدمج الإلزامي للفروض والسهام */
    const table = tEl && tEl.closest("table");
    const card = tEl && tEl.closest(".ec");
    if (table && (started || (x.merge && x.merge.length) || (x.mergeS && x.mergeS.length))) {
      const mergeOk = checkMandatoryMerge(g, i, x, table, card, started);
      const mergeSOk = checkMandatoryMergeS(g, i, x, table, card, started);
      if (!mergeOk || !mergeSOk) {
        good = false;
        if (started) bad = true;
      }
    }

    /* ٥. حماية شاملة: أي خانة غير مسجلة في الحل لو كُتب فيها شيء تُعد خطأ */
    allInputs.forEach(el => {
      const k = el.dataset.k;
      if (!k || k === "t" || (x.c && k in x.c)) return;
      if (/^s(\d+)$/.test(k)) {
        const idx = parseInt(RegExp.$1, 10);
        if (x.hs && x.hs[idx] && x.hs[idx][1] !== null && x.hs[idx][1] !== undefined) return;
      }
      if (/^m(\d+)$/.test(k)) {
        const idx = parseInt(RegExp.$1, 10);
        if (x.hs && x.hs[idx] && x.hs[idx][2]) return;
      }
      const hasVal = el.matches && el.matches(".mi") ? !!(el.dataset.v || "") : String(el.value || "").trim() !== "";
      if (hasVal) good = mark(el, false) && good;
    });

    if (good) ok++;

    const mm = document.getElementById(g + "-" + i);
    if (mm) {
      clearTimeout(mm._t);
      mm.style.transition = "";
      mm.style.opacity = "";
      mm.textContent = good ? "✓" : "✗";
      mm.className = "mm " + (good ? "ok" : "no");
      if (!good && !bad) {
        mm._t = setTimeout(() => {
          mm.style.transition = "opacity .6s";
          mm.style.opacity = "0";
          mm._t = setTimeout(() => {
            mm.textContent = "";
            mm.className = "mm";
            mm.style.opacity = "";
            mm.style.transition = "";
          }, 650);
        }, 900);
      }
    }
  });

  const r = document.getElementById(g + "-r");
  if (r) {
    r.hidden = false;
    r.className = "rs " + (ok === L.length ? "ok" : "no");
    r.textContent = ok === L.length
      ? "أحسنت! كل المسائل صحيحة."
      : `الصحيح: ${ar(ok)} من ${ar(L.length)} — صحّح الخانات الحمراء ثم أعد التصحيح.`;
  }
});

/* ==========================================================================
   ٧. تدريبات الباب الأول (اختيارات + صح وخطأ)
   ========================================================================== */
(function () {
  "use strict";
  const mcqBox = document.getElementById("qz-mcq");
  const tfBox  = document.getElementById("qz-tf");
  if (!mcqBox || !tfBox) return;

  const STORE_KEY = "miras_quiz_bab1_v1";
  const QUESTIONS = [
    { t: "mc", q: "العلم بالقواعد الفقهية والحسابية التي يُتوصل بها لمعرفة نصيب كل وارث من تركة مورثه هو تعريف:", o: ["علم الميراث", "علم الوصايا", "علم الحساب", "علم النسب"], a: 0 },
    { t: "mc", q: "الحقوق المتعلقة بالتركة عند الحنابلة مجموعة بالترتيب في كلمة:", o: ["تدوم", "تمدو", "مودت", "دومت"], a: 0 },
    { t: "mc", q: "أول الحقوق المتعلقة بالتركة عند الحنابلة هو:", o: ["سداد الديون المرسلة", "تنفيذ الوصية", "تجهيز الميت", "تقسيم الميراث"], a: 2 },
    { t: "mc", q: "تجوز الوصية من التركة لغير وارث في حدود:", o: ["النصف فأقل", "الثلث فأقل", "الربع فأقل", "الثلثين فأقل"], a: 1 },
    { t: "mc", q: "عدد أركان الميراث هو:", o: ["ركنان", "ثلاثة أركان (وارث ومورث وموروث)", "أربعة أركان", "خمسة أركان"], a: 1 },
    { t: "mc", q: "عدد شروط الإرث هو:", o: ["شرطان", "ثلاثة شروط", "أربعة شروط", "ستة شروط"], a: 1 },
    { t: "mc", q: "أسباب الميراث المتفق عليها والتي نظمها الرحبي هي:", o: ["النكاح والولاء والنسب", "النكاح والرضاع والنسب", "النسب والتبني والولاء", "النكاح والجوار والنسب"], a: 0 },
    { t: "mc", q: "موانع الإرث التي تمنع الشخص من الميراث هي:", o: ["الرق والقتل واختلاف الدين", "المرض والسفر والفقر", "الصغر والجنون والعته", "الرضاع والتبني والمصاهرة"], a: 0 },
    { t: "mc", q: "عدد الوارثين من الرجال بالاختصار (الإجمال) وبالبسط (التفصيل) هو:", o: ["سبعة بالإجمال وعشرة بالبسط", "عشرة بالإجمال وخمسة عشر بالبسط", "اثنا عشر بالإجمال وعشرون بالبسط", "ثمانية بالإجمال واثنا عشر بالبسط"], a: 1 },
    { t: "mc", q: "عدد الوارثات من النساء بالاختصار (الإجمال) وبالبسط (التفصيل) هو:", o: ["خمس بالإجمال وثمان بالبسط", "سبع بالإجمال وعشر بالبسط", "عشر بالإجمال وخمس عشرة بالبسط", "ست بالإجمال وتسع بالبسط"], a: 1 },
    { t: "mc", q: "الورثة الذين يرثون بالفرض والتعصيب معاً (اثنان) هما:", o: ["الابن وابن الابن وإن نزل", "الزوج والأخ لأم", "الأب وأبو الأب وإن علا", "الأخ الشقيق والأخ لأب"], a: 2 },
    { t: "mc", q: "عدد الفروض المقدرة في كتاب الله تعالى:", o: ["أربعة فروض", "خمسة فروض", "ستة فروض", "سبعة فروض"], a: 2 },
    { t: "mc", q: "أصول المسائل المتفق عليها سبعة، وهي:", o: ["(٢، ٣، ٤، ٦، ٨، ١٢، ٢٤)", "(١، ٢، ٣، ٤، ٥، ٦، ٧)", "(٢، ٤، ٦، ٨، ١٠، ١٢، ١٦)", "(٣، ٦، ٩، ١٢، ١٥، ١٨، ٢٤)"], a: 0 },
    { t: "mc", q: "إذا اجتمع في المسألة فرضان مقاماهما متداخلان مثل الربع (١/٤) والثمن (١/٨) أو الثلث (١/٣) والسدس (١/٦)، فإن أصل المسألة يكون من:", o: ["أصغر المقامات", "أكبر المقامات", "حاصل ضرب المقامين", "مجموع المقامين"], a: 1 },
    { t: "mc", q: "إذا اجتمع في المسألة الربع (١/٤) والسدس (١/٦) فالمقامان متوافقان في النصف، فيكون أصل المسألة من:", o: ["٦", "٨", "١٢", "٢٤"], a: 2 },
    { t: "tf", q: "الصحابي الجليل الذي قال عنه النبي ﷺ «أفرضكم زيد» هو زيد بن ثابت رضي الله عنه.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "ترث الزوجة من زوجها ويرث الزوج من زوجته بمجرد عقد الزوجية الصحيح ولو لم يحصل دخول ولا خلوة.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "القاتل يرث من مقتوله إذا كان قريباً له من الدرجة الأولى.", o: ["صح", "خطأ"], a: 1 },
    { t: "tf", q: "من اتصف بمانع من موانع الإرث (كالرق أو الكفر) فوجوده كعدمه، فلا يرث ولا يورث ولا يحجب غيره.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "الكافر إذا أسلم قبل تقسيم التركة فإنه يرث عند الحنابلة ترغيباً له في الإسلام.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "كل من يتصل بالميت بالرضاع أو بالتبني أو الربيبة فإنه لا يرث.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "ولد الزنا وولد الملاعنة يرث من أمه وهي ترثه، ولا يُنسب لأب.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "عم الميت وعم أبي الميت وعم جد الميت وأبناؤهم جميعهم عصبة بالنسب ومقدمون على المعتق أو المعتقة.", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "الذين يرثون بالفرض المحض فقط هم اثنا عشر وارثاً.", o: ["صح", "خطأ"], a: 1 },
    { t: "tf", q: "اللواتي يرثن تارة بالفرض وتارة بالتعصيب هن أربع: (البنت، وبنت الابن، والأخت الشقيقة، والأخت لأب).", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "إذا وُجد في المسألة فرض واحد فقط كالثمن (١/٨)، فإن أصل المسألة يكون من مقام ذلك الكسر وهو (٨).", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "إذا كانت مقامات الكسور متماثلة مثل نصفين (١/٢ و ١/٢)، نضرب المقامين في بعضهما فيكون الأصل من (٤).", o: ["صح", "خطأ"], a: 1 },
    { t: "tf", q: "إذا اجتمع في المسألة الثمن (١/٨) والسدس (١/٦) أو الثمن (١/٨) والثلثان (٢/٣)، فإن أصل المسألة يكون من (٢٤).", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "إذا اجتمع في المسألة النصف (١/٢) مع الثلث (١/٣) أو الثلثين (٢/٣) أو السدس (١/٦)، فإن أصل المسألة يكون من (٦).", o: ["صح", "خطأ"], a: 0 },
    { t: "tf", q: "عند الحنفية والحنابلة لا يرث بيت المال، وإنما يذهب المال عند عدم أصحاب الفروض والعصبات إلى ذوي الأرحام.", o: ["صح", "خطأ"], a: 0 }
  ];

  let userAns = {};
  try { userAns = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { userAns = {}; }

  QUESTIONS.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "qz-card";
    card.id = "qcard-" + idx;

    const qTitle = document.createElement("div");
    qTitle.className = "qz-q";
    qTitle.innerHTML = `<span class="qnum">${ar(idx + 1)} -</span> ${item.q}`;
    card.appendChild(qTitle);

    const opts = document.createElement("div");
    opts.className = "qz-opts" + (item.t === "tf" ? " tf" : "");

    const st = document.createElement("div");
    st.className = "qz-st";
    st.id = "qst-" + idx;

    item.o.forEach((optText, oIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "qz-opt" + (userAns[idx] === oIdx ? " sel" : "");
      btn.textContent = optText;
      btn.onclick = () => {
        userAns[idx] = oIdx;
        try { localStorage.setItem(STORE_KEY, JSON.stringify(userAns)); } catch (_) {}
        opts.querySelectorAll(".qz-opt").forEach((b, bi) => b.classList.toggle("sel", bi === oIdx));
        card.classList.remove("ok", "no");
        st.textContent = "";
        st.className = "qz-st";
      };
      opts.appendChild(btn);
    });

    card.appendChild(opts);
    card.appendChild(st);
    if (item.t === "mc") mcqBox.appendChild(card);
    else tfBox.appendChild(card);
  });

  const nextBtn = document.getElementById("next-ch-btn");
  const resBox  = document.getElementById("g1-r");
  const progEl  = document.getElementById("g1-prog");
  const chkBtn  = document.getElementById("qz-chk-btn");
  const hintEl  = document.getElementById("g1-hint");

  function setGate(unlocked) {
    if (hintEl) hintEl.hidden = !!unlocked;
    try {
      if (unlocked) {
        localStorage.setItem("miras_done_1", "1");
        localStorage.setItem("miras_prog_الباب_١_المدخل", JSON.stringify({ g1: { ok: 30, total: 30, done: true } }));
      } else {
        localStorage.removeItem("miras_done_1");
        localStorage.removeItem("miras_prog_الباب_١_المدخل");
      }
    } catch (_) {}
  }

  function gradeQuiz(showFeedback) {
    let ok = 0;
    const total = QUESTIONS.length;
    QUESTIONS.forEach((item, idx) => {
      const card = document.getElementById("qcard-" + idx);
      const st   = document.getElementById("qst-" + idx);
      const ans  = userAns[idx];
      const isRight = ans === item.a;
      if (isRight) ok++;
      if (showFeedback) {
        card.classList.remove("ok", "no");
        card.classList.add(isRight ? "ok" : "no");
        st.className = "qz-st " + (isRight ? "ok" : "no");
        st.textContent = isRight
          ? "✓ إجابة صحيحة"
          : (ans === undefined ? "✗ لم تُجب عن السؤال" : "✗ إجابة خاطئة — حاول مرة أخرى");
      }
    });

    const pct = Math.round((ok * 100) / total);
    if (progEl && (showFeedback || Object.keys(userAns).length === total)) {
      progEl.querySelector(".prog-txt").textContent = `أجبت بشكل صحيح: ${ar(ok)} من ${ar(total)} — ${ar(pct)}٪`;
      progEl.querySelector(".prog-fill").style.width = pct + "%";
      progEl.classList.remove("low", "mid", "full");
      progEl.classList.add(pct === 100 ? "full" : (pct >= 50 ? "mid" : "low"));
    }

    if (showFeedback && resBox) {
      resBox.hidden = false;
      resBox.className = "rs " + (ok === total ? "ok" : "no");
      resBox.textContent = ok === total
        ? "أحسنت! أجبت عن جميع الأسئلة الثلاثين بنسبة ١٠٠٪ — فُتح لك الانتقال إلى باب أصحاب النصف."
        : `الصحيح: ${ar(ok)} من ${ar(total)} (${ar(pct)}٪) — صحّح البطاقات الحمراء للوصول إلى ١٠٠٪ وفتح الباب التالي.`;
    }
    setGate(ok === total);
  }

  if (chkBtn) chkBtn.addEventListener("click", () => gradeQuiz(true));
  if (nextBtn) nextBtn.addEventListener("click", e => { if (nextBtn.classList.contains("locked")) e.preventDefault(); });

  if (Object.keys(userAns).length === QUESTIONS.length) gradeQuiz(true);
  else setGate(false);
})();

/* ==========================================================================
   ٨. إضافة الوحدات التلقائية (٪ ، درهم ، م٢ ، ك) في جداول قسمة التركات
   ========================================================================== */
(function initAutoUnits() {
  const mapUnit = txt => {
    if (txt.includes("النسبة")) return "٪";
    if (txt.includes("المال")) return "درهم";
    if (txt.includes("المساحة")) return "م٢";
    if (txt.includes("الوزن")) return "ك";
    return "";
  };

  document.querySelectorAll("table").forEach(table => {
    const firstRow = table.querySelector("tr");
    if (!firstRow) return;

    const colUnits = {};
    let hasUnits = false;
    Array.from(firstRow.children).forEach((cell, idx) => {
      const u = mapUnit(cell.textContent || "");
      if (u) { colUnits[idx] = u; hasUnits = true; }
    });
    if (!hasUnits) return;

    Array.from(table.querySelectorAll("tr")).slice(2).forEach(tr => {
      Array.from(tr.children).forEach((td, idx) => {
        const unit = colUnits[idx];
        const inp = td.querySelector("input");
        if (!unit || !inp || td.querySelector(".u-wrap")) return;

        const wrap = document.createElement("div");
        wrap.className = "u-wrap";
        const sfx = document.createElement("span");
        sfx.className = "u-sfx";
        sfx.textContent = unit;

        inp.parentNode.insertBefore(wrap, inp);
        wrap.append(inp, sfx);

        const sync = () => {
          const v = inp.value.trim();
          wrap.classList.toggle("filled", v !== "");
          inp.style.width = v !== "" ? (v.length + 0.6) + "ch" : "100%";
        };
        wrap.addEventListener("click", () => inp.focus());
        inp.addEventListener("input", sync);
        sync();
      });
    });
  });
})();


/* انتقال زر التالي في كيبورد الجوال (أندرويد/آيفون) من آخر خانة رقمية إلى أول فرض في الشباك التالي */
(function () {
  let lastTapTime = 0;
  let lastInput = null;

  document.addEventListener("pointerdown", () => { lastTapTime = Date.now(); }, true);
  document.addEventListener("touchstart", () => { lastTapTime = Date.now(); }, { capture: true, passive: true });

  document.addEventListener("focusin", (e) => {
    const inp = e.target;
    if (!inp || inp.tagName !== "INPUT") 
      lastInput = null;
      return;

    const prevInp = lastInput;
    lastInput = inp;

    /* إذا ضغط الطالب بإصبعه مباشرة على الخانة فلا تتدخل */
    if (Date.now() - lastTapTime < 350) return;
    if (!prevInp || prevInp === inp) return;

    const prevCard = prevInp.closest(".ec");
    const curCard = inp.closest(".ec");
    if (!prevCard || !curCard || prevCard === curCard) return;

    const prevInputs = Array.from(prevCard.querySelectorAll("input:not(:disabled)")).filter(el => {
      const td = el.closest("td");
      return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
    });

    /* إذا كان الطالب في آخر خانة رقمية من الشباك السابق وانتقل عبر زر التالي في الكيبورد */
    if (prevInputs.length && prevInputs[prevInputs.length - 1] === prevInp) {
      const firstMi = Array.from(curCard.querySelectorAll(".mi")).find(el => {
        const td = el.closest("td");
        return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
      });
      if (firstMi) {
        lastInput = null;
        inp.blur();
        if (!firstMi.hasAttribute("tabindex")) firstMi.tabIndex = 0;
        setTimeout(() => {
          firstMi.focus();
          if (typeof openKpFor === "function") openKpFor(firstMi);
        }, 60);
      }
    }
  });
})();


/* ===== الحفظ والاستعادة التلقائية لخانات الجداول (الأرقام + الفروض + الدمج) ===== */
(function () {
  const pageKey = (location.pathname.split("/").pop() || "bab").replace(/\.html?$/i, "");
  const draftKey = "miras_draft_" + pageKey;

  function fieldKey(el) {
    return [el.dataset.g, el.dataset.i, el.dataset.k].join("|");
  }

  function loadDraft() {
    try { return JSON.parse(localStorage.getItem(draftKey)) || {}; } catch (e) { return {}; }
  }

  function saveDraft() {
    const data = {};
    document.querySelectorAll("input[data-g][data-i][data-k]").forEach(el => {
      const val = String(el.value || "").trim();
      if (val !== "") data[fieldKey(el)] = val;
      const td = el.closest("td");
      if (td && td.style.display !== "none" && (td.rowSpan || 1) > 1 && /^[sh]\d+$/.test(el.dataset.k || "")) {
        data["__s|" + fieldKey(el)] = td.rowSpan;
      }
    });
    document.querySelectorAll(".mi[data-g][data-i][data-k]").forEach(el => {
      const val = el.dataset.v || "";
      if (val !== "") data[fieldKey(el)] = val;
      const td = el.closest("td");
      if (td && td.style.display !== "none" && (td.rowSpan || 1) > 1) {
        data["__m|" + fieldKey(el)] = td.rowSpan;
      }
    });
    try { localStorage.setItem(draftKey, JSON.stringify(data)); } catch (e) {}
  }

  function restoreDraft() {
    const data = loadDraft();
    if (!Object.keys(data).length) return;

    /* ١. استعادة دمج خانات الفروض والسهام أولاً */
    document.querySelectorAll(".mi[data-g][data-i][data-k]").forEach(el => {
      const span = data["__m|" + fieldKey(el)];
      if (span > 1 && typeof mergeDown === "function") {
        for (let k = 1; k < span; k++) mergeDown(el);
      }
    });
    document.querySelectorAll("input[data-g][data-i][data-k]").forEach(el => {
      const span = data["__s|" + fieldKey(el)];
      if (span > 1 && typeof mergeDownS === "function") {
        for (let k = 1; k < span; k++) mergeDownS(el);
      }
    });

    /* ٢. استعادة الأرقام والفروض */
    document.querySelectorAll("input[data-g][data-i][data-k]").forEach(el => {
      const val = data[fieldKey(el)];
      if (val !== undefined) el.value = val;
    });
    document.querySelectorAll(".mi[data-g][data-i][data-k]").forEach(el => {
      const val = data[fieldKey(el)];
      if (val !== undefined) {
        el.dataset.v = val;
        el.innerHTML = (typeof MKV !== "undefined" && MKV[val]) ? MKV[val] : val;
      }
    });
  }

  /* حفظ فوري عند الكتابة في خانات الأرقام */
  document.addEventListener("input", (e) => {
    if (e.target && e.target.matches("input[data-g][data-i][data-k]")) saveDraft();
  });

  /* حفظ فوري عند الاختيار أو الدمج أو الفك من كيبورد الفروض أو شريط دمج السهام */
  document.addEventListener("click", (e) => {
    if (e.target && e.target.closest("#kp, .kp, #kp-s")) {
      setTimeout(saveDraft, 20);
    }
  });

  /* استعادة الإجابات والدمج تلقائياً عند فتح الباب */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restoreDraft);
  } else {
    restoreDraft();
  }
})();

/* تفعيل زر Enter وكتابة الحروف (ع، ب، م، غ، ر) مباشرة في العمود الأول على اللابتوب */
document.addEventListener("keydown", e => {
  if (!ki || (kp && kp.hidden)) return;

  if (["ع", "ب", "م", "غ", "ر"].includes(e.key)) {
    e.preventDefault();
    const btn = kp.querySelector(`button[data-v="${e.key}"]`);
    if (btn) btn.click();
    return;
  }

  if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    e.preventDefault();
    const tbl = ki.closest("table");
    const mis = tbl ? Array.from(tbl.querySelectorAll(".mi")).filter(el => {
      const td = el.closest("td");
      return el.offsetParent !== null && (!td || getComputedStyle(td).display !== "none");
    }) : [];

    const idx = mis.indexOf(ki);
    if (idx !== -1 && idx < mis.length - 1) {
      // الانتقال للسطر التالي في العمود الأول
      const nextMi = mis[idx + 1];
      if (!nextMi.hasAttribute("tabindex")) nextMi.tabIndex = 0;
      nextMi.focus();
      openKpFor(nextMi);
    } else if (tbl) {
      // آخر سطر في العمود الأول -> إغلاق الكيبورد والانتقال مباشرة لأول خانة في العمود الثاني (الأصل)
      closeKp();
      const firstInp = tbl.querySelector("input");
      if (firstInp) {
        firstInp.focus();
        firstInp.select();
      }
    }
  }
});


/* رفع شريط دمج السهام (#kp-s) تلقائياً فوق كيبورد الجوال */
(function () {
  if (!window.visualViewport) return;

  function keepBarAboveKeyboard() {
    const bar = document.getElementById("kp-s");
    if (!bar || bar.hidden) return;

    const vv = window.visualViewport;
    // حساب ارتفاع الكيبورد الظاهر حالياً
    const kbHeight = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));

    bar.style.top = "auto";
    bar.style.bottom = (kbHeight + 12) + "px";
  }

  window.visualViewport.addEventListener("resize", keepBarAboveKeyboard);
  window.visualViewport.addEventListener("scroll", keepBarAboveKeyboard);
  document.addEventListener("focusin", () => setTimeout(keepBarAboveKeyboard, 120));
})();

