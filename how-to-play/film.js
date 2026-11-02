/* Push! how-to-play film. Generated from the Motion film; edit scenes here or regenerate. */
window.FILM = {
meta: {"title":"How to Play Push!","width":1920,"height":1080,"background":"#2B6331","scenes":[{"id":"splash","name":"Kyleigh's Cards","dur":4},{"id":"hello","name":"Let's play","dur":5},{"id":"object","name":"The goal","dur":7},{"id":"gear","name":"Players and pack","dur":7},{"id":"setup","name":"The deal","dur":10},{"id":"table","name":"The table","dur":8},{"id":"ranks","name":"Two kinds","dur":10},{"id":"turn","name":"Your turn","dur":10},{"id":"specials","name":"The count","dur":11},{"id":"push","name":"The Push","dur":12},{"id":"reset","name":"New special","dur":10},{"id":"bigpile","name":"Big piles","dur":13},{"id":"oops","name":"Special on special","dur":9},{"id":"jacks","name":"Jack on Jack","dur":8},{"id":"win","name":"How to win","dur":8},{"id":"recap","name":"Let's play!","dur":8}]},
css: "#stage { --ground:#2B6331; --main:#F2C94C; --second:#FFFFFF; --accent:#E8743B; --teal:#5CB85C; --lime:#A8D86A; --orange:#F0A030; --sky:#4A90D9; --red:#D64545; --ink:#1A1F3A; --felt-hi:#3A7D40; --felt-lo:#1E4A23; --olive:#CDBB55; --navy:#2C5E9E; color:var(--second); font-family:var(--sans, system-ui, sans-serif) }\n.ground { position:absolute; inset:0; background:radial-gradient(ellipse 90% 80% at 50% 30%, var(--felt-hi), var(--felt-lo)) }\n.wrap { position:absolute; inset:0 }\n.words { position:absolute; margin:0; display:flex; flex-direction:column; gap:22px } .words > * { margin:0 }\n.line { font-family:var(--display, var(--sans, system-ui, sans-serif)); font-size:96px; line-height:1.05; font-weight:400; color:var(--second); text-shadow:0 6px 0 rgba(0,0,0,.25) }\n.sub { font-size:50px; font-weight:800; line-height:1.2; color:var(--main) }\n.hl { color:var(--main) } .pk { color:var(--accent) } .tl { color:var(--teal) }\n.sec { position:absolute; left:100px; top:64px; padding:10px 28px; border-radius:999px; background:var(--c, var(--accent)); color:var(--ink); font-family:var(--display, var(--sans, system-ui, sans-serif)); font-size:40px; letter-spacing:.06em; white-space:nowrap; box-shadow:0 7px 0 rgba(0,0,0,.25); transform-origin:0 50% }\n.card { position:absolute; left:0; top:0; width:180px; height:252px; border-radius:24px; background:var(--second); color:var(--ink); box-sizing:border-box; border:6px solid var(--ink); box-shadow:0 12px 0 rgba(0,0,0,.28); font-family:var(--display, var(--sans, system-ui, sans-serif)); transform-origin:50% 100% }\n.card.red { color:var(--red) }\n.card .rk { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:104px; line-height:1 }\n.card .su { position:absolute; left:16px; top:10px; font-size:44px; line-height:1 }\n.card .su2 { position:absolute; right:16px; bottom:10px; font-size:44px; line-height:1; transform:rotate(180deg) }\n.card.back { background:linear-gradient(135deg, var(--sky), var(--navy)); border-color:var(--main) }\n.card.dim { filter:grayscale(1) brightness(.75) }\n.pile-spot { position:absolute; width:196px; height:268px; border-radius:28px; border:5px dashed color-mix(in srgb, var(--second) 45%, transparent); background:color-mix(in srgb, var(--olive) 30%, transparent); box-shadow:0 0 28px color-mix(in srgb, var(--main) 40%, transparent); box-sizing:border-box; display:flex; align-items:center; justify-content:center; color:var(--main); font-size:34px; font-weight:800 }\n.tag { position:absolute; padding:10px 30px; border-radius:999px; background:var(--c, var(--main)); color:var(--ink); font-family:var(--display, var(--sans, system-ui, sans-serif)); font-size:50px; line-height:1.1; white-space:nowrap; box-shadow:0 8px 0 rgba(0,0,0,.28) }\n.chip { position:absolute; padding:8px 24px; border-radius:999px; background:var(--c, var(--teal)); color:var(--ink); font-size:36px; font-weight:900; white-space:nowrap; box-shadow:0 6px 0 rgba(0,0,0,.22) }\n.big { font-family:var(--display, var(--sans, system-ui, sans-serif)); font-size:200px; line-height:1; color:var(--main); text-shadow:0 8px 0 rgba(0,0,0,.25) }",
shared: function (kit) {
window.UI = {
  card(kit, rank, suit, cls) {
    if (rank == null) return kit.h('<div class="card back ' + (cls || '') + '"></div>');
    const red = suit === '♥' || suit === '♦';
    return kit.h('<div class="card ' + (red ? 'red ' : '') + (cls || '') + '"><span class="su">' + suit + '</span><span class="rk">' + rank + '</span><span class="su2">' + suit + '</span></div>');
  },
  place(el, x, y, r, s, sx, sy) {
    const k = s == null ? 1 : s;
    el.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + (r || 0) + 'deg) scale(' + (k * (sx || 1)) + ',' + (k * (sy || 1)) + ')';
  },
  hop(p) { return Math.sin(Math.PI * Math.min(1, Math.max(0, p))); },
  squash(t, t0) { const d = t - t0; if (d < 0 || d > 0.35) return [1, 1]; const k = Math.exp(-d * 10) * Math.cos(d * 30) * 0.14; return [1 + k, 1 - k]; },
  frame(kit, o) {
    const g = kit.h('<div class="ground"></div>'); kit.stage.append(g);
    const w = kit.h('<div class="wrap"></div>'); g.append(w);
    const f = { w, ws: w.style };
    if (o.sec) { f.sec = kit.h('<div class="sec" style="--c:var(' + (o.c || '--accent') + ')">' + o.sec + '</div>'); w.append(f.sec); }
    const box = kit.h('<div class="words" style="left:100px;top:' + (o.top || 160) + 'px;width:' + (o.width || 1720) + 'px"></div>'); w.append(box);
    f.head = kit.h('<h2 class="line"' + (o.size ? ' style="font-size:' + o.size + 'px"' : '') + '>' + o.head + '</h2>'); box.append(f.head);
    if (o.sub) { f.sub = kit.h('<p class="sub">' + o.sub + '</p>'); box.append(f.sub); }
    f.headAt = o.headAt == null ? 0.35 : o.headAt; f.subAt = o.subAt == null ? 2.2 : o.subAt;
    return f;
  },
  frameRender(kit, f, t, dur) {
    if (f.sec) { const p = kit.seg(t, 0.05, 0.45); f.sec.style.opacity = p; f.sec.style.transform = 'scale(' + kit.lerp(0.5, 1, kit.eob(p, 1.8)) + ')'; }
    kit.TextFx.fadeFromRight(f.head, t, f.headAt, { stagger: 0.13, dur: 0.55 });
    if (f.sub) { const s = kit.seg(t, f.subAt, f.subAt + 0.6); f.sub.style.opacity = s; f.sub.style.transform = 'translateY(' + kit.lerp(24, 0, kit.eo(s)) + 'px)'; }
    const x = kit.seg(t, dur - 0.7, dur - 0.05);
    f.ws.opacity = 1 - kit.ei(x);
    f.ws.transform = 'translateY(' + (-40 * kit.ei(x)) + 'px)';
  }
};
},
score: function (kit) {
kit.score(function (S, T) {
  S.tempo(120, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -5 });
  S.program('mallet', 'marimba', { pan: -0.2, gain: -3 });
  S.program('pluck', 'pluck', { pan: 0.25, gain: -4 });
  S.program('bass', 'bass', { gain: -2 });
  S.chord('pad', ['C4', 'E4', 'G4'], { beat: 0, beats: 10, vel: 32 });
  S.run('pluck', ['C5', 'E5', 'G5', 'C6'], { t: 0.1, step: 0.18, vel: 50 });
  const prog = [['C3', ['C4', 'E4', 'G4'], ['G5', 'C5']], ['A2', ['A3', 'C4', 'E4'], ['E5', 'A4']], ['F2', ['F3', 'A3', 'C4'], ['C5', 'F4']], ['G2', ['G3', 'B3', 'D4'], ['D5', 'G4']]];
  const endB = S.toBeat(T.recap) - 2;
  for (let b = 10, i = 0; b + 4 <= endB; b += 4, i++) {
    const p = prog[i % 4];
    S.note('bass', p[0], { beat: b, beats: 1.5, vel: 70 });
    S.note('bass', p[0], { beat: b + 2, beats: 1, vel: 58 });
    S.chord('pad', p[1], { beat: b, beats: 4, vel: 26 });
    S.pattern('mallet', i % 2 ? 'x.x.x.X.' : 'X.x..xx.', { from: b, repeat: 1, pitch: p[2], vel: 44 });
    S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: b, repeat: 1, vel: 58 });
  }
  S.fx('revswell', T.recap, { dur: 1.2 });
  S.run('mallet', ['C5', 'D5', 'E5', 'G5', 'A5', 'C6'], { t: T.recap - 0.62, step: 0.1, vel: 52, cresc: 8 });
  S.chord('pad', ['C4', 'E4', 'G4', 'C5'], { t: T.recap, dur: 4.8, vel: 46 });
  S.chord('pluck', ['C5', 'E5', 'G5'], { t: T.recap, dur: 2.5, vel: 64 });
  S.note('bass', 'C2', { t: T.recap, dur: 3, vel: 80 });
  S.drum('crash', { t: T.recap, vel: 70 });
  const fx = (n, t, o) => S.fx(n, t, o || {});
  [0.8, 1.05, 1.3, 1.55].forEach((x, i) => fx('boing', T.hello + x, { vel: 65, pitch: i * 2 }));
  fx('thud', T.object + 2.2, { vel: 60 });
  for (let k = 0; k < 5; k++) fx('whoosh', T.object + 3.0 + k * 0.38, { dur: 0.4, vel: 40 });
  fx('ding', T.object + 5.0, { vel: 60 });
  fx('pop', T.gear + 1.65, { vel: 55 }); fx('pop', T.gear + 1.9, { vel: 55, pitch: 3 }); fx('thud', T.gear + 2.2, { vel: 60 });
  fx('pop', T.gear + 3.9, { vel: 55 }); fx('pop', T.gear + 4.3, { vel: 60, pitch: 5 }); fx('whoosh', T.gear + 4.8, { dur: 0.7 });
  fx('roll', T.setup + 1.3, { dur: 1.6, vel: 40 });
  const step = (7.6 - 3.2 - 0.45) / 16;
  for (let i = 0; i < 16; i++) fx('tick', T.setup + 3.2 + i * step + 0.45, { vel: 42, pan: i % 2 ? 0.6 : -0.6 });
  fx('ding', T.setup + 7.6, { vel: 60 });
  [1.75, 2.1, 2.45].forEach((x, i) => fx('pop', T.table + x, { vel: 58, pitch: i * 2 }));
  [3.7, 4.0, 4.3].forEach(x => fx('tick', T.table + x, { vel: 40 }));
  for (let i = 0; i < 9; i++) fx('tick', T.ranks + 1.6 + i * 0.14, { vel: 38 });
  [4.5, 4.8, 5.1, 5.4].forEach((x, i) => fx('boing', T.ranks + x, { vel: 60, pitch: i * 2 }));
  [3.35, 3.55, 3.75].forEach(x => fx('pop', T.turn + x, { vel: 45 }));
  fx('whoosh', T.turn + 4.2, { dur: 0.6 }); fx('thud', T.turn + 4.95, { vel: 85 });
  fx('whoosh', T.turn + 6.8, { dur: 0.6 }); fx('thud', T.turn + 7.55, { vel: 85 });
  [2.9, 3.8, 4.7, 5.6].forEach((x, i) => { fx('boing', T.specials + x, { vel: 60 }); fx('ding', T.specials + x + 0.3, { vel: 45, pitch: -i * 2 }); });
  fx('pop', T.specials + 7.2, { vel: 50 });
  fx('thud', T.push + 2.1, { vel: 75 }); fx('pop', T.push + 2.6, { vel: 50 });
  [3.45, 4.35, 5.25].forEach((x, i) => fx('pop', T.push + x, { vel: 68, pitch: i * 3 }));
  fx('thud', T.push + 6.15, { vel: 100 }); S.drum('crash', { t: T.push + 6.15, vel: 85 }); fx('chime', T.push + 6.17, { vel: 75 });
  fx('whoosh', T.push + 7.6, { dur: 0.7 }); fx('boing', T.push + 8.35, { vel: 60 }); fx('pop', T.push + 8.6, { vel: 50 });
  fx('thud', T.reset + 1.75, { vel: 70 }); fx('pop', T.reset + 2.85, { vel: 60 }); fx('pop', T.reset + 3.75, { vel: 60, pitch: 3 });
  fx('thud', T.reset + 4.95, { vel: 85 }); fx('sparkle', T.reset + 5.2, { vel: 60 });
  for (let i = 0; i < 10; i++) { const l = T.bigpile + 1.6 + i * 0.62 + 0.4; if ([0, 3, 5, 8].indexOf(i) >= 0) { fx('thud', l, { vel: 75 }); if (i) fx('ding', l + 0.05, { vel: 50, pitch: i }); } else fx('pop', l, { vel: 58, pitch: i }); }
  fx('thud', T.bigpile + 7.58, { vel: 100 }); S.drum('crash', { t: T.bigpile + 7.58, vel: 85 }); fx('chime', T.bigpile + 7.6, { vel: 75 });
  fx('whoosh', T.bigpile + 9.3, { dur: 0.8 }); fx('boing', T.bigpile + 10.1, { vel: 65, pitch: -4 }); fx('pop', T.bigpile + 10.2, { vel: 50 });
  fx('thud', T.oops + 2.3, { vel: 75 }); fx('thud', T.oops + 3.95, { vel: 85 }); fx('boing', T.oops + 4.05, { vel: 60, pitch: -6 });
  fx('whoosh', T.oops + 5.8, { dur: 0.7 }); fx('boing', T.oops + 6.45, { vel: 60 });
  fx('thud', T.jacks + 3.05, { vel: 75 }); fx('thud', T.jacks + 4.35, { vel: 85 }); fx('ding', T.jacks + 4.4, { vel: 60 });
  fx('whoosh', T.jacks + 5.5, { dur: 0.7 }); fx('boing', T.jacks + 6.15, { vel: 60 });
  for (let k = 0; k < 4; k++) { fx('whoosh', T.win + 3.4 + k * 0.6, { dur: 0.45, vel: 40 }); fx('pop', T.win + 3.9 + k * 0.6, { vel: 55, pitch: k * 2 }); }
  fx('chime', T.win + 5.7, { vel: 75 }); fx('sparkle', T.win + 5.9, { vel: 60 });
  fx('boing', T.splash + 0.7, { vel: 65 }); fx('sparkle', T.splash + 1.0, { vel: 55 });
  [0.7, 0.82, 0.94, 1.06, 1.18, 1.3].forEach((x, i) => fx('pop', T.splash + x, { vel: 40, pitch: i * 2 }));
  fx('boing', T.recap + 1.6, { vel: 60 }); fx('pop', T.recap + 2.8, { vel: 55 }); fx('ding', T.recap + 2.4, { vel: 50 });
  S.master({ gain: -6, fadeOut: 1.5 });
});
},
scenes: {
"splash": function (kit) {
const { seg, eo, ei, eob, lerp } = kit;
kit.scene('splash', {
  init(kit) {
    const g = kit.h('<div class="ground"></div>'); kit.stage.append(g);
    this.w = kit.h('<div class="wrap"></div>'); g.append(this.w);
    this.box = kit.h('<div style="position:absolute;left:740px;top:120px;width:396px;height:596px;padding:22px;border-radius:30px;background:color-mix(in srgb, var(--ground) 70%, var(--ink));box-shadow:0 16px 0 rgba(0,0,0,.28);transform-origin:50% 100%"><img src="' + kit.assets.url('logo.webp') + '" alt="Kyleigh&#39;s Cards" style="display:block;width:396px;height:596px;border-radius:10px;background:var(--second);object-fit:contain"></div>'); this.w.append(this.box);
    this.words = kit.h('<div class="words" style="left:0;top:830px;width:1920px;align-items:center;text-align:center"><p class="line" style="font-size:80px;color:var(--main)">presents</p></div>'); this.w.append(this.words);
    this.line = this.words.querySelector('.line');
    this.dots = [['--accent', 360, 300, 90], ['--teal', 1480, 260, 70], ['--main', 1560, 760, 110], ['--orange', 300, 780, 80], ['--lime', 1300, 520, 40], ['--sky', 560, 560, 50]].map((d, i) => { const e = kit.h('<div style="position:absolute;left:' + d[1] + 'px;top:' + d[2] + 'px;width:' + d[3] + 'px;height:' + d[3] + 'px;border-radius:50%;background:var(' + d[0] + ')"></div>'); this.w.insertBefore(e, this.box); return { s: e.style, i }; });
  },
  render(t, kit) {
    const p = seg(t, -0.3, 0.7), sq = UI.squash(t, 0.7);
    this.box.style.transform = 'translateY(' + (-UI.hop(seg(t, -0.3, 0.7)) * 40) + 'px) scale(' + lerp(0.85, 1, eob(p, 1.8)) * kit.breathe(t, 0.012, 2.6) * sq[1] + ',' + lerp(0.85, 1, eob(p, 1.8)) * kit.breathe(t, 0.012, 2.6) * sq[0] + ') rotate(' + Math.sin(t * 1.6) * 1.2 + 'deg)';
    kit.TextFx.fadeFromRight(this.line, t, 1.0, { stagger: 0.13, dur: 0.55 });
    for (const d of this.dots) { const q = seg(t, 0.3 + d.i * 0.12, 0.7 + d.i * 0.12); d.s.opacity = q; d.s.transform = 'scale(' + lerp(0.2, 1, eob(q, 1.9)) * kit.breathe(t + d.i, 0.06, 2) + ') translateY(' + Math.sin(t * 1.5 + d.i) * 10 + 'px)'; }
    const x = seg(t, kit.dur - 0.7, kit.dur - 0.05);
    this.w.style.opacity = 1 - ei(x);
    this.w.style.transform = 'translateY(' + (-40 * ei(x)) + 'px)';
  },
});
},
"hello": function (kit) {
const { seg, eo, eob, lerp } = kit;
const HELLO_CARDS = [['A','♠',1080,430,-14],['K','♥',1260,400,-5],['Q','♣',1440,400,5],['J','♦',1620,430,14]];
kit.scene('hello', {
  init(kit) {
    this.f = UI.frame(kit, { head: 'How to Play Push!', size: 170, top: 300, width: 880, headAt: -0.6, sub: 'A card game for 2 players', subAt: 1.0 });
    this.cards = HELLO_CARDS.map((c, i) => { const el = UI.card(kit, c[0], c[1]); this.f.w.append(el); return { el, x: c[2], y: c[3], r: c[4], t0: 0.25 + i * 0.25 }; });
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    for (const c of this.cards) {
      const p = seg(t, c.t0, c.t0 + 0.55), land = c.t0 + 0.55;
      const y = c.y - UI.hop(p) * 220 + (t > land ? Math.sin((t - land) * 2.2 + c.x) * 7 : 0);
      const sq = UI.squash(t, land);
      const r = lerp(c.r + 40, c.r, eob(p, 1.7)) + (t > land ? Math.sin((t - land) * 1.9 + c.r) * 1.5 : 0);
      c.el.style.opacity = p > 0 ? 1 : 0;
      UI.place(c.el, lerp(c.x + 420, c.x, eo(p)), y, r, 1.25, sq[1], sq[0]);
    }
  },
});
},
"object": function (kit) {
const { seg, eo, ei, eob, lerp } = kit;
kit.scene('object', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'OBJECT OF THE GAME', c: '--main', head: 'Be the first player to get rid of all your cards.', sub: 'That is how you win!', subAt: 2.6 });
    const w = this.f.w;
    this.spot = kit.h('<div class="pile-spot" style="--c:var(--teal);left:862px;top:572px"></div>'); w.append(this.spot);
    this.cards = []; for (let i = 0; i < 5; i++) { const c = UI.card(kit); w.append(c); this.cards.push(c); }
    this.chip = kit.h('<div class="chip" style="--c:var(--sky);left:860px;top:880px;width:200px;text-align:center;box-sizing:border-box">Your stack</div>'); w.append(this.chip);
    this.tag = kit.h('<div class="tag" style="--c:var(--lime);left:810px;top:875px">0 cards. You win!</div>'); w.append(this.tag);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    const inP = seg(t, 1.6, 2.1);
    this.spot.style.opacity = inP;
    this.cards.forEach((c, i) => {
      const k = 4 - i, t0 = 3.0 + k * 0.38, p = seg(t, t0, t0 + 0.55);
      const arrive = eob(seg(t, 1.7 + i * 0.08, 2.2 + i * 0.08), 1.7);
      c.style.opacity = arrive > 0 && p < 1 ? 1 : 0;
      UI.place(c, 870 - i * 5 + ei(p) * (900 - k * 60), lerp(1200, 580 - i * 6, arrive) - UI.hop(p * 0.6) * 380 + ei(p) * 120, (i - 2) * 2 + p * 150 + Math.sin(t * 2 + i) * 0.8);
    });
    const c1 = seg(t, 2.2, 2.6), c2 = seg(t, 4.9, 5.1);
    this.chip.style.opacity = c1 * (1 - c2);
    const tp = seg(t, 5.0, 5.35);
    this.tag.style.opacity = tp;
    this.tag.style.transform = 'scale(' + lerp(0.4, 1, eob(tp, 1.9)) * kit.breathe(t, 0.025, 1.6) + ')';
    this.spot.style.transform = 'scale(' + (t > 4.6 ? 1 + 0.06 * UI.hop(seg(t, 4.6, 5.0)) : 1) + ')';
  },
});
},
"gear": function (kit) {
const { seg, eo, ei, eob, eio, lerp } = kit;
kit.scene('gear', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE PLAYERS AND THE PACK', c: '--teal', head: '2 players. 1 deck of 52 cards.', sub: 'Take out the Jokers first. You will not need them!', subAt: 2.4 });
    const w = this.f.w;
    this.p = [['You', '--accent', 300], ['Friend', '--sky', 1420]].map(a => { const b = kit.h('<div style="position:absolute;left:' + a[2] + 'px;top:560px;width:220px;height:220px;border-radius:50%;background:var(' + a[1] + ');color:var(--ink);display:flex;align-items:center;justify-content:center;font-family:var(--display, var(--sans, system-ui, sans-serif));font-size:56px;box-shadow:0 10px 0 rgba(0,0,0,.25)">' + a[0] + '</div>'); w.append(b); return b.style; });
    this.deck = []; for (let i = 0; i < 4; i++) { const c = UI.card(kit); w.append(c); this.deck.push(c); }
    this.joker = kit.h('<div class="card" style="color:var(--violet, #9B6BFF)"><span class="su" style="color:var(--accent)">★</span><span class="rk" style="font-size:44px">JOKER</span><span class="su2" style="color:var(--accent)">★</span></div>'); w.insertBefore(this.joker, this.deck[0]);
    this.chip = kit.h('<div class="chip" style="--c:var(--main);left:850px;top:880px">52 cards</div>'); w.append(this.chip);
    this.tag = kit.h('<div class="tag" style="--c:var(--orange);left:1080px;top:420px">Bye, Joker!</div>'); w.append(this.tag);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    this.p.forEach((s, i) => { const p = seg(t, 1.2 + i * 0.25, 1.65 + i * 0.25); s.opacity = p; s.transform = 'scale(' + lerp(0.3, 1, eob(p, 1.8)) * kit.breathe(t + i, 0.015, 2.6) + ')'; });
    const dp = eob(seg(t, 1.7, 2.2), 1.6);
    this.deck.forEach((c, i) => UI.place(c, 870 - i * 5, lerp(1200, 590 - i * 6, dp), (i - 1.5) * 1.5));
    const cp = seg(t, 2.2, 2.5);
    this.chip.style.opacity = cp;
    const up = eob(seg(t, 3.4, 3.9), 1.6), fly = seg(t, 4.8, 5.6);
    this.joker.style.opacity = t > 3.4 && fly < 1 ? 1 : 0;
    UI.place(this.joker, lerp(870, 1080, up) + ei(fly) * 1000, lerp(590, 470, up) - UI.hop(fly) * 200, lerp(0, 12, up) + fly * 300);
    const tg = seg(t, 4.0, 4.3), to = seg(t, 5.2, 5.5);
    this.tag.style.opacity = tg * (1 - to);
    this.tag.style.transform = 'scale(' + lerp(0.4, 1, eob(tg, 1.9)) + ') rotate(4deg)';
  },
});
},
"setup": function (kit) {
const { seg, eo, eob, eio, lerp } = kit;
const DL_D = [870, 610], DL_L = [150, 640], DL_R = [1590, 640], DL_N = 16, DL_A = 3.2, DL_B = 7.6;
kit.scene('setup', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE DEAL', c: '--orange', head: 'Shuffle. Then deal the cards one at a time.', sub: 'Keep going until each player has 26 cards in a face-down stack. No peeking!', subAt: 2.4 });
    const w = this.f.w;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 3; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.half = [UI.card(kit), UI.card(kit), UI.card(kit), UI.card(kit)]; this.half.forEach(c => w.append(c));
    this.fly = []; for (let i = 0; i < DL_N; i++) { const c = UI.card(kit); w.append(c); this.fly.push(c); }
    this.cL = kit.h('<div class="chip" style="--c:var(--accent);left:140px;top:930px">You: 0</div>'); w.append(this.cL);
    this.cR = kit.h('<div class="chip" style="--c:var(--sky);left:1560px;top:930px">Friend: 0</div>'); w.append(this.cR);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    const inP = eob(seg(t, 0.8, 1.3), 1.6);
    const sh = seg(t, 1.3, 2.9), split = Math.sin(sh * Math.PI * 3) * (sh > 0 && sh < 1 ? 1 : 0);
    const gone = seg(t, DL_B - 0.3, DL_B);
    this.half.forEach((c, i) => {
      const side = i < 2 ? -1 : 1;
      c.style.opacity = 1 - gone;
      UI.place(c, DL_D[0] + side * Math.abs(split) * 120 - (i % 2) * 5, lerp(1200, DL_D[1] - (i % 2) * 6, inP) - Math.abs(split) * 30, side * Math.abs(split) * 10, 1 - seg(t, DL_A, DL_B) * 0.25);
    });
    let nL = 0, nR = 0;
    const step = (DL_B - DL_A - 0.45) / DL_N;
    this.fly.forEach((c, i) => {
      const t0 = DL_A + i * step, p = seg(t, t0, t0 + 0.45), to = i % 2 ? DL_R : DL_L;
      if (p >= 1) { if (i % 2) nR++; else nL++; }
      c.style.opacity = p > 0 && p < 1 ? 1 : 0;
      UI.place(c, lerp(DL_D[0], to[0], eo(p)), lerp(DL_D[1], to[1], eo(p)) - UI.hop(p) * 150, lerp(0, i % 2 ? 360 : -360, eo(p)));
    });
    const show = (arr, n, base) => arr.forEach((c, i) => { c.style.opacity = n > i * 2 ? 1 : 0; UI.place(c, base[0] - i * 5, base[1] - i * 6, (i - 1) * 2 + Math.sin(t * 2 + i) * 0.8); });
    show(this.sL, nL, DL_L); show(this.sR, nR, DL_R);
    const k = seg(t, DL_A, DL_B - 0.2);
    const n = Math.min(26, Math.round(26 * k));
    this.cL.textContent = 'You: ' + n;
    this.cR.textContent = 'Friend: ' + n;
    const cp = seg(t, DL_A, DL_A + 0.3);
    const pop = 1 + 0.12 * UI.hop(seg(t, DL_B - 0.2, DL_B + 0.2));
    this.cL.style.opacity = cp; this.cR.style.opacity = cp;
    this.cL.style.transform = this.cR.style.transform = 'scale(' + pop + ')';
  },
});
},
"table": function (kit) {
const { seg, eo, eob, lerp } = kit;
kit.scene('table', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE TABLE', c: '--lime', head: 'Make room for 3 piles in the middle.', sub: 'At the start, all 3 piles are EMPTY.', subAt: 2.4 });
    const w = this.f.w;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 3; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.cL = kit.h('<div class="chip" style="--c:var(--accent);left:175px;top:930px">You</div>'); w.append(this.cL);
    this.cR = kit.h('<div class="chip" style="--c:var(--sky);left:1585px;top:930px">Friend</div>'); w.append(this.cR);
    this.spots = [['--accent', 560], ['--main', 862], ['--teal', 1164]].map((s, i) => {
      const el = kit.h('<div class="pile-spot" style="--c:var(' + s[0] + ');left:' + s[1] + 'px;top:600px"><span class="table-e">Empty</span></div>'); w.append(el);
      const lab = kit.h('<div class="chip" style="--c:var(' + s[0] + ');left:' + (s[1] + 38) + 'px;top:900px">Pile ' + (i + 1) + '</div>'); w.append(lab);
      return { el: el.style, e: el.querySelector('.table-e').style, lab: lab.style };
    });
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    const s = (arr, base) => arr.forEach((c, i) => UI.place(c, base[0] - i * 5, base[1] - i * 6, (i - 1) * 2 + Math.sin(t * 2 + i) * 0.8));
    s(this.sL, [150, 640]); s(this.sR, [1590, 640]);
    this.spots.forEach((o, i) => {
      const p = seg(t, 1.3 + i * 0.35, 1.75 + i * 0.35);
      o.el.opacity = p; o.lab.opacity = p;
      o.el.transform = 'scale(' + lerp(0.3, 1, eob(p, 1.9)) * kit.breathe(t + i * 0.7, 0.015, 2.4) + ')';
      const e = seg(t, 3.3 + i * 0.3, 3.7 + i * 0.3);
      o.e.opacity = e;
      o.e.display = 'inline-block';
      o.e.transform = 'scale(' + lerp(0.5, 1, eob(e, 1.8)) + ')';
    });
  },
});
},
"ranks": function (kit) {
const { seg, eo, eob, lerp } = kit;
const RK_S = ['♠', '♥', '♣', '♦'];
kit.scene('ranks', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'TWO KINDS OF CARDS', c: '--sky', head: 'Number cards and special cards.', sub: 'Watch the special cards. They make things happen!', subAt: 7.0 });
    const w = this.f.w;
    this.nums = ['2', '3', '4', '5', '6', '7', '8', '9', '10'].map((r, i) => { const c = UI.card(kit, r, RK_S[i % 4]); if (r === '10') c.querySelector('.rk').style.fontSize = '86px'; w.append(c); return { c, i }; });
    this.sp = [['J', '♦'], ['Q', '♣'], ['K', '♥'], ['A', '♠']].map((s, i) => { const c = UI.card(kit, s[0], s[1]); w.append(c); return { c, i }; });
    this.l1 = kit.h('<div class="words" style="left:100px;top:850px;width:760px;align-items:center;text-align:center"><p class="line" style="font-size:56px;color:var(--teal)">Number cards: 2 to 10</p></div>'); w.append(this.l1);
    this.l2 = kit.h('<div class="words" style="left:1000px;top:850px;width:860px;align-items:center;text-align:center"><p class="line" style="font-size:56px;color:var(--accent)">Special cards: J, Q, K, A</p></div>'); w.append(this.l2);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    for (const o of this.nums) {
      const t0 = 1.2 + o.i * 0.14, p = seg(t, t0, t0 + 0.4), k = o.i - 4;
      o.c.style.opacity = p > 0 ? 1 : 0;
      UI.place(o.c, 390 + k * 62, lerp(1150, 560 + k * k * 4, eob(p, 1.5)), k * 5 + Math.sin(t * 1.8 + o.i) * 0.8, 0.8);
    }
    for (const o of this.sp) {
      const t0 = 4.0 + o.i * 0.3, p = seg(t, t0, t0 + 0.5), land = t0 + 0.5, sq = UI.squash(t, land);
      o.c.style.opacity = p > 0 ? 1 : 0;
      const bob = t > land ? Math.sin((t - land) * 3 + o.i) * 8 : 0;
      UI.place(o.c, 1080 + o.i * 175, 560 - UI.hop(p) * 260 + lerp(-200, 0, eo(p)) * 0 + bob, lerp(-30, (o.i - 1.5) * 4, eob(p, 1.7)), 0.95, sq[1], sq[0]);
      if (p <= 0) o.c.style.opacity = 0;
    }
    const a = seg(t, 2.8, 3.3), b = seg(t, 5.6, 6.1);
    this.l1.style.opacity = a; this.l1.style.transform = 'translateY(' + lerp(20, 0, eo(a)) + 'px)';
    this.l2.style.opacity = b; this.l2.style.transform = 'translateY(' + lerp(20, 0, eo(b)) + 'px)';
  },
});
},
"turn": function (kit) {
const { seg, eo, eob, eio, lerp } = kit;
const TN_SP = [['--accent', 560], ['--main', 862], ['--teal', 1164]];
kit.scene('turn', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE PLAY', c: '--accent', head: 'On your turn, flip the top card of your stack.', sub: 'Put it face up on ANY of the 3 piles. Then your friend takes a turn.', subAt: 2.6 });
    const w = this.f.w;
    w.append(kit.h('<div style=\"position:absolute;left:500px;top:570px;width:920px;height:330px;border-radius:28px;background:rgba(0,0,0,.22)\"></div>'));
    this.spots = TN_SP.map(s => { const e = kit.h('<div class="pile-spot" style="--c:var(' + s[0] + ');left:' + s[1] + 'px;top:600px"></div>'); w.append(e); return e.style; });
    this.sL = []; this.sR = [];
    for (let i = 0; i < 3; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.mk = (rank, suit) => { const b = UI.card(kit); const f = UI.card(kit, rank, suit); w.append(b); w.append(f); return { b, f }; };
    this.c1 = this.mk('7', '♥');
    this.c2 = this.mk('3', '♣');
    this.tL = kit.h('<div class="tag" style="--c:var(--accent);left:110px;top:440px">Your turn</div>'); w.append(this.tL);
    this.tR = kit.h('<div class="tag" style="--c:var(--sky);left:1480px;top:440px">Friend&#39;s turn</div>'); w.append(this.tR);
  },
  play(o, t, t0, from, to) {
    const lift = eob(seg(t, t0 - 0.35, t0), 1.8), p = seg(t, t0, t0 + 0.75), ep = eio(p), flip = seg(t, t0 + 0.05, t0 + 0.45);
    const sq = UI.squash(t, t0 + 0.75), sx = Math.abs(Math.cos(flip * Math.PI)), face = flip >= 0.5;
    const x = lerp(from[0], to[0], ep), y = lerp(from[1] - lift * 50, to[1], ep) - UI.hop(p) * 240, s = 1 + UI.hop(p) * 0.12;
    const vis = t >= t0 - 0.35 ? 1 : 0;
    o.b.style.opacity = vis && !face ? 1 : 0; o.f.style.opacity = vis && face ? 1 : 0;
    UI.place(o.b, x, y, lerp(-4, 3, ep), s, sx * sq[0], sq[1]);
    UI.place(o.f, x, y, lerp(-4, 3, ep), s, sx * sq[0], sq[1]);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    const st = (arr, base) => arr.forEach((c, i) => UI.place(c, base[0] - i * 5, base[1] - i * 6, (i - 1) * 2 + Math.sin(t * 2 + i) * 0.8));
    st(this.sL, [150, 640]); st(this.sR, [1590, 640]);
    this.spots.forEach((s, i) => { const b = UI.hop(seg(t, 3.0 + i * 0.2, 3.35 + i * 0.2)); s.transform = 'translateY(' + (-b * 30) + 'px)'; });
    this.play(this.c1, t, 4.2, [140, 628], [568, 608]);
    this.play(this.c2, t, 6.8, [1580, 628], [1172, 608]);
    const a = seg(t, 3.6, 3.9) * (1 - seg(t, 5.6, 5.9)), b = seg(t, 6.1, 6.4);
    this.tL.style.opacity = a; this.tL.style.transform = 'scale(' + lerp(0.5, 1, eob(seg(t, 3.6, 3.9), 1.8)) + ')';
    this.tR.style.opacity = b; this.tR.style.transform = 'scale(' + lerp(0.5, 1, eob(b, 1.8)) + ')';
  },
});
},
"specials": function (kit) {
const { seg, eo, eob, lerp } = kit;
const SP = [['A', '♠', 'Ace needs', '4', '--accent'], ['K', '♥', 'King needs', '3', '--main'], ['Q', '♣', 'Queen needs', '2', '--teal'], ['J', '♦', 'Jack needs', '1', '--lime']];
kit.scene('specials', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'SPECIAL CARDS START A COUNT', c: '--main', head: 'Each special card needs number cards played on top of it.' });
    const w = this.f.w;
    this.cols = SP.map((s, i) => {
      const cx = 330 + i * 420;
      const card = UI.card(kit, s[0], s[1]); w.append(card);
      const col = kit.h('<div class="words" style="left:' + (cx - 170) + 'px;top:700px;width:340px;align-items:center;text-align:center;gap:0"><p class="sub" style="color:var(--second)">' + s[2] + '</p><p class="big specials-n" style="color:var(' + s[4] + ')">' + s[3] + '</p></div>');
      w.append(col);
      return { card, col: col.style, num: col.querySelector('.specials-n').style, x: cx - 90, t0: 2.4 + i * 0.9 };
    });
    this.foot = kit.h('<div class="words" style="left:100px;top:960px;width:1720px;align-items:center;text-align:center"><p class="sub" style="font-size:42px;color:var(--sky)">No special card on a pile? Number cards just stack up. Nothing happens.</p></div>');
    w.append(this.foot);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    for (const c of this.cols) {
      const p = seg(t, c.t0, c.t0 + 0.5), land = c.t0 + 0.5, sq = UI.squash(t, land);
      const wob = t > land ? Math.sin((t - land) * 2.4 + c.x) * 2 : 0;
      c.card.style.opacity = p > 0 ? 1 : 0;
      UI.place(c.card, c.x, 430 - UI.hop(p) * 240, wob + lerp(-25, 0, eob(p, 1.6)), 1, sq[1], sq[0]);
      const q = seg(t, land + 0.1, land + 0.5);
      c.col.opacity = q;
      c.col.transform = 'translateY(' + lerp(26, 0, eo(q)) + 'px)';
      c.num.transform = 'scale(' + lerp(0.3, 1, eob(q, 1.9)) * kit.breathe(t + c.x, 0.03, 1.6) + ')';
    }
    const f = seg(t, 7.2, 7.7);
    this.foot.style.opacity = f;
    this.foot.style.transform = 'translateY(' + lerp(20, 0, eo(f)) + 'px)';
  },
});
},
"push": function (kit) {
const { seg, eo, ei, eob, eio, lerp } = kit;
const PU_NUM = [['4', '♥', 1, 6], ['9', '♣', 0, -5], ['2', '♦', 1, 4], ['7', '♠', 0, -3]];
const PU_P = [870, 612], PU_L = [150, 660], PU_R = [1590, 660], PU_PUSH = 5.7 + 0.45;
kit.scene('push', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE PUSH', c: '--orange', head: 'Count the number cards. Whoever plays the LAST one makes a PUSH!', sub: 'The OTHER player takes the whole pile into their stack. Then that pile is empty again.', subAt: 7.0 });
    const w = this.f.w;
    this.spot = kit.h('<div class="pile-spot" style="--c:var(--main);left:862px;top:604px"><span class="push-e">Empty</span></div>'); w.append(this.spot);
    this.e = this.spot.querySelector('.push-e').style;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 2; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.pile = kit.h('<div style="position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:960px 740px"></div>'); w.append(this.pile);
    this.ace = UI.card(kit, 'A', '♠'); this.pile.append(this.ace);
    this.nums = PU_NUM.map((n, i) => { const c = UI.card(kit, n[0], n[1]); this.pile.append(c); return { c, from: n[2] ? PU_R : PU_L, r: n[3], t0: 3.0 + i * 0.9 }; });
    this.need = kit.h('<div class="chip" style="--c:var(--accent);left:1100px;top:640px">Ace needs 4</div>'); w.append(this.need);
    this.count = kit.h('<p class="big" style="position:absolute;left:560px;top:640px;width:260px;margin:0;text-align:center;color:var(--main)">0</p>'); w.append(this.count);
    this.tag = kit.h('<div class="tag" style="--c:var(--accent);left:760px;top:520px;font-size:110px;padding:14px 50px">PUSH!</div>'); w.append(this.tag);
    this.who = kit.h('<div class="tag" style="--c:var(--sky);left:1380px;top:960px;font-size:40px">Friend takes it</div>'); w.append(this.who);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    this.sL.forEach((s, i) => UI.place(s, PU_L[0] - i * 5, PU_L[1] - i * 6, (i - 0.5) * 3));
    this.sR.forEach((s, i) => { const g = i === 1 ? UI.squash(t, 8.35) : [1, 1]; UI.place(s, PU_R[0] - i * 5, PU_R[1] - i * 6, (i - 0.5) * 3, 1, g[1], g[0]); });
    const ap = seg(t, 1.6, 2.1), asq = UI.squash(t, 2.1);
    this.ace.style.opacity = ap > 0 ? 1 : 0;
    UI.place(this.ace, PU_P[0], lerp(300, PU_P[1], eo(ap)) - UI.hop(ap) * 80, -3, 1, asq[1], asq[0]);
    const np = seg(t, 2.3, 2.6);
    this.need.style.opacity = np * (1 - seg(t, 7.3, 7.6));
    this.need.style.transform = 'scale(' + lerp(0.5, 1, eob(np, 1.8)) + ')';
    let n = 0, last = null;
    this.nums.forEach((o, i) => {
      const p = seg(t, o.t0, o.t0 + 0.45), land = o.t0 + 0.45;
      if (t >= land) { n = i + 1; last = land; }
      const sq = UI.squash(t, land);
      o.c.style.opacity = p > 0 ? 1 : 0;
      UI.place(o.c, lerp(o.from[0], PU_P[0] + i * 7, eo(p)), lerp(o.from[1], PU_P[1] - i * 5, eo(p)) - UI.hop(p) * 220, lerp(o.r * 6, o.r, eo(p)), 1, sq[1], sq[0]);
    });
    this.count.textContent = String(n);
    const pop = last == null ? 0 : seg(t, last, last + 0.3);
    this.count.style.opacity = (n > 0 ? 1 : 0) * (1 - seg(t, 7.3, 7.6));
    this.count.style.transform = 'scale(' + (n > 0 ? lerp(1.5, 1, eob(pop, 1.8)) : 1) + ')';
    const tp = seg(t, PU_PUSH, PU_PUSH + 0.3), tOut = seg(t, 7.2, 7.5);
    this.tag.style.opacity = tp * (1 - tOut);
    this.tag.style.transform = 'scale(' + lerp(0.3, 1, eob(tp, 1.9)) * (1 + Math.sin(Math.max(0, t - PU_PUSH) * 9) * 0.03) + ') rotate(-5deg)';
    const shake = t > PU_PUSH && t < PU_PUSH + 0.4 ? Math.sin(t * 70) * 6 * (1 - seg(t, PU_PUSH, PU_PUSH + 0.4)) : 0;
    const mv = seg(t, 7.6, 8.35), e = eio(mv);
    this.pile.style.opacity = 1 - seg(t, 8.25, 8.4);
    this.pile.style.transform = 'translate(' + ((PU_R[0] - PU_P[0] - 40) * e + shake) + 'px,' + ((PU_R[1] - PU_P[1] - 40) * e - UI.hop(mv) * 140) + 'px) scale(' + lerp(1, 0.7, e) + ')';
    const wp = seg(t, 8.4, 8.7);
    this.who.style.opacity = wp; this.who.style.transform = 'scale(' + lerp(0.5, 1, eob(wp, 1.8)) + ')';
    const ep = seg(t, 8.6, 9.0);
    this.e.opacity = ep; this.e.display = 'inline-block'; this.e.transform = 'scale(' + lerp(0.5, 1, eob(ep, 1.8)) + ')';
  },
});
},
"reset": function (kit) {
const { seg, eo, eob, lerp } = kit;
const RS = [['A', '♠', 1.3, 620, -6], ['7', '♥', 2.4, 720, 2], ['3', '♣', 3.3, 820, -3], ['K', '♦', 4.5, 920, 5]];
kit.scene('reset', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'A NEW SPECIAL CARD', c: '--teal', head: 'A special card played on a number card starts a NEW count.', sub: 'Forget the old special card. Only the newest one counts!', subAt: 6.2 });
    const w = this.f.w;
    this.cards = RS.map(r => { const c = UI.card(kit, r[0], r[1]); w.append(c); return { c, t0: r[2], x: r[3], r: r[4] }; });
    this.chip = kit.h('<div class="tag" style="--c:var(--accent);left:1240px;top:640px">Ace: 0 of 4</div>'); w.append(this.chip);
    this.nw = kit.h('<div class="tag" style="--c:var(--lime);left:1240px;top:740px">New count!</div>'); w.append(this.nw);
    this.x = kit.h('<div class="line" style="position:absolute;left:640px;top:560px;font-size:150px;color:var(--red);margin:0">X</div>'); w.append(this.x);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    let n = 0;
    this.cards.forEach((o, i) => {
      const p = seg(t, o.t0, o.t0 + 0.45), land = o.t0 + 0.45, sq = UI.squash(t, land);
      if (t >= land && (i === 1 || i === 2)) n++;
      o.c.style.opacity = p > 0 ? 1 : 0;
      UI.place(o.c, o.x, lerp(260, 620, eo(p)) - UI.hop(p) * 60, lerp(o.r - 30, o.r, eob(p, 1.7)), 1, sq[1], sq[0]);
    });
    const king = t >= RS[3][2] + 0.45;
    const dim = seg(t, 4.95, 5.4);
    this.cards[0].c.style.filter = 'grayscale(' + dim + ') brightness(' + lerp(1, 0.7, dim) + ')';
    this.x.style.opacity = dim;
    this.x.style.transform = 'scale(' + lerp(0.4, 1, eob(dim, 1.8)) + ') rotate(-8deg)';
    const swap = seg(t, 5.0, 5.2);
    this.chip.textContent = king ? 'King: 0 of 3' : 'Ace: ' + n + ' of 4';
    this.chip.style.setProperty('--c', king ? 'var(--main)' : 'var(--accent)');
    const cp = seg(t, 1.8, 2.1);
    const bump = Math.max(UI.hop(seg(t, 2.85, 3.1)), UI.hop(seg(t, 3.75, 4.0)), UI.hop(seg(t, 4.95, 5.25)));
    this.chip.style.opacity = cp;
    this.chip.style.transform = 'scale(' + (lerp(0.5, 1, eob(cp, 1.8)) + bump * 0.12) + ')';
    const np = seg(t, 5.2, 5.5);
    this.nw.style.opacity = np;
    this.nw.style.transform = 'scale(' + lerp(0.4, 1, eob(np, 1.9)) * kit.breathe(t, 0.02, 1.6) + ') rotate(-3deg)';
  },
});
},
"bigpile": function (kit) {
const { seg, eo, eob, eio, lerp } = kit;
const BP = [['A','♠','Ace: 0 of 4',1],['5','♥','Ace: 1 of 4'],['8','♣','Ace: 2 of 4'],['Q','♦','Queen: 0 of 2',1],['3','♠','Queen: 1 of 2'],['K','♣','King: 0 of 3',1],['6','♦','King: 1 of 3'],['10','♥','King: 2 of 3'],['J','♠','Jack: 0 of 1',1],['4','♣','Jack: 1 of 1']];
const BP_T0 = 1.6, BP_GAP = 0.62, BP_FL = 0.4, BP_PUSH = BP_T0 + 9 * BP_GAP + BP_FL;
kit.scene('bigpile', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'ONLY THE NEWEST SPECIAL COUNTS', c: '--accent', head: 'Every new special card resets the count.', sub: 'That is how piles get REALLY big before someone pushes!', subAt: 9.1 });
    const w = this.f.w;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 2; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.pile = kit.h('<div style="position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:960px 740px"></div>'); w.append(this.pile);
    this.cards = BP.map((b, i) => { const c = UI.card(kit, b[0], b[1]); if (b[0] === '10') c.querySelector('.rk').style.fontSize = '86px'; this.pile.append(c); return { c, from: i % 2 ? [150, 660] : [1590, 660], t0: BP_T0 + i * BP_GAP, x: 870 + ((i * 37) % 5 - 2) * 9, y: 640 - i * 9, r: ((i * 53) % 9 - 4) * 1.6, sp: !!b[3], label: b[2] }; });
    this.cnt = kit.h('<div class="tag" style="--c:var(--main);left:260px;top:440px">Ace: 0 of 4</div>'); w.append(this.cnt);
    this.rs = kit.h('<div class="tag" style="--c:var(--lime);left:1130px;top:520px">Reset!</div>'); w.append(this.rs);
    this.size = kit.h('<div class="chip" style="--c:var(--teal);left:820px;top:950px">Pile: 0 cards</div>'); w.append(this.size);
    this.push = kit.h('<div class="tag" style="--c:var(--accent);left:740px;top:440px;font-size:110px;padding:14px 50px">PUSH!</div>'); w.append(this.push);
    this.who = kit.h('<div class="tag" style="--c:var(--sky);left:1300px;top:960px;font-size:40px">Friend takes 10 cards!</div>'); w.append(this.who);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    this.sL.forEach((s, i) => UI.place(s, 150 - i * 5, 660 - i * 6, (i - 0.5) * 3));
    this.sR.forEach((s, i) => { const g = i === 1 ? UI.squash(t, 10.1) : [1, 1]; const fat = t > 10.1 ? 1.12 : 1; UI.place(s, 1590 - i * 5, 660 - i * 6, (i - 0.5) * 3, fat, g[1], g[0]); });
    let n = 0, label = BP[0][2], lastReset = -9, lastLand = -9;
    this.cards.forEach((o, i) => {
      const p = seg(t, o.t0, o.t0 + BP_FL), land = o.t0 + BP_FL, sq = UI.squash(t, land);
      if (t >= land) { n = i + 1; label = o.label; lastLand = land; if (o.sp && i > 0) lastReset = land; }
      o.c.style.opacity = p > 0 ? 1 : 0;
      UI.place(o.c, lerp(o.from[0], o.x, eo(p)), lerp(o.from[1], o.y, eo(p)) - UI.hop(p) * 200, lerp(o.r * 5, o.r, eo(p)), 1, sq[1], sq[0]);
    });
    const cp = seg(t, BP_T0 + BP_FL, BP_T0 + BP_FL + 0.3);
    this.cnt.textContent = label;
    const isSp = /: 0 of/.test(label);
    this.cnt.style.setProperty('--c', isSp ? 'var(--main)' : 'var(--second)');
    this.cnt.style.opacity = cp * (1 - seg(t, 8.6, 8.9));
    this.cnt.style.transform = 'scale(' + (lerp(0.5, 1, eob(cp, 1.8)) + 0.12 * UI.hop(seg(t, lastLand, lastLand + 0.25))) + ')';
    const rp = seg(t, lastReset, lastReset + 0.3), ro = seg(t, lastReset + 0.45, lastReset + 0.6);
    this.rs.style.opacity = lastReset > 0 ? rp * (1 - ro) : 0;
    this.rs.style.transform = 'scale(' + lerp(0.4, 1, eob(rp, 1.9)) + ') rotate(5deg)';
    this.size.textContent = 'Pile: ' + n + (n === 1 ? ' card' : ' cards');
    this.size.style.opacity = cp * (1 - seg(t, 9.3, 9.5));
    this.size.style.transform = 'scale(' + (1 + 0.1 * UI.hop(seg(t, lastLand, lastLand + 0.25))) + ')';
    const pp = seg(t, BP_PUSH, BP_PUSH + 0.3), po = seg(t, 8.8, 9.1);
    this.push.style.opacity = pp * (1 - po);
    this.push.style.transform = 'scale(' + lerp(0.3, 1, eob(pp, 1.9)) + ') rotate(-5deg)';
    const shake = t > BP_PUSH && t < BP_PUSH + 0.4 ? Math.sin(t * 70) * 6 * (1 - seg(t, BP_PUSH, BP_PUSH + 0.4)) : 0;
    const mv = seg(t, 9.3, 10.1), e = eio(mv);
    this.pile.style.opacity = 1 - seg(t, 10.0, 10.15);
    this.pile.style.transform = 'translate(' + ((1590 - 870 - 40) * e + shake) + 'px,' + (60 * e - UI.hop(mv) * 160) + 'px) scale(' + lerp(1, 0.7, e) + ')';
    const wp = seg(t, 10.15, 10.45);
    this.who.style.opacity = wp; this.who.style.transform = 'scale(' + lerp(0.5, 1, eob(wp, 1.8)) + ')';
  },
});
},
"oops": function (kit) {
const { seg, eo, ei, eob, eio, lerp } = kit;
kit.scene('oops', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'SPECIAL ON SPECIAL', c: '--orange', head: 'Did you play a special card right on top of another special card?', sub: 'Uh-oh! Then YOU must take the whole pile.', subAt: 4.6 });
    const w = this.f.w;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 2; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.spot = kit.h('<div class="pile-spot" style="--c:var(--teal);left:862px;top:604px"></div>'); w.append(this.spot);
    this.pile = kit.h('<div style="position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:960px 740px"></div>'); w.append(this.pile);
    this.k = UI.card(kit, 'K', '♥'); this.pile.append(this.k);
    this.q = UI.card(kit, 'Q', '♣'); this.pile.append(this.q);
    this.uh = kit.h('<div class="tag" style="--c:var(--orange);left:1100px;top:600px;font-size:80px">Uh-oh!</div>'); w.append(this.uh);
    this.who = kit.h('<div class="tag" style="--c:var(--accent);left:100px;top:960px;font-size:40px">You take it</div>'); w.append(this.who);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    this.sL.forEach((s, i) => { const g = i === 1 ? UI.squash(t, 6.45) : [1, 1]; UI.place(s, 150 - i * 5, 660 - i * 6, (i - 0.5) * 3, 1, g[1], g[0]); });
    this.sR.forEach((s, i) => UI.place(s, 1590 - i * 5, 660 - i * 6, (i - 0.5) * 3));
    const kp = seg(t, 1.8, 2.3), ksq = UI.squash(t, 2.3);
    this.k.style.opacity = kp > 0 ? 1 : 0;
    UI.place(this.k, lerp(1590, 870, eo(kp)), lerp(660, 612, eo(kp)) - UI.hop(kp) * 220, lerp(30, -3, eo(kp)), 1, ksq[1], ksq[0]);
    const qp = seg(t, 3.5, 3.95), qsq = UI.squash(t, 3.95);
    this.q.style.opacity = qp > 0 ? 1 : 0;
    UI.place(this.q, lerp(150, 880, eo(qp)), lerp(660, 606, eo(qp)) - UI.hop(qp) * 220, lerp(-30, 5, eo(qp)), 1, qsq[1], qsq[0]);
    const up = seg(t, 4.0, 4.3);
    this.uh.style.opacity = up * (1 - seg(t, 5.6, 5.9));
    const wob = Math.sin(Math.max(0, t - 4.3) * 12) * 4 * Math.exp(-Math.max(0, t - 4.3) * 2);
    this.uh.style.transform = 'scale(' + lerp(0.3, 1, eob(up, 1.9)) + ') rotate(' + (6 + wob) + 'deg)';
    const mv = seg(t, 5.8, 6.45), e = eio(mv);
    this.pile.style.opacity = 1 - seg(t, 6.35, 6.5);
    this.pile.style.transform = 'translate(' + ((150 - 870 + 40) * e) + 'px,' + (40 * e - UI.hop(mv) * 140) + 'px) scale(' + lerp(1, 0.7, e) + ')';
    const wp = seg(t, 6.5, 6.8);
    this.who.style.opacity = wp; this.who.style.transform = 'scale(' + lerp(0.5, 1, eob(wp, 1.8)) + ')';
  },
});
},
"jacks": function (kit) {
const { seg, eo, eob, eio, lerp } = kit;
kit.scene('jacks', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'THE JACK RULE', c: '--lime', head: 'Jack on Jack is different!', sub: 'If you play a Jack right on a Jack, your FRIEND takes the pile.', subAt: 2.0 });
    const w = this.f.w;
    this.sL = []; this.sR = [];
    for (let i = 0; i < 2; i++) { const a = UI.card(kit); w.append(a); this.sL.push(a); const b = UI.card(kit); w.append(b); this.sR.push(b); }
    this.spot = kit.h('<div class="pile-spot" style="--c:var(--accent);left:862px;top:604px"></div>'); w.append(this.spot);
    this.pile = kit.h('<div style="position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:960px 740px"></div>'); w.append(this.pile);
    this.j1 = UI.card(kit, 'J', '♠'); this.pile.append(this.j1);
    this.j2 = UI.card(kit, 'J', '♦'); this.pile.append(this.j2);
    this.jj = kit.h('<div class="tag" style="--c:var(--lime);left:1100px;top:600px;font-size:70px">Jack on Jack!</div>'); w.append(this.jj);
    this.who = kit.h('<div class="tag" style="--c:var(--sky);left:1380px;top:960px;font-size:40px">Friend takes it</div>'); w.append(this.who);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    this.sL.forEach((s, i) => UI.place(s, 150 - i * 5, 660 - i * 6, (i - 0.5) * 3));
    this.sR.forEach((s, i) => { const g = i === 1 ? UI.squash(t, 6.15) : [1, 1]; UI.place(s, 1590 - i * 5, 660 - i * 6, (i - 0.5) * 3, 1, g[1], g[0]); });
    const ap = seg(t, 2.6, 3.05), asq = UI.squash(t, 3.05);
    this.j1.style.opacity = ap > 0 ? 1 : 0;
    UI.place(this.j1, lerp(1590, 870, eo(ap)), lerp(660, 612, eo(ap)) - UI.hop(ap) * 220, lerp(30, -3, eo(ap)), 1, asq[1], asq[0]);
    const bp = seg(t, 3.9, 4.35), bsq = UI.squash(t, 4.35);
    this.j2.style.opacity = bp > 0 ? 1 : 0;
    UI.place(this.j2, lerp(150, 880, eo(bp)), lerp(660, 606, eo(bp)) - UI.hop(bp) * 220, lerp(-30, 5, eo(bp)), 1, bsq[1], bsq[0]);
    const up = seg(t, 4.4, 4.7);
    this.jj.style.opacity = up * (1 - seg(t, 5.3, 5.6));
    this.jj.style.transform = 'scale(' + lerp(0.3, 1, eob(up, 1.9)) * kit.breathe(t, 0.03, 1.2) + ') rotate(-5deg)';
    const mv = seg(t, 5.5, 6.15), e = eio(mv);
    this.pile.style.opacity = 1 - seg(t, 6.05, 6.2);
    this.pile.style.transform = 'translate(' + ((1590 - 870 - 40) * e) + 'px,' + (40 * e - UI.hop(mv) * 140) + 'px) scale(' + lerp(1, 0.7, e) + ')';
    const wp = seg(t, 6.2, 6.5);
    this.who.style.opacity = wp; this.who.style.transform = 'scale(' + lerp(0.5, 1, eob(wp, 1.8)) + ')';
  },
});
},
"win": function (kit) {
const { seg, eo, ei, eob, eio, lerp } = kit;
const WN_F = [['5', '♥'], ['K', '♣'], ['9', '♦'], ['2', '♠']];
kit.scene('win', {
  init(kit) {
    this.f = UI.frame(kit, { sec: 'HOW TO WIN', c: '--main', head: 'Play all your cards first, and you WIN!', sub: 'Watch out: taking a pile gives you more cards to play.', subAt: 2.4 });
    const w = this.f.w;
    this.spot = kit.h('<div class="pile-spot" style="--c:var(--sky);left:1050px;top:604px"></div>'); w.append(this.spot);
    this.cards = WN_F.map(f => { const b = UI.card(kit); const c = UI.card(kit, f[0], f[1]); w.append(b); w.append(c); return { b, c }; });
    this.cnt = kit.h('<div class="chip" style="--c:var(--accent);left:430px;top:930px">4 cards left</div>'); w.append(this.cnt);
    this.star = kit.h('<div class="line" style="position:absolute;left:400px;top:560px;width:300px;text-align:center;font-size:280px;color:var(--main);margin:0">★</div>'); w.append(this.star);
    this.tag = kit.h('<div class="tag" style="--c:var(--lime);left:420px;top:900px;font-size:60px">You win!</div>'); w.append(this.tag);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, kit.dur);
    let left = 4;
    this.cards.forEach((o, i) => {
      const k = 3 - i, t0 = 3.4 + k * 0.6, p = seg(t, t0, t0 + 0.5), flip = seg(t, t0 + 0.05, t0 + 0.35);
      if (p >= 1) left--;
      const arrive = eob(seg(t, 1.2 + i * 0.08, 1.7 + i * 0.08), 1.6);
      const x = lerp(500 - i * 5, 1058 + k * 4, eio(p)), y = lerp(lerp(1200, 620 - i * 6, arrive), 612 - k * 4, eio(p)) - UI.hop(p) * 200;
      const sx = Math.abs(Math.cos(flip * Math.PI)), face = flip >= 0.5, sq = UI.squash(t, t0 + 0.5);
      o.b.style.opacity = face ? 0 : (arrive > 0 ? 1 : 0); o.c.style.opacity = face ? 1 : 0;
      const r = lerp((i - 1.5) * 2, k * 4 - 6, eio(p));
      UI.place(o.b, x, y, r, 1, sx * sq[0], sq[1]); UI.place(o.c, x, y, r, 1, sx * sq[0], sq[1]);
    });
    this.cnt.textContent = left + (left === 1 ? ' card left' : ' cards left');
    const cp = seg(t, 1.8, 2.1);
    this.cnt.style.opacity = cp * (1 - seg(t, 5.6, 5.8));
    const sp = seg(t, 5.7, 6.1);
    this.star.style.opacity = sp;
    this.star.style.transform = 'scale(' + lerp(0.2, 1, eob(sp, 1.9)) * kit.breathe(t, 0.04, 1.4) + ') rotate(' + lerp(-90, 0, eo(sp)) + 'deg)';
    const tp = seg(t, 5.9, 6.2);
    this.tag.style.opacity = tp;
    this.tag.style.transform = 'scale(' + lerp(0.4, 1, eob(tp, 1.9)) + ')';
  },
});
},
"recap": function (kit) {
const { seg, eo, eob, lerp } = kit;
kit.scene('recap', {
  init(kit) {
    this.f = UI.frame(kit, { head: 'Push!', size: 280, top: 150, width: 900, headAt: 0.3, sub: 'Now shuffle up and play!', subAt: 1.3 });
    this.f.head.style.color = 'var(--main)';
    this.f.sub.style.fontSize = '64px'; this.f.sub.style.color = 'var(--second)';
    const w = this.f.w;
    this.bar = kit.h('<div style="position:absolute;left:104px;top:600px;width:360px;height:18px;border-radius:9px;background:var(--accent);transform-origin:0 50%"></div>'); w.append(this.bar);
    this.logo = kit.h('<div style="position:absolute;left:104px;top:680px;padding:12px;border-radius:20px;background:color-mix(in srgb, var(--ground) 70%, var(--ink));box-shadow:0 10px 0 rgba(0,0,0,.25);transform-origin:50% 100%"><img src="' + kit.assets.url('logo.webp') + '" alt="Kyleigh&#39;s Cards" style="display:block;width:200px;height:300px;border-radius:8px;background:var(--second);object-fit:contain"></div>'); w.append(this.logo);
    this.byline = kit.h('<div class="words" style="left:360px;top:860px;width:600px"><p class="sub" style="color:var(--second);font-size:44px">By Kyleigh&#39;s Cards</p></div>'); w.append(this.byline);
    this.qr = kit.h('<div style="position:absolute;left:1180px;top:110px;width:560px;height:560px;border-radius:36px;background:var(--second);box-shadow:0 14px 0 rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center"><img src="' + kit.assets.url('qr.png') + '" alt="QR code to play Push" style="display:block;width:504px;height:504px;image-rendering:pixelated"></div>'); w.append(this.qr);
    this.scan = kit.h('<div class="words" style="left:1060px;top:720px;width:800px;align-items:center;text-align:center"><p class="line" style="font-size:72px">Scan to play with friends!</p><p class="chip" style="position:static;--c:var(--main);font-size:40px">kyleighscards.github.io/push</p></div>'); w.append(this.scan);
  },
  render(t, kit) {
    UI.frameRender(kit, this.f, t, 999);
    this.bar.style.transform = 'scaleX(' + eo(seg(t, 1.8, 2.3)) + ')';
    const lp = seg(t, 2.3, 2.8);
    this.logo.style.opacity = lp;
    this.logo.style.transform = 'scale(' + lerp(0.5, 1, eob(lp, 1.8)) + ') rotate(' + (-3 + Math.sin(t * 1.5) * 1.5) + 'deg)';
    const bp = seg(t, 2.7, 3.1);
    this.byline.style.opacity = bp; this.byline.style.transform = 'translateY(' + lerp(20, 0, eo(bp)) + 'px)';
    const qp = seg(t, 1.0, 1.6);
    this.qr.style.opacity = qp;
    this.qr.style.transform = 'scale(' + lerp(0.4, 1, eob(qp, 1.7)) * kit.breathe(t, 0.01, 2.8) + ')';
    const sp = seg(t, 1.9, 2.4);
    this.scan.style.opacity = sp; this.scan.style.transform = 'translateY(' + lerp(24, 0, eo(sp)) + 'px)';
  },
});
}
}
};
