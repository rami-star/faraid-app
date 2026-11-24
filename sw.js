const CACHE_NAME = "faraid-app-v1.0.0.4.5";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./exam.html",
  "./manifest.json",
  "./css/style.css",
  "./css/b15.css",
  "./js/script.js",
  "./js/student.js",
  "./js/progress.js",
  "./js/exam-data.js",
  "./images/cover.jpg",
  "./images/icon-192.png",
  "./images/icon-512.png",
  "./الباب_١_المدخل.html",
  "./الباب_٢_أصحاب_النصف.html",
  "./الباب_٣_أصحاب_الربع.html",
  "./الباب_٤_أصحاب_الثمن.html",
  "./الباب_٥_أصحاب_الثلثين.html",
  "./الباب_٦_أصحاب_الثلث.html",
  "./الباب_٧_أصحاب_السدس.html",
  "./الباب_٨_أحوال_الجدات.html",
  "./الباب_٩_التعصيب.html",
  "./الباب_١٠_الحجب.html",
  "./الباب_١١_العول.html",
  "./الباب_١٢_الرد.html",
  "./الباب_١٣_الانكسار_على_جنس_واحد.html",
  "./الباب_١٤_الانكسار_على_أجناس.html",
  "./الباب_١٥_المناسخات.html",
  "./الباب_١٦_قسمة_التركات.html",
  "./الباب_١٧_الخنثى_والمفقود.html",
  "./الباب_١٨_الحمل.html",
  "./الباب_١٩_الهدمى_والغرقى.html",
  "./الباب_٢٠_ذوو_الأرحام.html",
  "./الباب_٢١_المشتركة.html",
  "./الباب_٢٢_الجد_مع_الإخوة.html",
  "./الباب_٢٣_المعادة.html",
  "./الباب_٢٤_الأكدرية.html",
  "./الباب_٢٥_الوصية.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        CORE_ASSETS.map((url) => cache.add(encodeURI(url)))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(e.request, { ignoreSearch: true });
        if (cached) return cached;

        if (e.request.mode === "navigate") {
          const home = await caches.match("./index.html", { ignoreSearch: true });
          if (home) return home;
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      })
  );
});