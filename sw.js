// K·CBT Service Worker — 진짜 오프라인 시험 가능 (그림문제 포함 전체 캐싱)
const CACHE = 'koryo-cbt-v387-full';   // 관리자 회원목록 기수별 필터(슈퍼·기관 양쪽) 추가

// 핵심 파일 (즉시 캐시)
const CORE_ASSETS = ['./', './index.html', './manifest.json'];

// 그림문제 + 아이콘 — 사용자가 "오프라인 저장" 버튼을 눌렀을 때 일괄 캐시
const EXTRA_ASSETS = [
  './exam_images/q/r32am_q16_c1.jpg',
  './exam_images/q/r32am_q16_c2.jpg',
  './exam_images/q/r32am_q16_c3.jpg',
  './exam_images/q/r32am_q16_c4.jpg',
  './exam_images/q/r32am_q16_c5.jpg',
  './exam_images/q/r32am_q51.jpg',
  './exam_images/q/r32am_q52_c1.jpg',
  './exam_images/q/r32am_q52_c2.jpg',
  './exam_images/q/r32am_q52_c3.jpg',
  './exam_images/q/r32am_q52_c4.jpg',
  './exam_images/q/r32am_q52_c5.jpg',
  './exam_images/q/r32am_q54.jpg',
  './exam_images/q/r32am_q56.jpg',
  './exam_images/q/r32am_q80_c1.jpg',
  './exam_images/q/r32am_q80_c2.jpg',
  './exam_images/q/r32am_q80_c3.jpg',
  './exam_images/q/r32am_q80_c4.jpg',
  './exam_images/q/r32am_q80_c5.jpg',
  './exam_images/q/r32pm_q51.jpg',
  './exam_images/q/r32pm_q53.jpg',
  './exam_images/q/r32pm_q55.jpg',
  './exam_images/q/r32pm_q56.jpg',
  './exam_images/q/r32pm_q71.jpg',
  './exam_images/q/r32suwon_q40_c1.jpg',
  './exam_images/q/r32suwon_q40_c2.jpg',
  './exam_images/q/r32suwon_q40_c3.jpg',
  './exam_images/q/r32suwon_q40_c4.jpg',
  './exam_images/q/r32suwon_q40_c5.jpg',
  './exam_images/q/r32suwon_q46_c1.jpg',
  './exam_images/q/r32suwon_q46_c2.jpg',
  './exam_images/q/r32suwon_q46_c3.jpg',
  './exam_images/q/r32suwon_q46_c4.jpg',
  './exam_images/q/r32suwon_q46_c5.jpg',
  './exam_images/q/r32suwon_q51_c1.jpg',
  './exam_images/q/r32suwon_q51_c2.jpg',
  './exam_images/q/r32suwon_q51_c3.jpg',
  './exam_images/q/r32suwon_q51_c4.jpg',
  './exam_images/q/r32suwon_q51_c5.jpg',
  './exam_images/q/r32suwon_q53.jpg',
  './exam_images/q/r32suwon_q54.jpg',
  './exam_images/q/r32suwon_q55_c1.jpg',
  './exam_images/q/r32suwon_q55_c2.jpg',
  './exam_images/q/r32suwon_q55_c3.jpg',
  './exam_images/q/r32suwon_q55_c4.jpg',
  './exam_images/q/r32suwon_q55_c5.jpg',
  './exam_images/q/r32suwon_q56.jpg',
  './exam_images/q/r32suwon_q77_c1.jpg',
  './exam_images/q/r32suwon_q77_c2.jpg',
  './exam_images/q/r32suwon_q77_c3.jpg',
  './exam_images/q/r32suwon_q77_c4.jpg',
  './exam_images/q/r32suwon_q77_c5.jpg',
  './exam_images/q/r32suwon_q79.jpg',
  './exam_images/q/r33_q54.jpg',
  './exam_images/q/r33_q77_c1.jpg',
  './exam_images/q/r33_q77_c2.jpg',
  './exam_images/q/r33_q77_c3.jpg',
  './exam_images/q/r33_q77_c4.jpg',
  './exam_images/q/r33_q77_c5.jpg',
  './exam_images/q/r33_q78_c1.jpg',
  './exam_images/q/r33_q78_c2.jpg',
  './exam_images/q/r33_q78_c3.jpg',
  './exam_images/q/r33_q78_c4.jpg',
  './exam_images/q/r33_q78_c5.jpg',
  './exam_images/q/r33_q80_c1.jpg',
  './exam_images/q/r33_q80_c2.jpg',
  './exam_images/q/r33_q80_c3.jpg',
  './exam_images/q/r33_q80_c4.jpg',
  './exam_images/q/r33_q80_c5.jpg',
  './exam_images/q/r34_q51_c1.jpg',
  './exam_images/q/r34_q51_c2.jpg',
  './exam_images/q/r34_q51_c3.jpg',
  './exam_images/q/r34_q51_c4.jpg',
  './exam_images/q/r34_q51_c5.jpg',
  './exam_images/q/r34_q54.jpg',
  './exam_images/q/r34_q55.jpg',
  './exam_images/q/r34_q56.jpg',
  './exam_images/q/r34_q80_c1.jpg',
  './exam_images/q/r34_q80_c2.jpg',
  './exam_images/q/r34_q80_c3.jpg',
  './exam_images/q/r34_q80_c4.jpg',
  './exam_images/q/r34_q80_c5.jpg',
  './exam_images/q/r35_q51_c1.jpg',
  './exam_images/q/r35_q51_c2.jpg',
  './exam_images/q/r35_q51_c3.jpg',
  './exam_images/q/r35_q51_c4.jpg',
  './exam_images/q/r35_q51_c5.jpg',
  './exam_images/q/r35_q53_c1.jpg',
  './exam_images/q/r35_q53_c2.jpg',
  './exam_images/q/r35_q53_c3.jpg',
  './exam_images/q/r35_q53_c4.jpg',
  './exam_images/q/r35_q53_c5.jpg',
  './exam_images/q/r35_q77_c1.jpg',
  './exam_images/q/r35_q77_c2.jpg',
  './exam_images/q/r35_q77_c3.jpg',
  './exam_images/q/r35_q77_c4.jpg',
  './exam_images/q/r35_q77_c5.jpg',
  './exam_images/q/r36am_q54.jpg',
  './exam_images/q/r36pm_q51_c1.jpg',
  './exam_images/q/r36pm_q51_c2.jpg',
  './exam_images/q/r36pm_q51_c3.jpg',
  './exam_images/q/r36pm_q51_c4.jpg',
  './exam_images/q/r36pm_q51_c5.jpg',
  './exam_images/q/r36pm_q52.jpg',
  './exam_images/q/r36pm_q78_c1.jpg',
  './exam_images/q/r36pm_q78_c2.jpg',
  './exam_images/q/r36pm_q78_c3.jpg',
  './exam_images/q/r36pm_q78_c4.jpg',
  './exam_images/q/r36pm_q78_c5.jpg',
  './exam_images/q/r36pm_q80_c1.jpg',
  './exam_images/q/r36pm_q80_c2.jpg',
  './exam_images/q/r36pm_q80_c3.jpg',
  './exam_images/q/r36pm_q80_c4.jpg',
  './exam_images/q/r36pm_q80_c5.jpg',
  './exam_images/q/r37am_q54_c1.jpg',
  './exam_images/q/r37am_q54_c2.jpg',
  './exam_images/q/r37am_q54_c3.jpg',
  './exam_images/q/r37am_q54_c4.jpg',
  './exam_images/q/r37am_q54_c5.jpg',
  './exam_images/q/r37am_q56.jpg',
  './exam_images/q/r37am_q77.jpg',
  './exam_images/q/r37pm_q51_c1.jpg',
  './exam_images/q/r37pm_q51_c2.jpg',
  './exam_images/q/r37pm_q51_c3.jpg',
  './exam_images/q/r37pm_q51_c4.jpg',
  './exam_images/q/r37pm_q51_c5.jpg',
  './exam_images/q/r37pm_q56_c1.jpg',
  './exam_images/q/r37pm_q56_c2.jpg',
  './exam_images/q/r37pm_q56_c3.jpg',
  './exam_images/q/r37pm_q56_c4.jpg',
  './exam_images/q/r37pm_q56_c5.jpg',
  './exam_images/q/r38am_q39.jpg',
  './exam_images/q/r38am_q40.jpg',
  './exam_images/q/r38am_q52.jpg',
  './exam_images/q/r38am_q56.jpg',
  './exam_images/q/r38pm_q39.jpg',
  './exam_images/q/r38pm_q52.jpg',
  './exam_images/q/r38pm_q54.jpg',
  './exam_images/q/r38pm_q56.jpg',
  './exam_images/q/r38pm_q80_c1.jpg',
  './exam_images/q/r38pm_q80_c2.jpg',
  './exam_images/q/r38pm_q80_c3.jpg',
  './exam_images/q/r38pm_q80_c4.jpg',
  './exam_images/q/r38pm_q80_c5.jpg',
  './exam_images/q/r39am_q39.jpg',
  './exam_images/q/r39am_q51.jpg',
  './exam_images/q/r39am_q52_c1.jpg',
  './exam_images/q/r39am_q52_c2.jpg',
  './exam_images/q/r39am_q52_c3.jpg',
  './exam_images/q/r39am_q52_c4.jpg',
  './exam_images/q/r39am_q52_c5.jpg',
  './exam_images/q/r39am_q53.jpg',
  './exam_images/q/r39am_q54_c1.jpg',
  './exam_images/q/r39am_q54_c2.jpg',
  './exam_images/q/r39am_q54_c3.jpg',
  './exam_images/q/r39am_q54_c4.jpg',
  './exam_images/q/r39am_q54_c5.jpg',
  './exam_images/q/r39am_q61.jpg',
  './exam_images/q/r39pm_q52.jpg',
  './exam_images/q/r39pm_q53_c1.jpg',
  './exam_images/q/r39pm_q53_c2.jpg',
  './exam_images/q/r39pm_q53_c3.jpg',
  './exam_images/q/r39pm_q53_c4.jpg',
  './exam_images/q/r39pm_q53_c5.jpg',
  './exam_images/q/r39pm_q56.jpg',
  './exam_images/q/r39pm_q58.jpg',
  './exam_images/q/r39pm_q79_c1.jpg',
  './exam_images/q/r39pm_q79_c2.jpg',
  './exam_images/q/r39pm_q79_c3.jpg',
  './exam_images/q/r39pm_q79_c4.jpg',
  './exam_images/q/r39pm_q79_c5.jpg',
  './exam_images/q/r40am_q52.jpg',
  './exam_images/q/r40am_q55.jpg',
  './exam_images/q/r40am_q56_c1.jpg',
  './exam_images/q/r40am_q56_c2.jpg',
  './exam_images/q/r40am_q56_c3.jpg',
  './exam_images/q/r40am_q56_c4.jpg',
  './exam_images/q/r40am_q56_c5.jpg',
  './exam_images/q/r40pm_q51.jpg',
  './exam_images/q/r40pm_q55.jpg',
  './exam_images/q/r40pm_q56_c1.jpg',
  './exam_images/q/r40pm_q56_c2.jpg',
  './exam_images/q/r40pm_q56_c3.jpg',
  './exam_images/q/r40pm_q56_c4.jpg',
  './exam_images/q/r40pm_q56_c5.jpg',
  './exam_images/q/r41am_q52_c1.jpg',
  './exam_images/q/r41am_q52_c2.jpg',
  './exam_images/q/r41am_q52_c3.jpg',
  './exam_images/q/r41am_q52_c4.jpg',
  './exam_images/q/r41am_q52_c5.jpg',
  './exam_images/q/r41am_q53.jpg',
  './exam_images/q/r41am_q54_c1.jpg',
  './exam_images/q/r41am_q54_c2.jpg',
  './exam_images/q/r41am_q54_c3.jpg',
  './exam_images/q/r41am_q54_c4.jpg',
  './exam_images/q/r41am_q54_c5.jpg',
  './exam_images/q/r41am_q56.jpg',
  './exam_images/q/r41am_q61.jpg',
  './exam_images/q/r41pm_q51.jpg',
  './exam_images/q/r41pm_q52.jpg',
  './exam_images/q/r41pm_q55.jpg',
  './exam_images/q/r41pm_q60.jpg',
  './exam_images/q/r41pm_q77.jpg',
  './exam_images/q/r41pm_q80.jpg',
  './gloss_img/il_001.png',
  './gloss_img/il_002.png',
  './gloss_img/il_003.png',
  './gloss_img/il_004.png',
  './gloss_img/il_005.png',
  './gloss_img/il_006.png',
  './gloss_img/il_007.png',
  './gloss_img/il_008.png',
  './gloss_img/il_009.png',
  './gloss_img/il_010.png',
  './gloss_img/il_011.png',
  './gloss_img/il_012.png',
  './gloss_img/il_013.png',
  './gloss_img/il_014.png',
  './gloss_img/il_015.png',
  './gloss_img/il_016.png',
  './gloss_img/il_017.png',
  './gloss_img/il_018.png',
  './gloss_img/il_019.png',
  './gloss_img/il_020.png',
  './gloss_img/il_021.png',
  './gloss_img/il_022.png',
  './gloss_img/il_023.png',
  './gloss_img/il_024.png',
  './gloss_img/il_025.png',
  './gloss_img/il_026.png',
  './gloss_img/il_027.png',
  './gloss_img/il_028.png',
  './gloss_img/il_029.png',
  './gloss_img/il_030.png',
  './gloss_img/il_031.png',
  './gloss_img/il_032.png',
  './gloss_img/il_033.png',
  './gloss_img/il_034.png',
  './gloss_img/il_035.png',
  './gloss_img/il_036.png',
  './gloss_img/il_037.png',
  './gloss_img/il_038.png',
  './gloss_img/il_039.png',
  './gloss_img/il_040.png',
  './gloss_img/il_041.png',
  './gloss_img/il_042.png',
  './gloss_img/il_043.png',
  './gloss_img/il_044.png',
  './gloss_img/il_045.png',
  './gloss_img/il_046.png',
  './gloss_img/il_047.png',
  './gloss_img/il_048.png',
  './gloss_img/il_049.png',
  './gloss_img/il_050.png',
  './gloss_img/il_051.png',
  './gloss_img/il_052.png',
  './gloss_img/il_053.png',
  './gloss_img/il_054.png',
  './gloss_img/il_055.png',
  './gloss_img/il_056.png',
  './gloss_img/il_057.png',
  './gloss_img/il_058.png',
  './gloss_img/il_059.png',
  './gloss_img/il_060.png',
  './gloss_img/il_061.png',
  './gloss_img/il_062.png',
  './gloss_img/il_063.png',
  './gloss_img/il_064.png',
  './gloss_img/il_065.png',
  './gloss_img/il_066.png',
  './gloss_img/il_067.png',
  './gloss_img/il_068.png',
  './gloss_img/il_069.png',
  './gloss_img/il_070.png',
  './gloss_img/il_071.png',
  './gloss_img/il_072.png',
  './gloss_img/il_073.png',
  './gloss_img/il_074.png',
  './gloss_img/il_075.png',
  './gloss_img/il_076.png',
  './gloss_img/il_077.png',
  './gloss_img/il_078.png',
  './gloss_img/il_079.png',
  './gloss_img/il_080.png',
  './gloss_img/il_081.png',
  './gloss_img/il_082.png',
  './gloss_img/il_083.png',
  './gloss_img/il_084.png',
  './gloss_img/il_085.png',
  './gloss_img/il_086.png',
  './gloss_img/il_087.png',
  './gloss_img/il_088.png',
  './gloss_img/il_089.png',
  './gloss_img/il_090.png',
  './gloss_img/il_091.png',
  './gloss_img/il_092.png',
  './gloss_img/il_093.png',
  './gloss_img/il_094.png',
  './gloss_img/il_095.png',
  './gloss_img/il_096.png',
  './gloss_img/il_097.png',
  './gloss_img/il_098.png',
  './gloss_img/il_099.png',
  './gloss_img/il_100.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
  './icons/icon-192-maskable.png',
  './icons/icon-192.png',
  './icons/icon-512-maskable.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  // 핵심 파일만 즉시 캐시 (빠른 설치)
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE_ASSETS).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// 네트워크 우선 — 항상 최신 시도, 실패 시 캐시 폴백
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('firebaseio.com') || url.includes('googleapis.com') ||
      url.includes('gstatic.com') || url.includes('firebase')) {
    return;
  }
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{});
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});

// 페이지 메시지 처리
self.addEventListener('message', e => {
  if (e.data === 'CACHE_NOW') {
    // 핵심 + 그림문제 + 아이콘 모두 캐시 (오프라인 완전 대비)
    cacheAll(e.source);
    return;
  }
  if (e.data === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => {
      e.source && e.source.postMessage({ type: 'CLEARED', ok: true });
    });
  }
});

async function cacheAll(client){
  const all = [...CORE_ASSETS, ...EXTRA_ASSETS];
  const total = all.length;
  let done = 0, failed = 0;
  const cache = await caches.open(CACHE);
  for (const url of all){
    try {
      const res = await fetch(url, { cache: 'reload' });
      if (res && res.ok) await cache.put(url, res);
      else failed++;
    } catch(err){ failed++; }
    done++;
    // 매 20개마다 진행률 보고
    if (client && done % 20 === 0) {
      try { client.postMessage({ type:'CACHE_PROGRESS', done, total, failed }); } catch(e){}
    }
  }
  if (client) {
    try { client.postMess