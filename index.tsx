// Novus Global Fall Retreat schedule, password protected, with breakout sign-ups.
// Variables: SITE_PASSWORD (required), DATABASE_URL (Railway Postgres, for sign-ups).
import { sql } from "bun";

const PAGE: string = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#000000">
<style>
:root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
body { margin: 0; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
<title>Novus Global Fall Retreat</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap">
<style>
/* Layout: one continuous scroll, Monday to Thursday. Night mountain hero with gondola, sticky day jump bar, timeline per day, live "now" marker.
   Brand: Novus Global Corporate Identity. Black + greys primary, acid blue only for highlights. Futura headers (Jost stand-in), Avenir body (Nunito Sans stand-in). */
:root {
  --black: #000000;
  --g1: #191919;
  --g2: #252829;
  --g3: #3E3A39;
  --g4: #B3B5B8;
  --g5: #DADBDC;
  --g6: #F1F2F2;
  --white: #FFFFFF;
  --acid: #4FC4FC;
  --blue: #41A4D3;
  --deep: #0E3041;
  --font-head: Futura, "Futura PT", "Jost", "Century Gothic", sans-serif;
  --font-body: "Avenir Next", Avenir, "Nunito Sans", "Segoe UI", system-ui, sans-serif;
  --track: .28em;
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body {
  background: var(--g1); color: var(--g5);
  font-family: var(--font-body); font-size: 16px; line-height: 1.55; font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 680px; margin: 0 auto; padding-inline: 16px; }
h1, h2, h3, h4 { text-wrap: balance; margin: 0; font-weight: 500; }
p { margin: 0; }
button { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--acid); outline-offset: 2px; border-radius: 4px; }
.caps { font-family: var(--font-head); text-transform: uppercase; letter-spacing: var(--track); font-weight: 500; }

/* Hero */
.hero { position: relative; overflow: hidden; background: linear-gradient(180deg, #000 0%, #05121a 45%, #0E3041 100%); }
.stars { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hero .wrap { position: relative; z-index: 1; padding-block: 26px 112px; display: grid; gap: 16px; }
.wordmark { display: inline-flex; align-items: center; gap: .55em; font-family: var(--font-head); font-weight: 500; letter-spacing: .32em; font-size: .82rem; color: var(--white); text-transform: uppercase; }
.wordmark svg { width: 2.1em; height: 1.3em; flex: none; }
.hero .kicker { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .3em; font-size: .78rem; color: var(--g4); }
.hero h1 { font-family: var(--font-head); font-weight: 500; text-transform: uppercase; letter-spacing: .14em; font-size: clamp(2rem, 9.4vw, 3.4rem); line-height: 1.02; color: var(--white); }
.hero h1 span { display: block; color: var(--g4); font-weight: 300; }
.ten { display: flex; align-items: center; gap: 14px; }
.ten b { font-family: var(--font-head); font-weight: 300; font-size: 3rem; line-height: .8; color: var(--acid); letter-spacing: .02em; }
.ten span { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .3em; font-size: .78rem; color: var(--g5); line-height: 1.5; border-left: 1px solid var(--blue); padding-left: 14px; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 4px 18px; font-size: .92rem; color: var(--g4); }
.hero-meta strong { color: var(--white); font-weight: 600; }
.ridge { position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: 128px; display: block; }

/* Live banner */
.live { background: var(--deep); border-bottom: 1px solid #1d4a63; }
.live .wrap { padding-block: 12px 14px; display: grid; gap: 10px; }
.live-rows { display: grid; gap: 4px; min-width: 0; }
.live-row { display: flex; gap: 10px; align-items: baseline; min-width: 0; }
.live-label { flex: none; width: 4.8rem; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .22em; font-size: .7rem; color: var(--acid); }
.live-text { min-width: 0; font-weight: 600; color: var(--white); }
.live-text span { font-weight: 400; color: var(--g4); }
.jump { justify-self: start; border: 1px solid var(--acid); background: transparent; color: var(--acid); border-radius: 999px; padding: 6px 12px; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .16em; font-size: .7rem; cursor: pointer; white-space: nowrap; }
.jump:hover { background: var(--acid); color: var(--black); }

/* Sticky day bar */
.daybar { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: rgba(25,25,25,.94); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border-bottom: 1px solid var(--g2); }
.daybar .wrap { display: grid; gap: 8px; padding-block: 8px 9px; }
.days4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.subbar { display: flex; border: 1px solid var(--g3); border-radius: 999px; overflow: hidden; background: rgba(0,0,0,.35); }
.sublink { flex: 1 1 auto; text-align: center; text-decoration: none; white-space: nowrap; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .04em; font-size: .6rem; padding: 7px 3px; color: var(--g5); }
.sublink + .sublink { border-left: 1px solid var(--g3); }
.sublink[aria-current="true"] { background: #255C78; color: var(--white); }
#me, #info, #about, #nobility, #participation { scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 120px); }
.daylink { text-decoration: none; display: grid; justify-items: center; padding: 5px 2px 6px; border-radius: 10px; color: var(--g4); position: relative; background: var(--g2); border: 1px solid var(--g3); box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.35); }
.daylink .d { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .22em; font-size: .68rem; }
.daylink .n { font-family: var(--font-head); font-size: 1.45rem; line-height: 1.1; color: var(--g6); font-weight: 400; }
.daylink[aria-current="true"] { background: #255C78; border-color: #41A4D3; color: var(--white); }
.daylink[aria-current="true"] .n { color: var(--white); }
.daylink .today { position: absolute; top: 6px; right: 14%; width: 6px; height: 6px; border-radius: 50%; background: var(--acid); }

/* Day sections */
.day { padding-block: 22px 4px; scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 120px); }
.day + .day { border-top: 0; }
.day-head { display: grid; gap: 4px; margin-bottom: 18px; background: linear-gradient(135deg, #0E3041 0%, #1A4A63 100%); border: 1px solid #255C78; border-radius: 16px; padding: 14px 16px 16px; }
.day-head .dmeta { display: flex; gap: 12px; align-items: baseline; font-family: var(--font-head); text-transform: uppercase; letter-spacing: var(--track); font-size: .74rem; color: var(--acid); }
.day-head .dmeta b { color: var(--white); font-weight: 500; }
.day-head h2 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .16em; font-size: clamp(1.45rem, 6.4vw, 2rem); line-height: 1.05; color: var(--white); font-weight: 500; }
.day-head p { color: var(--g5); max-width: 60ch; font-size: .92rem; }

.tl { list-style: none; margin: 0; padding: 0; }
.item { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr); gap: 0 12px; scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 184px); }
.time { text-align: right; font-variant-numeric: tabular-nums; padding-top: 10px; }
.time .s { font-family: var(--font-head); font-weight: 500; font-size: 1.22rem; line-height: 1.1; display: block; color: var(--white); letter-spacing: .02em; }
.time .s small { font-size: .62rem; letter-spacing: .12em; margin-left: 3px; color: var(--g4); }
.time .e { display: block; font-size: .74rem; color: var(--g4); margin-top: 2px; }
.body { position: relative; border-left: 1px solid var(--g3); padding: 0 0 16px 16px; min-width: 0; display: grid; gap: 6px; align-content: start; }
.card { position: relative; background: var(--g2); border: 1px solid #303435; border-radius: 12px; padding: 12px 14px 13px; display: grid; gap: 5px; min-width: 0; }
details.card > summary { list-style: none; cursor: pointer; display: grid; gap: 5px; padding-right: 34px; }
details.card > summary::-webkit-details-marker { display: none; }
button.card { width: 100%; text-align: left; font: inherit; color: inherit; cursor: pointer; padding-right: 48px; }
.chev { position: absolute; right: 12px; top: 12px; width: 26px; height: 26px; border-radius: 50%; background: #255C78; }
.chev::after { content: ""; position: absolute; left: 9px; top: 7px; width: 7px; height: 7px; border-right: 1.5px solid var(--g6); border-bottom: 1.5px solid var(--g6); transform: rotate(45deg); }
details[open] > summary .chev::after, button.card[aria-expanded="true"] .chev::after { transform: rotate(-135deg); top: 10px; }
.more { display: grid; gap: 8px; margin-top: 8px; padding-top: 10px; border-top: 1px solid var(--g3); }
.meta { font-size: .86rem; color: var(--g4); }
.meta b { color: var(--g6); font-weight: 600; }
.pickstat { font-size: .88rem; color: var(--g4); }
.rnote { padding: 12px 14px; font-size: .9rem; color: var(--g4); border-bottom: 1px solid var(--g3); background: #212425; }
.controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 16px; font-size: .88rem; color: var(--g4); }
.controls button { flex: none; border: 1px solid #3181A8; background: #0E3041; color: var(--g6); border-radius: 999px; padding: 7px 14px; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .14em; font-size: .68rem; cursor: pointer; }
.main .card { background: #1D2B33; border-color: #2B5266; }
.optional .card { background: transparent; border-style: dashed; border-color: var(--g3); }
.body::before { content: ""; position: absolute; left: -6px; top: 14px; width: 11px; height: 11px; border-radius: 50%; background: var(--g1); border: 1px solid var(--g4); }
.day .item:last-child .body { border-left-color: transparent; }

.word { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .26em; font-size: 1.02rem; line-height: 1.1; color: var(--blue); font-weight: 500; }
.item h3 { font-size: 1.05rem; font-weight: 700; line-height: 1.3; color: var(--white); }
.who { font-size: .92rem; font-weight: 600; color: var(--g6); }
.who span { font-weight: 400; color: var(--g4); }
.desc { color: var(--g4); font-size: .95rem; max-width: 62ch; }
.chips { display: flex; flex-wrap: wrap; gap: 4px 0; align-items: center; font-size: .82rem; color: var(--g4); }
.chips:empty { display: none; }
.chip { line-height: 1.5; font-size: .82rem; color: var(--g4); }
.chip:not(.now) + .chip::before { content: "·"; margin: 0 7px; color: #6b7072; }
.chip.everyone { color: var(--g5); font-weight: 600; }
.chip.optl { font-style: italic; }
.chip.place { color: var(--g5); }
.chip.now { background: var(--acid); color: var(--black); font-weight: 700; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .14em; font-size: .62rem; padding: 2px 8px; border-radius: 999px; margin-right: 8px; }

.main .body::before { background: var(--blue); border-color: var(--blue); }
.brk .body { padding-bottom: 16px; padding-top: 0; }
.brk .time { padding-top: 0; }
.brk .body::before { width: 7px; height: 7px; left: -4px; top: 8px; border: 0; background: var(--g4); }
.brk h3 { font-size: .9rem; font-weight: 400; color: var(--g4); }
.brk .time .s { font-size: .98rem; color: var(--g4); }
.fin h3 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .2em; font-size: .85rem; font-weight: 500; color: var(--white); }

.steps { list-style: none; margin: 4px 0 0; padding: 0; display: grid; gap: 3px; font-size: .92rem; }
.steps li { display: grid; grid-template-columns: 4.4rem 1fr; gap: 8px; font-variant-numeric: tabular-nums; }
.steps b { font-weight: 700; color: var(--white); }
.steps span { color: var(--g5); }

.prompts { margin: 4px 0 0; padding-left: 1.1rem; display: grid; gap: 3px; font-size: .93rem; color: var(--g4); }
.closer { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .14em; font-size: 1.1rem; line-height: 1.3; margin-top: 8px; color: var(--white); }

/* Breakout rounds */

.rn { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .24em; font-size: .68rem; color: var(--blue); }
.rtitle { display: block; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .16em; font-size: 1.12rem; line-height: 1.2; color: var(--white); font-weight: 500; }

.round-card { grid-column: 1 / -1; background: var(--g2); border: 1px solid #303435; border-radius: 14px; overflow: hidden; margin-bottom: 18px; }
.item.round .body { padding-bottom: 16px; }
.opts { list-style: none; margin: 0; padding: 0; }
.opt { padding: 14px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 4px; border-top: 1px solid var(--g3); }
.opt:nth-child(even) { background: #2A2D2E; }
.opt:first-child { border-top: 0; }
.opt > div { display: grid; gap: 3px; min-width: 0; }
.opt h4 { font-size: 1rem; line-height: 1.3; font-weight: 700; color: var(--white); font-family: var(--font-body); }
.opt .lead { font-size: .88rem; font-weight: 600; color: var(--g5); }
.opt .for { font-size: .85rem; color: var(--g4); }
.opt .for b { font-weight: 600; color: var(--g6); }
.opt .what { font-size: .85rem; color: var(--g4); }

/* Now marker */
.item.is-now .body::before { background: var(--acid); border-color: var(--acid); box-shadow: 0 0 0 5px rgba(79,196,252,.25); }
.item.is-now .card { border-color: var(--acid); }
@media (prefers-reduced-motion: no-preference) {
  .item.is-now .body::before { animation: pulse 2.4s ease-in-out infinite; }
  @keyframes pulse { 50% { box-shadow: 0 0 0 10px rgba(79,196,252,0); } }
}
.item.is-past { opacity: .45; }

/* Story sections */
.section { padding-block: 34px; border-top: 1px solid var(--g3); display: grid; gap: 16px; }
.section h2 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .2em; font-size: 1.35rem; color: var(--white); font-weight: 500; line-height: 1.2; }
.section > p { color: var(--g4); max-width: 62ch; }
.arc { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; counter-reset: arc; }
.arc li { counter-increment: arc; display: grid; grid-template-columns: 2.2rem 1fr; align-items: baseline; font-size: 1.02rem; font-weight: 600; color: var(--white); }
.arc li::before { content: counter(arc); font-family: var(--font-head); font-weight: 300; color: var(--blue); font-size: 1.3rem; }
.arc li span { display: block; font-weight: 400; font-size: .85rem; color: var(--g4); }
.pillars { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; border-top: 1px solid var(--g3); border-left: 1px solid var(--g3); }
.pillar { display: grid; gap: 6px; align-content: start; min-width: 0; padding: 16px 14px; border-right: 1px solid var(--g3); border-bottom: 1px solid var(--g3); background: var(--g2); }
.pillar h3 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .22em; font-size: .9rem; color: var(--blue); font-weight: 500; }
.pillar p { font-size: .88rem; color: var(--g4); }
.pillar .link { font-size: .82rem; color: var(--g5); font-weight: 600; }
.quote { border: 1px solid var(--g3); border-radius: 14px; padding: 20px 18px; display: grid; gap: 10px; background: var(--g2); }
.quote .q { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .12em; font-size: 1.12rem; line-height: 1.35; color: var(--white); }
.quote p { color: var(--g4); font-size: .92rem; }
.facts { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.facts li { display: grid; grid-template-columns: 7.5rem 1fr; gap: 10px; font-size: .95rem; color: var(--g5); }
.sub { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .2em; font-size: .8rem; color: var(--white); font-weight: 500; padding-top: 10px; border-top: 1px solid var(--g3); }
.sub:first-of-type { border-top: 0; padding-top: 0; }
.finder { display: grid; gap: 10px; background: var(--g2); border: 1px solid var(--g3); border-radius: 14px; padding: 14px; }
.finder label { font-size: .9rem; color: var(--g5); }
.finder input { font: inherit; font-size: 1rem; width: 100%; padding: 11px 13px; border-radius: 10px; border: 1px solid var(--g3); background: var(--g1); color: var(--white); }
.finder input:focus { outline: none; border-color: var(--acid); }
.fres { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.fres > li { display: grid; gap: 1px; padding: 9px 12px; border-radius: 10px; background: #1D2B33; border: 1px solid #2B5266; }
.fres b { color: var(--white); font-weight: 700; }
.fres span { color: var(--g5); font-size: .92rem; }
.fres i { font-style: normal; color: var(--blue); font-family: var(--font-head); text-transform: uppercase; letter-spacing: .14em; font-size: .66rem; margin-right: 6px; }
#lookup { scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 120px); }
.golook { justify-self: start; border: 1px solid #41A4D3; background: #0E3041; color: var(--white); border-radius: 999px; padding: 7px 14px; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .12em; font-size: .68rem; cursor: pointer; }
.fnote { font-size: .82rem; color: var(--g4); }
.myplan { padding-top: 18px; scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 120px); }
.mp-card { display: grid; gap: 12px; background: linear-gradient(160deg, #0E3041 0%, #13394C 100%); border: 1px solid #41A4D3; border-radius: 16px; padding: 16px; }
.mp-card h2 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .2em; font-size: 1.1rem; color: var(--white); font-weight: 500; }
.mp-sub { font-size: .9rem; color: var(--g5); }
.mp-card label { font-size: .86rem; color: var(--g5); }
.mp-card input { font: inherit; font-size: 1rem; width: 100%; padding: 11px 13px; border-radius: 10px; border: 1px solid #3181A8; background: var(--g1); color: var(--white); }
.mp-card input:focus { outline: none; border-color: var(--acid); }
.plan { display: grid; gap: 7px; margin: 0; padding: 12px; list-style: none; background: rgba(0,0,0,.28); border-radius: 12px; }
.plan-name { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.plan-name b { color: var(--white); font-size: 1.02rem; }
.plan-row { display: grid; grid-template-columns: 6.6rem minmax(0, 1fr); gap: 10px; font-size: .9rem; color: var(--g6); }
.plan-row i { font-style: normal; color: var(--acid); font-family: var(--font-head); text-transform: uppercase; letter-spacing: .12em; font-size: .64rem; padding-top: 3px; }
.plan-row .todo { color: #F2C98A; }
.plan-row .leadrow { color: var(--white); font-weight: 700; }
.tbtn { justify-self: start; border: 1px solid #41A4D3; background: #0E3041; color: var(--white); border-radius: 999px; padding: 6px 12px; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .12em; font-size: .64rem; cursor: pointer; }
.tbtn.solid { background: #41A4D3; color: #000; border-color: #41A4D3; font-weight: 600; }
.linkbtn { background: none; border: 0; padding: 0; color: var(--acid); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.sign { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; margin-top: 8px; }
.sign .cnt { font-size: .82rem; color: var(--g5); }
.sign .mine { font-size: .82rem; color: var(--acid); font-weight: 700; }
.goinglist { width: 100%; margin: 2px 0 0; padding: 8px 10px; list-style: none; background: var(--g1); border-radius: 8px; font-size: .84rem; color: var(--g5); columns: 2; column-gap: 12px; }
.signnote { padding: 10px 14px; font-size: .86rem; color: #F2C98A; border-bottom: 1px solid var(--g3); }
.pick { position: fixed; inset: 0; z-index: 20; background: rgba(0,0,0,.7); display: grid; align-items: end; justify-items: center; }
.pick-in { width: 100%; max-width: 520px; background: var(--g2); border-top: 2px solid #41A4D3; border-radius: 16px 16px 0 0; padding: 18px 16px calc(18px + env(safe-area-inset-bottom, 0px)); display: grid; gap: 10px; }
.pick-in h3 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .18em; font-size: .95rem; color: var(--white); }
.pick-in input { font: inherit; font-size: 1rem; width: 100%; padding: 11px 13px; border-radius: 10px; border: 1px solid #3181A8; background: var(--g1); color: var(--white); }
.pick-list { display: grid; gap: 6px; max-height: 40vh; overflow-y: auto; }
.pick-list button { text-align: left; padding: 10px 12px; border-radius: 10px; border: 1px solid #2B5266; background: #1D2B33; color: var(--white); font: inherit; cursor: pointer; }
.board { display: grid; gap: 8px; background: var(--g2); border: 1px solid var(--g3); border-radius: 12px; padding: 12px 14px; }
.board h4 { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .16em; font-size: .74rem; color: var(--blue); font-weight: 500; margin-top: 6px; }
.board .bday { font-weight: 700; color: var(--white); font-size: .9rem; margin-top: 4px; }
.board ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 3px; }
.board li { display: grid; grid-template-columns: 3.6rem minmax(0, 1fr); gap: 8px; font-size: .86rem; color: var(--g5); padding: 3px 0; border-top: 1px solid #303435; }
.board li b { color: var(--white); font-weight: 600; font-variant-numeric: tabular-nums; }
.board ul.names { display: block; columns: 2; column-gap: 12px; }
.board ul.names li { display: block; }
.board li.me, .board .mine { color: var(--acid); font-weight: 700; }
.board small { color: var(--g4); }
.sugtag { font-size: .7rem; font-weight: 700; color: #000; background: #F2C98A; border-radius: 999px; padding: 2px 9px; }
.dlist { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; border: 1px solid var(--g3); border-radius: 10px; overflow: hidden; }
.dlist li { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 10px; padding: 8px 11px; font-size: .9rem; border-top: 1px solid var(--g3); }
.dlist li:first-child { border-top: 0; }
.dlist li:nth-child(even) { background: #2A2D2E; }
.dlist b { color: var(--white); font-weight: 600; }
.dlist a { color: var(--acid); font-weight: 600; text-underline-offset: 3px; }
.dlist small { color: var(--g4); font-size: .8rem; }
.dcall { background: #0E3041; border: 1px solid #41A4D3; border-radius: 10px; padding: 10px 12px; font-size: .92rem; color: var(--g5); }
.dcall b { color: var(--white); font-weight: 700; }
.dhead { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .18em; font-size: .72rem; color: var(--blue); }
.xlink { color: var(--acid); font-weight: 600; text-underline-offset: 3px; white-space: nowrap; }
.facts b { font-family: var(--font-head); text-transform: uppercase; letter-spacing: .2em; font-size: .68rem; color: var(--blue); font-weight: 500; padding-top: 4px; }
.foot { padding-block: 34px 48px; text-align: center; color: var(--g4); font-size: .85rem; display: grid; justify-items: center; gap: 14px; border-top: 1px solid var(--g3); }
.foot strong { display: block; font-family: var(--font-head); text-transform: uppercase; letter-spacing: .16em; font-weight: 500; font-size: 1.05rem; color: var(--white); line-height: 1.4; }

@media (max-width: 380px) {
  .item { grid-template-columns: 3.9rem minmax(0, 1fr); gap: 0 10px; }
  .pillars { grid-template-columns: 1fr; }
  .facts li { grid-template-columns: 1fr; gap: 0; }
}
</style>

</head>
<body>
<header class="hero">
  <svg class="stars" id="stars" aria-hidden="true" preserveAspectRatio="none"></svg>
  <div class="wrap">
    <div class="wordmark" aria-label="Novus Global">
      <span>Novus</span>
      <svg viewBox="0 0 40 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="butt">
        <path d="M1 13.2 H9.5 A9.5 9.5 0 0 0 28.5 13.2"/>
        <path d="M11.5 10.8 A9.5 9.5 0 0 1 30.5 10.8 H39"/>
      </svg>
      <span>Global</span>
    </div>
    <div class="kicker">Together with Meta Performance Institute</div>
    <h1>Fall Retreat <span>2026</span></h1>
    <div class="ten"><b>10</b><span>Celebrating<br>ten years</span></div>
    <div class="hero-meta">
      <span><strong>Park City, Utah</strong></span>
      <span><strong>October 19 to 22</strong></span>
      <span>Grand Summit Hotel</span>
      <span>All times Mountain</span>
    </div>
  </div>
  <svg class="ridge" viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 92 L30 74 L58 84 L96 46 L132 76 L168 56 L204 82 L246 34 L286 66 L322 50 L362 72 L400 58 L400 150 L0 150 Z" fill="#255C78" opacity=".7"/>
    <path d="M0 112 L44 92 L86 106 L130 80 L176 102 L222 84 L268 108 L316 88 L360 102 L400 92 L400 150 L0 150 Z" fill="#163F55"/>
    <path d="M0 134 L54 120 L112 132 L170 118 L236 133 L300 121 L356 131 L400 124 L400 150 L0 150 Z" fill="#191919"/>
    <line x1="-4" y1="128" x2="250" y2="36" stroke="#FFFFFF" stroke-width="1" opacity=".55" vector-effect="non-scaling-stroke"/>
    <g transform="translate(150 72.2)">
      <line x1="0" y1="0" x2="0" y2="7" stroke="#FFFFFF" stroke-width="1" opacity=".75" vector-effect="non-scaling-stroke"/>
      <rect x="-4.5" y="7" width="9" height="8" rx="1.6" fill="#4FC4FC"/>
    </g>
  </svg>
</header>

<div class="live" id="live" hidden>
  <div class="wrap">
    <div class="live-rows" id="liveRows"></div>
    <button class="jump" type="button" id="jumpNow">Jump to now</button>
  </div>
</div>

<nav class="daybar" aria-label="Jump to a section">
  <div class="wrap">
    <div class="days4" id="daybar"></div>
    <div class="subbar" id="subbar"></div>
  </div>
</nav>

<div class="wrap controls"><span>Tap any session for details.</span><button type="button" id="expandAll" aria-pressed="false">Expand all</button></div>

<section class="wrap myplan" id="me" aria-labelledby="mpTitle">
  <div class="mp-card">
    <div><h2 id="mpTitle">My Plan</h2><p class="mp-sub">Your roommate, your breakouts, and where you eat Tuesday night.</p></div>
    <div id="mpMe"></div>
    <label for="rmq">Look up anyone by first or last name</label>
    <input id="rmq" type="search" autocomplete="off" placeholder="e.g. Megan">
    <ul class="fres" id="rmres" aria-live="polite"></ul>
    <p class="fnote">Room numbers are handed out at hotel check-in. Flight times and ride buddies are as reported on the registration form, so if plans changed, check with each other. Something look wrong? Text Laura Vander Neut, our travel advisor, at <a class="xlink" href="sms:+13109823513">(310) 982-3513</a>.</p>
  </div>
</section>

<main class="wrap" id="days"></main>

<div class="wrap">
  <section class="section" id="info" aria-labelledby="gtkTitle">
    <h2 id="gtkTitle">Good to Know</h2>

    <h3 class="sub">Getting here</h3>
    <ul class="facts">
      <li><b>Where</b><span>Grand Summit Hotel, Canyons Village, Park City. Main sessions are in the Kokopelli Ballroom.</span></li>
      <li><b>From the airport</b><span>Salt Lake City airport is about 45 minutes away by car. Plan your ride ahead. Lots of people share a rideshare, so post your arrival time in the WhatsApp group to find a ride buddy.</span></li>
      <li><b>Ride board</b><span>Everyone's flight times are in one place, and My Plan shows who lands near you. <button type="button" class="linkbtn" id="rideBtn">Show the ride board</button></span></li>
      <li><b>Check-in</b><span>Welcome table opens Monday at 3:30 PM in the Kokopelli Lobby. Pick up your welcome bag, name tag, and lanyard. Arriving later? They will be at the back of the Kokopelli Ballroom Tuesday morning. Hotel check-in opens at 4:00 PM.</span></li>
      <li><b>Altitude</b><span>Park City sits around 7,000 feet. Drink more water than you think you need, especially the first day.</span></li>
    </ul>

    <div class="board" id="rides" hidden></div>

    <h3 class="sub">Weather + what to wear</h3>
    <ul class="facts">
      <li><b>Weather</b><span>Sun, rain, and maybe snow if it gets cold enough. Highs in the mid 50s, lows in the 30s and 40s. <a class="xlink" href="https://www.accuweather.com/en/us/park-city/84060/10-day-weather-forecast/341178" target="_blank" rel="noopener">See the 10-day forecast</a></span></li>
      <li><b>Pack</b><span>A warm, packable jacket. Whatever squishes into your bag and keeps you warm. And bring your lanyard with the pins you have earned at past retreats.</span></li>
      <li><b>Monday night</b><span>Warm and casual. Think après-ski or lodge chic. The gondola ride up to Red Pine Lodge takes about 8 minutes and the bar opens outside by the fire pits. If it is too windy or there is lightning, the dinner moves to the Kokopelli Ballroom.</span></li>
      <li><b>Tuesday night</b><span>Casual. Dress for the restaurant you are eating at.</span></li>
      <li><b>GLO-BALL</b><span>Semi-formal to black-tie optional. Cocktail attire is perfect. If you own a ballgown, this is the night to wear it.</span></li>
    </ul>

    <h3 class="sub">Food + drinks</h3>
    <ul class="facts">
      <li><b>Breakfast</b><span>On your own each morning. Kimball Junction is a short drive. Have a mini fridge in your room? DoorDash or Instacart can deliver groceries to the hotel. Tuesday's 8:00 AM breakfast session is optional.</span></li>
      <li><b>Coffee</b><span>Coffee, tea, soda, water, and sparkling water are set up by the Kokopelli Ballroom before the morning session each day and stay out until lunch.</span></li>
      <li><b>Lunch</b><span>Provided Tuesday (buffet) and Wednesday (grab-and-go). On Wednesday, grab the boxed lunch you picked on your registration form. Your order is in My Plan. Gluten-free and dairy-free options are labeled. <button type="button" class="linkbtn" id="lunchBtn">See every order</button></span></li>
      <li><b>Dinner</b><span>Monday is a BBQ buffet at Red Pine Lodge. Tuesday, coaches eat with their teams around Park City and pay for their own dinner. All assistants, ops leaders, and staff eat together at The Farm in Canyons Village. Check My Plan at the top to see where you are going. Wednesday is the GLO-BALL buffet.</span></li>
      <li><b>Drinks</b><span>Monday is a cash bar. At GLO-BALL you get one drink ticket, then it is a cash bar.</span></li>
      <li><b>Bring your ID</b><span>Utah checks ID for everyone ordering alcohol, no matter your age. No ID, no drink.</span></li>
    </ul>

    <div class="board" id="lunches" hidden></div>

    <h3 class="sub">During the week</h3>
    <ul class="facts">
      <li><b>My plan</b><span>Your roommate, breakouts, and Tuesday dinner are at the top of the schedule. <button type="button" class="linkbtn" data-go="me">Go to My Plan</button></span></li>
      <li><b>Group chat</b><span>Retreat updates, photos, and ride shares happen in the WhatsApp group. <a class="xlink" href="https://chat.whatsapp.com/GL5firby3EM0xZo0OAshH9" target="_blank" rel="noopener">Join the WhatsApp group</a></span></li>
      <li><b>Travel + rooms</b><span>Questions about your room, arrival, or travel go to Laura Vander Neut, our travel advisor. <a class="xlink" href="tel:+13109823513">(310) 982-3513</a></span></li>
      <li><b>Time zone</b><span>Every time on this page is Mountain Time.</span></li>
      <li><b>Thursday</b><span>Luggage storage is open Thursday morning until 2:00 PM. Look for signs in the lobby. The retreat ends at 11:00 AM.</span></li>
      <li><b>Getting home</b><span>Rides to the airport start leaving from the front drive at 11:30 AM. Make your plan before Thursday: check the departure board in the lobby or post your flight time in the WhatsApp group to share a ride.</span></li>
    </ul>
  </section>

  <section class="section" id="about" aria-labelledby="arcTitle">
    <h2 id="arcTitle">The Arc of the Week</h2>
    <p>As we enter the next decade, we become a community that knows how to build extraordinary meta-performing businesses and lives. This week we work on our business and our businesses, and we protect real time for fun, rest, celebration, and friendship.</p>
    <ol class="arc">
      <li><div>Look what we have created.<span>Monday night + Tuesday morning</span></div></li>
      <li><div>Look who we have become.<span>Tuesday morning</span></div></li>
      <li><div>Name how we want to live and build.<span>The four pillars of nobility</span></div></li>
      <li><div>Look toward who we now get to become.<span>Wednesday morning</span></div></li>
      <li><div>Then get to work.<span>Breakouts, Tuesday + Wednesday afternoons</span></div></li>
    </ol>
  </section>

  <section class="section" id="nobility" aria-labelledby="nobTitle">
    <h2 id="nobTitle">Nobility</h2>
    <p>Four distinct virtues, tightly intertwined. They are a lens for the week, not a filing system. In every session, ask where each one shows up.</p>
    <div class="pillars">
      <div class="pillar"><h3>Prosperity</h3><p>Your choosing to create wealth in an ethical way.</p><span class="link">Creates capacity for generosity.</span></div>
      <div class="pillar"><h3>Generosity</h3><p>Your choosing to sacrifice time, energy, and money for the sake of others less fortunate.</p><span class="link">Strengthens the whole.</span></div>
      <div class="pillar"><h3>Community</h3><p>Your choosing to connect with others both in depth (knowing others and being known) and breadth (catalyzing others knowing and being known).</p><span class="link">Expands creativity.</span></div>
      <div class="pillar"><h3>Creativity</h3><p>Doing all of the above using your unique gifts, talents, passions, and experiences.</p><span class="link">Creates new prosperity.</span></div>
    </div>
  </section>

  <section class="section" id="participation" aria-labelledby="fpTitle">
    <h2 id="fpTitle">Full Participation</h2>
    <div class="quote">
      <div class="q">Given what I'm committed to and what's true right now, where do I need to go to work?</div>
      <p>Becoming whoever you need to become in order to accomplish whatever it is you're committed to. You may be most attracted to the session you need least.</p>
    </div>
    <p>Hold both questions all week: What am I building? What are we building together?</p>
  </section>



  <footer class="foot">
    <strong>We have built something incredible.<br>And we get to keep becoming.</strong>
    <span>Novus Global Fall Retreat 2026</span>
  </footer>
</div>

<script>
(function () {
  var EVERYONE = "Everyone";
  var DAYS = [
    {
      key: "mon", date: "2026-10-19", dow: "Mon", dayName: "Monday", num: "19", title: "Belong",
      intro: "The whole community comes together. We ride up the mountain for sunset and our welcome meal.",
      items: [
        { kind: "session", start: "13:00", end: "16:30", title: "Team Lead Working Time + Lunch", chips: ["Team Leads + execs", "White Pine Parlor 1"],
          who: "Doug, Tricia, Dan, and Jason",
          desc: "Leadership time to prepare teams for the next cycle and align on what Team Leads carry into and out of the retreat." },
        { kind: "session", start: "15:30", end: "17:30", title: "Welcome Table + Event Check-In", chips: ["Kokopelli Lobby"],
          desc: "Check in for the retreat and pick up your welcome bag, name tag, and lanyard. Arriving after 5:30? Your bag, name tag, and lanyard will be at the back of the Kokopelli Ballroom Tuesday morning." },
        { kind: "break", start: "16:00", end: "16:00", title: "Hotel check-in opens. The front desk can hold your bags until then." },
        { kind: "optional", start: "17:15", end: "18:15", title: "Team Prolific Happy Hour", chips: ["Optional", "Red Pine Lodge"],
          who: "Hosted by Team Prolific",
          desc: "For coaches new to the firm since the last Fall Retreat, including our November coaches. Get on the gondola early, around 5:15, and meet Team Prolific at the top for an hour of hang out time before the retreat officially kicks off." },
        { kind: "main", start: "17:15", end: "22:30", hideEnd: true, word: "Belong", title: "Opening Night Reception", chips: [EVERYONE, "Red Pine Lodge"],
          desc: "Welcome, celebration, and recognition of the people who are new to our community. The gondola ride up takes about 8 minutes and it gets cold after dark, so bring a warm jacket. Please be up top by 6:45, when dinner starts. Bring your ID for the bar. If it is too windy or there is lightning, dinner moves to the Kokopelli Ballroom.",
          steps: [["17:15", "Gondola starts loading at the Red Pine Gondola base. It runs nonstop, so hop on anytime."], ["17:30", "Bar opens (cash bar)"], ["18:30", "Sunset"], ["18:45", "Dinner"], ["20:00", "Karaoke"], ["21:00", "Program ends. Head down anytime."], ["22:15", "Last call"], ["22:30", "Venue closes. Last gondola down."]] }
      ]
    },
    {
      key: "tue", date: "2026-10-20", dow: "Tue", dayName: "Tuesday", num: "20", title: "Celebration Day",
      intro: "We look at what we have created over ten years and who we have become, then begin building what's next. The evening is for team dinners around Park City.",
      items: [
        { kind: "optional", start: "07:00", end: "08:00", title: "Novus Global Run Club", chips: ["Optional", "Location TBA"],
          who: "Houston Bradley", desc: "Start the day with a run. All paces welcome." },
        { kind: "optional", start: "08:00", end: "09:00", title: "Breakfast Session: T3 and the Difference Between Coaching and Training", chips: ["Optional", "White Pine Parlor II"],
          who: "Jean-Marie", desc: "A breakfast conversation for anyone who wants to understand T3 and how coaching and training differ." },
        { kind: "main", start: "09:00", end: "09:45", word: "Remember", title: "10th Anniversary", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "JKB",
          desc: "The story of our first decade through clients, coaches, leaders, pivotal moments, and impact. Then the turn toward who we have become." },
        { kind: "break", start: "09:45", end: "10:00", title: "Break" },
        { kind: "main", start: "10:00", end: "11:45", word: "Build", title: "Vision for the Year Ahead", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "Tricia keynote", whoMore: "then a panel with Doug, David, Jaralyn, and Charise",
          desc: "Vision for next year in the areas that matter most, and how it connects to the architecture of your work." },
        { kind: "break", start: "11:45", end: "12:00", title: "Break" },
        { kind: "main", start: "12:00", end: "12:45", word: "Lunch", title: "Becoming a Million Dollar Coach Panel", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "Hosted by Jon", whoMore: "with Dan and Jason",
          desc: "Lunch together at your POD tables. Everyone is in the room and select coaches join the panel. Use the questions at your table to make the morning personal." },
        { kind: "break", start: "12:45", end: "13:00", title: "Head to your Round 1 breakout" },
        { kind: "round", id: "tue1", start: "13:00", end: "13:50", label: "Breakout Round 1", title: "Prescribed Architecture Focus",
          note: "Coaches: choose the room that matches your revenue reality, not the one that sounds most advanced. Assistants and ops leaders: Creating a Meta Performance Client Experience, unless your coach brings you to theirs.",
          options: [
            { sid: "sub100", title: "Sub-100K Basics", lead: "Austin Walker + Shea Smith", for: "Coaches under about $100K in annualized practice revenue and early-stage practice builders",
              what: "The essential blocking and tackling, with practical next steps for stronger sales execution." },
            { sid: "mid", title: "100K to 300K Structure-Building", lead: "JKB", for: "Coaches in the $100K to $250K range",
              what: "Shift from working in the business to building the structures, rhythms, support, and systems for the next level." },
            { sid: "top20", title: "Top-20% Expansion", lead: "Thompson, with Jags for Q&A", for: "Coaches above $250K in annualized revenue",
              what: "Advanced growth work on expansion, leverage, pricing, opportunity, and business architecture." },
            { sid: "cx", title: "Creating a Meta Performance Client Experience", lead: "Megan Hozinsky + Charise Proctor", for: "Operational leaders and assistants who own or shape a client experience in Novus Global or MPI",
              what: "Pick a client experience you own, find where it falls short of Meta Performance, and leave with clear next steps." }
          ] },
        { kind: "break", start: "13:50", end: "14:10", title: "Reset + move to Round 2" },
        { kind: "round", id: "tue2", start: "14:10", end: "15:00", label: "Breakout Round 2", title: "Choose Your Own Adventure",
          note: "You have more agency in this round. Agency is not the same as preference. Sign up below so we can give each session the right size room.", open: true,
          options: [
            { sid: "compete", title: "How Are You Different in the Competitive Landscape?", lead: "Thompson + Jennifer Tharp", for: "Coaches and operational leaders in marketing or business development",
              what: "Raise your conversion rate by knowing the competitive landscape." },
            { sid: "agents", title: "Building Agents + Skills for Your Office", lead: "Chad Richards + Shannon Curran", for: "Coaches and operational leaders interested in AI and office automation",
              what: "Understand and start designing an AI agent that creates real leverage in your office." },
            { sid: "intake", title: "The Art of Creating the Intake", lead: "Kristin Frade + Garland Hunt Jr.", for: "Coaches who want stronger intake and enrollment conversations",
              what: "Build an intake experience that creates clarity, trust, and momentum from the start." },
            { sid: "silos", title: "Understanding (and Avoiding) Silos", lead: "Jean-Marie + Kelsey Carter", for: "Anyone whose role depends on cross-team collaboration",
              what: "See how silos form and what they cost, and build habits and agreements for shared ownership." }
          ] },
        { kind: "session", start: "15:00", end: "17:30", title: "Free Time", chips: ["Optional activities"],
          desc: "Rest, explore, or get outside. If you signed up for the long hike or horseback riding with Wasatch Adventure Group on your registration form, My Plan shows it. Horseback riding is weather permitting." },
        { kind: "optional", start: "15:00", end: "17:30", title: "Long Hike + Climb", chips: ["Optional", "Sign-ups only", "Trail TBA"],
          who: "Rachel Baggech",
          desc: "Likely Lake Blanche Trail: about 7 miles and 3,000 feet of elevation gain. For people who signed up on the registration form. Dress for it and bring water." },
        { kind: "break", start: "16:00", end: "16:00", title: "Team dinner groups posted in the lobby. Find your group and your host." },
        { kind: "main", start: "17:30", end: "21:00", hideEnd: true, word: "Together", title: "Team Dinners", chips: [EVERYONE, "Park City restaurants", "All assistants at The Farm"],
          desc: "Coaches eat with their team in groups of about 10 at restaurants around Park City. All assistants, ops leaders, and staff eat together at The Farm. Your host has the reservation. Coaches pay for their own dinner. Community, connection, and rest are part of the architecture of this week.",
          steps: [["17:30", "Meet your group in the lobby by the front drive"], ["18:00", "Team dinners begin"]],
          rowsCallout: ["Assistants and ops leaders: ", "you are all at The Farm in Canyons Village tonight, along with staff who are not on a coaching team. That includes assistants who support more than one coach. You are not with a coaching team tonight."],
          lookup: true,
          rowsTitle: "Where your team is eating",
          rowsNote: "Find your team lead. The reservation is under their name. Tap a restaurant to open it in Maps. Most are in Old Town, about 15 minutes away by car. Carpool with teammates who have cars, or take a rideshare.",
          rows: [
            ["Austin Walker", "Loma"], ["Shea Smith", "Shabu", "6:15 PM"], ["Jon Roberts", "350 Main Brasserie"],
            ["Ryan Farrell", "Butcher's Chop House"], ["Danny Bowers", "Cafe Terigo"], ["Becca Egger", "Tekila Mexican Grill"],
            ["Amanda Jaggard", "Loma"], ["Keely Ng", "Tekila Mexican Grill"], ["Kimber Liu", "The Eating Establishment"],
            ["Jennifer Tharp", "Le Depot"], ["Chad Richards", "350 Main Brasserie", "6:15 PM"], ["Rosanna Tomiuk", "Shabu"],
            ["All assistants, ops leaders + staff", "The Farm", "Private event, Canyons Village", "nolink"]
          ] }
      ]
    },
    {
      key: "wed", date: "2026-10-21", dow: "Wed", dayName: "Wednesday", num: "21", title: "What's Next Day",
      intro: "We turn forward to the next decade, then go back to work on capability and architecture. The night is for GLO-BALL.",
      items: [
        { kind: "main", start: "09:00", end: "10:15", word: "Envision", title: "Nobility + the Next Decade", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "Dan keynote", whoMore: "then live Q&A hosted by Jason",
          desc: "The four pillars of nobility, my story and our story, and who we get to become to serve 10,000 of the world's most influential leaders. Q&A questions are submitted ahead of time." },
        { kind: "break", start: "10:15", end: "10:30", title: "Break" },
        { kind: "main", start: "10:30", end: "11:45", word: "Own", title: "Ownership + Complaints", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "Jean-Marie + Andrew Ladd",
          desc: "Shorten the half-life of a complaint, find the care underneath it, and move from “someone should fix this” to “what is mine to do.”" },
        { kind: "break", start: "11:45", end: "12:15", title: "Grab-and-go lunch, then head to your breakout" },
        { kind: "round", id: "wed1", start: "12:15", end: "13:30", label: "Breakout Round 1 · Group A", title: "Deeper Development + Leadership",
          note: "What capability would most increase your ability to create what you are committed to? Leaders may direct you to a session based on need, role, and readiness. Sign up below so we can give each session the right size room.", open: true,
          options: [
            { sid: "soul", title: "Soul-Line Coaching for Beginners", lead: "Janet + Ryan Farrell", for: "0 to 18 months in the firm, or still building soul-line proficiency",
              what: "Practical teaching and application on rackets and behaviors, feelings, and beliefs." },
            { sid: "belief", title: "Belief Work", lead: "Laura Lyng + Amanda Jaggard", for: "12+ months in the firm with strong soul-line coaching proficiency",
              what: "Recognize when belief work is needed and work through it directly with a client." },
            { sid: "sprint", title: "Sprint Work", lead: "Karina + Tricia", for: "Coaches and leaders with a meaningful priority that needs focused execution",
              what: "Apply sprint methodology to a real priority and turn insight into concentrated action." },
            { sid: "mpl", title: "Meta Performance Leadership", lead: "Rosie + Dan", for: "Team Leads and operational leaders, plus anyone interested",
              what: "Strengthen leadership through the lens of Meta Performance and leading across the organization." }
          ] },
        { kind: "break", start: "13:30", end: "13:50", title: "Reset + move to Round 2" },
        { kind: "round", id: "wed2", start: "13:50", end: "14:50", label: "Breakout Round 2 · Group B", title: "Architecture Building",
          note: "This is where insight begins turning into structure. Coaches meet with their new coaching team. Everyone else goes to Self-Management for Leaders.",
          options: [
            { sid: "teams", title: "All Coaching Teams", lead: "Your Team Lead", for: "Coaches, by team",
              what: "Another pass through your architecture using everything you have learned at the retreat so far." },
            { sid: "self", title: "Self-Management for Leaders", lead: "Tricia", for: "All operational leaders",
              what: "A longer-form session on how leaders manage themselves." }
          ] },
        { kind: "break", start: "14:50", end: "14:50", title: "Rest window. Protected time before GLO-BALL." },
        { kind: "main", start: "17:45", end: "22:00", word: "Celebrate", title: "GLO-BALL · Dinner + Awards", chips: [EVERYONE, "Kokopelli Ballroom", "Semi-formal"],
          desc: "Ten years of Novus Global. A night of celebration, community, and awards. Dress is semi-formal to black-tie optional. Cocktail attire is perfect, and if you own a ballgown, wear it. Everyone gets one drink ticket, then it is a cash bar.",
          steps: [["17:45", "Doors open"], ["18:00", "Dinner"], ["19:15", "Program and awards begin"], ["22:00", "GLO-BALL ends"]] }
      ]
    },
    {
      key: "thu", date: "2026-10-22", dow: "Thu", dayName: "Thursday", num: "22", title: "Notice",
      intro: "A final community-wide reflection. The retreat closes with the voices of the people in the room.",
      items: [
        { kind: "main", start: "09:00", end: "09:50", word: "Practice", title: "Speakers Salon: Nobility in Practice", chips: [EVERYONE, "Kokopelli Ballroom"],
          who: "Sean Patton + Kristin Frade",
          desc: "Two Novus Global speakers, 18 minutes each, on the pillars of nobility. Then one discussion at your table." },
        { kind: "break", start: "09:50", end: "10:00", title: "Short break" },
        { kind: "main", start: "10:00", end: "11:00", word: "Notice", title: "What Are You Leaving With?", chips: [EVERYONE, "Kokopelli Ballroom"],
          desc: "The community makes meaning of the week together. Come ready to share what mattered most.",
          prompts: [
            "What are you noticing now that you weren't noticing when you arrived?",
            "What did you learn about yourself?",
            "What did you learn about us?",
            "What challenged or changed your thinking?",
            "What are you taking responsibility for?",
            "What do you want this community to know?",
            "What are you leaving committed to?"
          ],
          closer: "What are we now going to do with what we've seen?" },
        { kind: "end", start: "11:00", end: "11:30", title: "Retreat ends. Luggage storage is open until 2:00 PM." },
        { kind: "end", start: "11:30", end: null, title: "Airport rides start leaving from the front drive. Check the departure board in the lobby or use the WhatsApp group to share a ride." }
      ]
    }
  ];

  /* ---------- helpers ---------- */
  function mins(hhmm) { if (!hhmm) return null; var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function fmt(m, withAp) {
    var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 === 0 ? 12 : h % 12;
    var s = h12 + ":" + (mm < 10 ? "0" : "") + mm;
    return withAp === false ? s : s + " " + ap;
  }
  function goTo(key) {
    var t = document.getElementById(key); if (!t) return;
    try { t.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { t.scrollIntoView(true); }
  }
  function chev() { var c = document.createElement("span"); c.className = "chev"; c.setAttribute("aria-hidden", "true"); return c; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { if (v == null) window.localStorage.removeItem(k); else window.localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- stars ---------- */
  (function stars() {
    var svg = document.getElementById("stars");
    svg.setAttribute("viewBox", "0 0 400 300");
    var seed = 7, ns = "http://www.w3.org/2000/svg";
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 0; i < 70; i++) {
      var c = document.createElementNS(ns, "circle");
      var y = rnd() * 220;
      c.setAttribute("cx", (rnd() * 400).toFixed(1));
      c.setAttribute("cy", y.toFixed(1));
      c.setAttribute("r", (rnd() * 0.7 + 0.25).toFixed(2));
      c.setAttribute("fill", "#FFFFFF");
      c.setAttribute("opacity", (0.15 + rnd() * 0.55 * (1 - y / 300)).toFixed(2));
      svg.appendChild(c);
    }
  })();

  /* ---------- render ---------- */
  var barEl = document.getElementById("daybar");
  var daysEl = document.getElementById("days");
  var linkNodes = {}, dayNodes = {};

  DAYS.forEach(function (day) {
    var a = el("a", "daylink");
    a.href = "#" + day.key;
    a.addEventListener("click", function (e) { e.preventDefault(); goTo(day.key); });
    a.appendChild(el("span", "d", day.dow));
    a.appendChild(el("span", "n", day.num));
    barEl.appendChild(a); linkNodes[day.key] = a;

    var sec = el("section", "day"); sec.id = day.key;
    sec.setAttribute("aria-labelledby", "h-" + day.key);
    var head = el("div", "day-head");
    var meta = el("div", "dmeta");
    meta.appendChild(el("b", null, day.dayName));
    meta.appendChild(el("span", null, "October " + day.num));
    head.appendChild(meta);
    var h2 = el("h2", null, day.title); h2.id = "h-" + day.key;
    head.appendChild(h2);
    head.appendChild(el("p", null, day.intro));
    sec.appendChild(head);

    var ol = el("ol", "tl");
    day.items.forEach(function (it, i) {
      if (it.end === undefined) it.end = null;
      it._s = mins(it.start); it._e = mins(it.end);
      if (it._s != null && it._e == null) {
        for (var j = i + 1; j < day.items.length; j++) { if (day.items[j].start) { it._e = mins(day.items[j].start); break; } }
        if (it._e == null) it._e = it._s + 90;
      }
      ol.appendChild(renderItem(it));
    });
    sec.appendChild(ol);
    daysEl.appendChild(sec); dayNodes[day.key] = sec;
  });

  var subEl = document.getElementById("subbar");
  var SECTIONS = ["me"].concat(DAYS.map(function (d) { return d.key; }));
  dayNodes.me = document.getElementById("me");
  [{ key: "me", n: "My Plan" }, { key: "info", n: "Info" }, { key: "about", n: "The Week" }, { key: "nobility", n: "Nobility" }, { key: "participation", n: "Participation" }].forEach(function (x) {
    var a = el("a", "sublink", x.n);
    a.href = "#" + x.key;
    a.addEventListener("click", function (e) { e.preventDefault(); goTo(x.key); });
    subEl.appendChild(a); linkNodes[x.key] = a;
    dayNodes[x.key] = document.getElementById(x.key);
    if (x.key !== "me") SECTIONS.push(x.key);
  });

  function renderItem(it) {
    var cls = { main: "main", "break": "brk", end: "brk fin" }[it.kind] || it.kind;
    var li = el("li", "item " + cls);
    it._node = li;
    var t = el("div", "time");
    if (it.start) {
      var s = el("span", "s"); var m = mins(it.start);
      s.textContent = fmt(m, false);
      s.appendChild(el("small", null, m >= 720 ? "PM" : "AM"));
      t.appendChild(s);
      if (it.end && !it.hideEnd && it.kind !== "break" && it.kind !== "end") t.appendChild(el("span", "e", "to " + fmt(mins(it.end))));
    } else {
      var s2 = el("span", "s", it.startLabel || ""); s2.style.fontSize = ".95rem"; s2.style.textTransform = "uppercase"; s2.style.letterSpacing = ".14em"; t.appendChild(s2);
    }
    li.appendChild(t);

    var b = el("div", "body");
    li.appendChild(b);

    if (it.kind === "break" || it.kind === "end") {
      b.appendChild(el("h3", null, it.title));
      it._chipHost = b;
      return li;
    }

    if (it.kind === "round") {
      var head = el("button", "card rhead"); head.type = "button";
      head.setAttribute("aria-expanded", "false"); head.setAttribute("aria-controls", "opts-" + it.id);
      head.appendChild(el("span", "rn", it.label));
      head.appendChild(el("span", "rtitle", it.title));
      var stat = el("span", "pickstat"); head.appendChild(stat);
      var chipRow = el("span", "chips"); head.appendChild(chipRow); it._chipHost = chipRow;
      head.appendChild(chev());
      b.appendChild(head);
      var card = el("div", "round-card"); card.id = "opts-" + it.id; card.hidden = true;
      if (it.note) card.appendChild(el("p", "rnote", it.note));
      var opts = el("ul", "opts");
      it.options.forEach(function (o) {
        var oli = el("li", "opt");
        var info = el("div");
        info.appendChild(el("h4", null, o.title));
        info.appendChild(el("span", "lead", o.lead));
        var f = el("span", "for"); f.appendChild(el("b", null, "For: ")); f.appendChild(document.createTextNode(o.for)); info.appendChild(f);
        info.appendChild(el("span", "what", o.what));
        oli.appendChild(info);
        opts.appendChild(oli);
        it._optNodes = it._optNodes || {}; it._optNodes[o.sid] = info;
      });
      it._card = card;
      stat.textContent = it.options.length + (it.open ? " sessions. Tap to sign up." : " sessions. Tap to see them.");
      card.appendChild(opts);
      it._open = function (v) { card.hidden = !v; head.setAttribute("aria-expanded", v ? "true" : "false"); };
      head.addEventListener("click", function () { it._open(card.hidden); });
      li.appendChild(card);
      return li;
    }

    var hasMore = !!(it.desc || it.prompts || it.closer);
    var cd = el(hasMore ? "details" : "div", "card"); b.appendChild(cd);
    var top = hasMore ? el("summary") : cd;
    if (hasMore) cd.appendChild(top);
    var chips = el("div", "chips");
    (it.chips || []).forEach(function (c) {
      if (c === EVERYONE) return;
      var k = "chip" + (c === EVERYONE ? " everyone" : c === "Optional" ? " optl" : (/Ballroom|Lodge|Lobby|Parlor|TBA|restaurants/.test(c) ? " place" : ""));
      chips.appendChild(el("span", k, c));
    });
    it._chipHost = chips;
    if (it.word) top.appendChild(el("div", "word", it.word));
    top.appendChild(el("h3", null, it.title));
    if (it.who) {
      var w = el("div", "who", it.who);
      if (it.whoMore) { w.appendChild(document.createTextNode(" ")); w.appendChild(el("span", null, it.whoMore)); }
      top.appendChild(w);
    }
    if (it.steps) {
      var ul = el("ul", "steps");
      it.steps.forEach(function (st) {
        var sli = el("li"); sli.appendChild(el("b", null, fmt(mins(st[0])))); sli.appendChild(el("span", null, st[1])); ul.appendChild(sli);
      });
      top.appendChild(ul);
    }
    top.appendChild(chips);
    if (hasMore) {
      top.appendChild(chev());
      var more = el("div", "more");
      if (it.desc) more.appendChild(el("p", "desc", it.desc));
      if (it.prompts) {
        var pl = el("ul", "prompts");
        it.prompts.forEach(function (pp) { pl.appendChild(el("li", null, pp)); });
        more.appendChild(pl);
      }
      if (it.closer) more.appendChild(el("p", "closer", it.closer));
      if (it.rows) {
        if (it.rowsCallout) {
          var cl = el("p", "dcall"); cl.appendChild(el("b", null, it.rowsCallout[0])); cl.appendChild(document.createTextNode(it.rowsCallout[1])); more.appendChild(cl);
        }
        more.appendChild(el("div", "dhead", it.rowsTitle || ""));
        var dl = el("ul", "dlist");
        it.rows.forEach(function (r) {
          var dli = el("li");
          dli.appendChild(el("b", null, r[0]));
          var right = el("span");
          if (r[3] === "nolink") { right.appendChild(el("b", null, r[1])); right.appendChild(document.createTextNode(" ")); right.appendChild(el("small", null, r[2])); dli.appendChild(right); dl.appendChild(dli); return; }
          var lk = el("a", null, r[1]);
          lk.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r[1] + " Park City UT");
          lk.target = "_blank"; lk.rel = "noopener";
          lk.addEventListener("click", function (e) { e.stopPropagation(); });
          right.appendChild(lk);
          if (r[2]) { right.appendChild(document.createTextNode(" ")); right.appendChild(el("small", null, r[2])); }
          dli.appendChild(right);
          dl.appendChild(dli);
        });
        more.appendChild(dl);
        if (it.rowsNote) more.appendChild(el("p", "desc", it.rowsNote));
        if (it.lookup) {
          var gb = el("button", "golook", "Not sure? Check My Plan"); gb.type = "button";
          gb.addEventListener("click", function (e) { e.preventDefault(); goTo("me"); });
          more.appendChild(gb);
        }
      }
      cd.appendChild(more);
      it._open = function (v) { cd.open = v; };
    }
    return li;
  }

  /* ---------- my plan + breakout sign-ups ---------- */
  (function () {
    var ROOMS = [["Aaron Ott", "Sarah Ott (spouse)"], ["Adam Duguay", "Karl Larsen"], ["Adyson De La Torre", "Megan Mendez"], ["Alexander Inchaustegui", "Amanda Jaggard"], ["Alicia Howson", ""], ["Amanda Jaggard", "Alexander Inchaustegui"], ["Amy Turner", ""], ["Amy Pope", "Jessica Pipes"], ["Andrea Hinrichs", "Rachel Baggech"], ["Andrea Hyre", "Claire Yinger"], ["Andrew Ladd", ""], ["Andrew Simila", "Houston Bradley"], ["Ari Merritt", "Randee Blickenstaff"], ["Arron Chambers", "Rhonda Chambers (spouse)"], ["Austin Rockwell", ""], ["Austin Walker", ""], ["Becca Egger", "Shauna Lang"], ["Blake Wheeler", ""], ["Cayla Horey", ""], ["Chad Richards", "Ryan Farrell"], ["Charise Proctor", "Megan Hozinsky"], ["CJ Martindale", ""], ["Claire Yinger", "Andrea Hyre"], ["Cody Miller", "Shauna Miller"], ["Corey Gajewski", "Magan Dobson"], ["Dan Leffelaar", "Laura Leffelaar"], ["Danielle DelBrocco", "Stephanie Hess"], ["Danny Bowers", "Kim Bowers"], ["Dave Leach", ""], ["David Gilbert", "Alyssa Gilbert (spouse)"], ["David Miller", ""], ["David Gerber", "Demore Barnes"], ["Deb Foy", ""], ["Demore Barnes", "David Gerber"], ["Dex Alexander", "Mike Park"], ["Dominique Perry", "LaVonda Baldwin"], ["Doug Melder", ""], ["Elizabeth Boocks", ""], ["Ellie Martin", "Rebecca Olson"], ["Eric Mansfield", "Jeff Gerhardt"], ["Erica McIntyre", "Jamie Rohrbaugh"], ["Erik Williams", "Lawrence Huey"], ["Garland Hunt Jr.", "Melissa Hunt (spouse)"], ["Houston Bradley", "Andrew Simila"], ["Jack Campbell", ""], ["James Merante", ""], ["Jamie Rohrbaugh", "Erica McIntyre"], ["Janet Breitenbach", ""], ["Jaralyn Monkman", "Kelsey Carter"], ["Jarrett Stevens", ""], ["Jason Brown", ""], ["Jason Jaggard", "Mina Nguyen (spouse)"], ["Jean-Marie Jobs", ""], ["Jeanette Pineiro", ""], ["Jeff Gerhardt", "Eric Mansfield"], ["Jen Harris", "Rob Harris"], ["Jenn Yeager", ""], ["Jennifer Tharp", "Laura Lyng"], ["Jeremy Horton", "Rodney Combs"], ["Jessica Pipes", "Amy Pope"], ["Jon Roberts", "Holly Roberts (spouse)"], ["Joseph Barkley", "Katie Barkley (spouse)"], ["Joseph Thompson", "Trey McKnight"], ["Josh Orwick", ""], ["Josh Powers", "Tim Hawkins"], ["Justin Probst", "OPEN"], ["Karina Neal", ""], ["Karl Larsen", "Adam Duguay"], ["Kat Harris", "Adam Runquist (spouse)"], ["Kaylei Wright", "Shannon Curran"], ["Kelsey Carter", "Jaralyn Monkman"], ["Kevin Collins", ""], ["Kim Bowers", "Danny Bowers"], ["Kimber Liu", "Shea Smith"], ["Kristen Franklin", ""], ["Kristin Frade", "Rosanna Tomiuk"], ["Kristine Singer", "Layne Anonsen"], ["Kurt Duggleby", "Katie Duggleby (spouse)"], ["Laura Leffelaar", "Dan Leffelaar"], ["Laura Lyng", "Jennifer Tharp"], ["LaVonda Baldwin", "Dominique Perry"], ["Lawrence Huey", "Erik Williams"], ["Layne Anonsen", "Kristine Singer"], ["Luke Crowley", "Steve Buse"], ["Mackie McAdam", ""], ["Magan Dobson", "Corey Gajewski"], ["Mallory Carellas", "Michelle Manuel"], ["Matt Hulst", "Matthew Tuszynski"], ["Matthew Gould", "Phil Leffelaar"], ["Matthew Tuszynski", "Matt Hulst"], ["Megan Mendez", "Adyson De La Torre"], ["Megan Hozinsky", "Charise Proctor"], ["Michael Vasquez", "Will Fuller"], ["Michelle Manuel", "Mallory Carellas"], ["Mike Rooney", ""], ["Mike Park", "Dex Alexander"], ["Mike Hickerson", "Rob Blackledge"], ["Phil Leffelaar", "Matt Gould"], ["Racheal Edwards", "Rachelle Rummage"], ["Rachel Baggech", "Andrea Hinrichs"], ["Rachel Gammell", "Shawna Wingert"], ["Rachelle Rummage", "Racheal Edwards"], ["Randee Blickenstaff", "Ari Merritt"], ["Rebecca Olson", "Ellie Martin"], ["Rob Harris", "Jen Harris"], ["Rob Blackledge", "Mike Hickerson"], ["Rodney Combs", "Jeremy Horton"], ["Rosanna Tomiuk", "Kristin Frade"], ["Ruthie Kim", ""], ["Ryan Coley", ""], ["Ryan Farrell", "Chad Richards"], ["Ryen Wilkens", ""], ["Sean Patton", "Madison Patton (spouse)"], ["Shannon Curran", "Kaylei Wright"], ["Shauna Lang", "Becca Egger"], ["Shauna Miller", "Cody Miller"], ["Shawna Wingert", "Rachel Gammell"], ["Shea Smith", "Kimber Liu"], ["Stephanie Hess", "Danielle DelBrocco"], ["Steve Buse", "Luke Crowley"], ["Tim Gibson", "Nancy Gibson (spouse)"], ["Tim Hawkins", "Josh Powers"], ["Travis Patzkowsky", ""], ["Trey McKnight", "Joseph Thompson"], ["Tricia Harding", ""], ["Will Fuller", "Michael Vasquez"], ["Karen Biebuyck", ""], ["Keely Ng", ""], ["Lillian McCall", ""], ["Lori Krueger", ""], ["Itica Milanes", "OPEN"], ["Amos Arnold", "OPEN"], ["Christy Jansma", "OPEN"]];
    var FARM = ["Adyson De La Torre", "Ari Merritt", "Charise Proctor", "Corey Gajewski", "Dan Leffelaar", "David Miller", "Doug Melder", "Elizabeth Boocks", "Jamie Rohrbaugh", "Jaralyn Monkman", "Jason Jaggard", "Jen Harris", "Jenn Yeager", "Joseph Barkley", "Justin Probst", "Kaylei Wright", "Kelsey Carter", "Kevin Collins", "Kim Bowers", "Laura Leffelaar", "Lillian McCall", "Magan Dobson", "Megan Hozinsky", "Megan Mendez", "Rachel Gammell", "Rachelle Rummage", "Randee Blickenstaff", "Ryen Wilkens", "Shannon Curran", "Shawna Wingert", "Tricia Harding", "Will Fuller"];
    var TEAMS = [{"lead": "Austin Walker", "rest": "Loma", "label": "August 2026 Foundations", "m": ["Aaron Ott", "Alicia Howson", "Dominique Perry", "Rob Harris"]}, {"lead": "Shea Smith", "rest": "Shabu (6:15 PM)", "label": "July 2026 Foundations", "m": ["Matthew Tuszynski", "Austin Rockwell", "Matt Hulst", "Racheal Edwards", "Eric Mansfield", "Jack Campbell", "Josh Powers"]}, {"lead": "Jon Roberts", "rest": "350 Main Brasserie", "label": "", "m": ["Arron Chambers", "Cayla Horey", "Dave Leach", "Jeff Gerhardt", "Kimber Liu", "Layne Anonsen", "Luke Crowley", "Matthew Gould", "Mike Rooney", "Rob Blackledge"]}, {"lead": "Ryan Farrell", "rest": "Butcher's Chop House", "label": "", "m": ["James Merante", "Jeremy Horton", "Josh Orwick", "Kristine Singer", "Mallory Carellas", "Michelle Manuel", "Steve Buse"]}, {"lead": "Danny Bowers", "rest": "Cafe Terigo", "label": "", "m": ["Adam Duguay", "Amy Pope", "Danielle DelBrocco", "David Gilbert", "Karl Larsen", "Stephanie Hess"]}, {"lead": "Becca Egger", "rest": "Tekila Mexican Grill", "label": "", "m": ["Andrea Hinrichs", "Claire Yinger", "Jessica Pipes", "Kristen Franklin", "Mike Hickerson", "Rodney Combs"]}, {"lead": "Amanda Jaggard", "rest": "Loma", "label": "", "m": ["Jason Brown", "Jeanette Pineiro", "Kat Harris", "Kurt Duggleby", "Mackie McAdam", "Travis Patzkowsky"]}, {"lead": "Keely Ng", "rest": "Tekila Mexican Grill", "label": "", "m": ["Amy Turner", "Andrea Hyre", "Demore Barnes", "Erik Williams", "Houston Bradley", "Lawrence Huey", "Rachel Baggech", "Alexander Inchaustegui"]}, {"lead": "Kimber Liu", "rest": "The Eating Establishment", "label": "", "m": ["Deb Foy", "Dex Alexander", "Jarrett Stevens", "LaVonda Baldwin", "Michael Vasquez", "Phil Leffelaar", "Shauna Miller", "Shea Smith", "Tim Gibson", "Trey McKnight"]}, {"lead": "Jennifer Tharp", "rest": "Le Depot", "label": "", "m": ["Austin Walker", "Becca Egger", "CJ Martindale", "Danny Bowers", "Jean-Marie Jobs", "Karen Biebuyck", "Karina Neal", "Lori Krueger", "Ryan Coley", "Tim Hawkins"]}, {"lead": "Chad Richards", "rest": "350 Main Brasserie (6:15 PM)", "label": "", "m": ["Amanda Jaggard", "Andrew Ladd", "Andrew Simila", "Blake Wheeler", "Garland Hunt Jr.", "Janet Breitenbach", "Keely Ng", "Laura Lyng", "Mike Park", "Ruthie Kim"]}, {"lead": "Rosanna Tomiuk", "rest": "Shabu", "label": "", "m": ["Chad Richards", "Cody Miller", "David Gerber", "Jennifer Tharp", "Joseph Thompson", "Kristin Frade", "Rosanna Tomiuk", "Ryan Farrell", "Sean Patton", "Shauna Lang"]}];
    var LEADS = {"tue1": {"Austin Walker": "sub100", "Shea Smith": "sub100", "Joseph Barkley": "mid", "Joseph Thompson": "top20", "Jason Jaggard": "top20", "Megan Hozinsky": "cx", "Charise Proctor": "cx"}, "tue2": {"Joseph Thompson": "compete", "Jennifer Tharp": "compete", "Chad Richards": "agents", "Shannon Curran": "agents", "Kristin Frade": "intake", "Garland Hunt Jr.": "intake", "Jean-Marie Jobs": "silos", "Kelsey Carter": "silos"}, "wed1": {"Janet Breitenbach": "soul", "Ryan Farrell": "soul", "Laura Lyng": "belief", "Amanda Jaggard": "belief", "Karina Neal": "sprint", "Tricia Harding": "sprint", "Rosanna Tomiuk": "mpl", "Dan Leffelaar": "mpl"}};
    var PICKS = {"Aaron Ott": ["sub100", "intake", "soul", "teams"], "Adam Duguay": ["sub100", "intake", "belief", "teams"], "Alexander Inchaustegui": ["sub100", "intake", "sprint", "teams"], "Alicia Howson": ["sub100", "intake", "soul", "teams"], "Amanda Jaggard": ["top20", "silos", "belief", "teams"], "Amy Pope": ["sub100", "intake", "soul", "teams"], "Amy Turner": ["sub100", "intake", "soul", "teams"], "Andrea Hinrichs": ["sub100", "intake", "soul", "teams"], "Andrea Hyre": ["cx", "compete", "mpl", "teams"], "Andrew Ladd": ["top20", "silos", "belief", "teams"], "Andrew Simila": ["top20", "silos", "sprint", "teams"], "Arron Chambers": ["mid", "", "belief", "teams"], "Austin Rockwell": ["sub100", "intake", "soul", "teams"], "Austin Walker": ["sub100", "intake", "mpl", "teams"], "Becca Egger": ["mid", "silos", "mpl", "teams"], "Blake Wheeler": ["top20", "silos", "belief", "teams"], "CJ Martindale": ["mid", "compete", "belief", "teams"], "Cayla Horey": ["mid", "compete", "belief", "teams"], "Chad Richards": ["top20", "agents", "mpl", "teams"], "Claire Yinger": ["sub100", "intake", "sprint", "teams"], "Cody Miller": ["top20", "silos", "mpl", "teams"], "Danielle DelBrocco": ["sub100", "intake", "soul", "teams"], "Danny Bowers": ["mid", "compete", "mpl", "teams"], "Dave Leach": ["mid", "compete", "belief", "teams"], "David Gerber": ["top20", "silos", "sprint", "teams"], "David Gilbert": ["sub100", "intake", "sprint", "teams"], "Deb Foy": ["mid", "intake", "belief", "teams"], "Demore Barnes": ["mid", "compete", "sprint", "teams"], "Dex Alexander": ["mid", "silos", "belief", "teams"], "Dominique Perry": ["sub100", "intake", "soul", "teams"], "Ellie Martin": ["sub100", "intake", "soul", "teams"], "Eric Mansfield": ["sub100", "intake", "soul", "teams"], "Erica McIntyre": ["cx", "agents", "mpl", "teams"], "Erik Williams": ["sub100", "intake", "sprint", "teams"], "Garland Hunt Jr.": ["top20", "intake", "belief", "teams"], "Houston Bradley": ["sub100", "intake", "belief", "teams"], "Jack Campbell": ["sub100", "intake", "soul", "teams"], "James Merante": ["sub100", "intake", "soul", "teams"], "Janet Breitenbach": ["top20", "silos", "soul", "teams"], "Jarrett Stevens": ["mid", "agents", "mpl", "teams"], "Jason Brown": ["sub100", "intake", "soul", "teams"], "Jean-Marie Jobs": ["top20", "silos", "mpl", "teams"], "Jeanette Pineiro": ["sub100", "intake", "belief", "teams"], "Jeff Gerhardt": ["sub100", "compete", "belief", "teams"], "Jennifer Tharp": ["top20", "compete", "mpl", "teams"], "Jeremy Horton": ["sub100", "intake", "soul", "teams"], "Jessica Pipes": ["sub100", "intake", "soul", "teams"], "Jon Roberts": ["top20", "silos", "mpl", "teams"], "Joseph Thompson": ["top20", "compete", "mpl", "teams"], "Josh Orwick": ["sub100", "intake", "soul", "teams"], "Josh Powers": ["sub100", "intake", "soul", "teams"], "Karen Biebuyck": ["sub100", "intake", "belief", "teams"], "Karina Neal": ["mid", "silos", "sprint", "teams"], "Karl Larsen": ["sub100", "compete", "belief", "teams"], "Kat Harris": ["mid", "compete", "belief", "teams"], "Keely Ng": ["top20", "silos", "mpl", "teams"], "Kimber Liu": ["mid", "compete", "mpl", "teams"], "Kristen Franklin": ["sub100", "intake", "soul", "teams"], "Kristin Frade": ["top20", "intake", "mpl", "teams"], "Kristine Singer": ["sub100", "intake", "soul", "teams"], "Kurt Duggleby": ["sub100", "intake", "soul", "teams"], "LaVonda Baldwin": ["sub100", "intake", "sprint", "teams"], "Laura Lyng": ["top20", "silos", "belief", "teams"], "Lawrence Huey": ["sub100", "compete", "belief", "teams"], "Layne Anonsen": ["sub100", "intake", "belief", "teams"], "Lori Krueger": ["top20", "silos", "belief", "teams"], "Luke Crowley": ["mid", "silos", "belief", "teams"], "Mackie McAdam": ["sub100", "intake", "soul", "teams"], "Mallory Carellas": ["sub100", "intake", "soul", "teams"], "Matt Hulst": ["sub100", "intake", "belief", "teams"], "Matthew Gould": ["mid", "silos", "belief", "teams"], "Matthew Tuszynski": ["sub100", "intake", "soul", "teams"], "Michael Vasquez": ["sub100", "intake", "soul", "teams"], "Michelle Manuel": ["sub100", "intake", "sprint", "teams"], "Mike Hickerson": ["mid", "compete", "sprint", "teams"], "Mike Park": ["top20", "silos", "belief", "teams"], "Mike Rooney": ["mid", "compete", "belief", "teams"], "Phil Leffelaar": ["mid", "compete", "sprint", "teams"], "Racheal Edwards": ["sub100", "intake", "sprint", "teams"], "Rachel Baggech": ["sub100", "intake", "soul", "teams"], "Rebecca Olson": ["sub100", "intake", "soul", "teams"], "Rob Blackledge": ["mid", "compete", "belief", "teams"], "Rob Harris": ["sub100", "intake", "soul", "teams"], "Rodney Combs": ["sub100", "intake", "soul", "teams"], "Rosanna Tomiuk": ["top20", "silos", "mpl", "teams"], "Ruthie Kim": ["top20", "silos", "sprint", "teams"], "Ryan Coley": ["mid", "compete", "soul", "teams"], "Ryan Farrell": ["top20", "silos", "soul", "teams"], "Sean Patton": ["top20", "silos", "belief", "teams"], "Shauna Lang": ["top20", "silos", "mpl", "teams"], "Shauna Miller": ["mid", "compete", "belief", "teams"], "Shea Smith": ["sub100", "intake", "belief", "teams"], "Stephanie Hess": ["sub100", "intake", "soul", "teams"], "Steve Buse": ["sub100", "intake", "soul", "teams"], "Tim Gibson": ["mid", "compete", "belief", "teams"], "Tim Hawkins": ["mid", "compete", "belief", "teams"], "Travis Patzkowsky": ["sub100", "intake", "soul", "teams"], "Trey McKnight": ["mid", "compete", "mpl", "teams"], "Adyson De La Torre": ["cx", "agents", "mpl", "self"], "Ari Merritt": ["cx", "agents", "mpl", "self"], "Charise Proctor": ["cx", "silos", "mpl", "self"], "Corey Gajewski": ["cx", "agents", "mpl", "self"], "Dan Leffelaar": ["top20", "silos", "mpl", "self"], "David Miller": ["top20", "silos", "mpl", "self"], "Doug Melder": ["cx", "silos", "mpl", "self"], "Elizabeth Boocks": ["cx", "agents", "mpl", "self"], "Jamie Rohrbaugh": ["cx", "agents", "mpl", "self"], "Jaralyn Monkman": ["cx", "silos", "mpl", "self"], "Jason Jaggard": ["top20", "silos", "mpl", "self"], "Jen Harris": ["cx", "silos", "mpl", "self"], "Jenn Yeager": ["cx", "agents", "mpl", "self"], "Joseph Barkley": ["mid", "silos", "mpl", "self"], "Justin Probst": ["cx", "compete", "mpl", "self"], "Kaylei Wright": ["cx", "silos", "mpl", "self"], "Kelsey Carter": ["cx", "silos", "mpl", "self"], "Kevin Collins": ["cx", "agents", "mpl", "self"], "Kim Bowers": ["cx", "agents", "mpl", "self"], "Laura Leffelaar": ["cx", "silos", "mpl", "self"], "Lillian McCall": ["cx", "agents", "mpl", "self"], "Magan Dobson": ["cx", "silos", "mpl", "self"], "Megan Hozinsky": ["cx", "agents", "mpl", "self"], "Megan Mendez": ["cx", "agents", "mpl", "self"], "Rachel Gammell": ["cx", "agents", "mpl", "self"], "Rachelle Rummage": ["cx", "compete", "mpl", "self"], "Randee Blickenstaff": ["cx", "agents", "mpl", "self"], "Ryen Wilkens": ["cx", "agents", "mpl", "self"], "Shannon Curran": ["cx", "agents", "mpl", "self"], "Shawna Wingert": ["cx", "compete", "mpl", "self"], "Tricia Harding": ["cx", "silos", "sprint", "self"], "Will Fuller": ["cx", "agents", "mpl", "self"]};
    /* Monday 1:00 Team Lead Working Time + Lunch */
    var LUNCH_IN = ["Austin Walker", "Shea Smith", "Karina Neal", "Jon Roberts", "Ryan Farrell", "Danny Bowers", "Becca Egger", "Amanda Jaggard", "Keely Ng", "Kimber Liu", "Jennifer Tharp", "Chad Richards", "Rosanna Tomiuk", "Tricia Harding", "Doug Melder", "Jason Jaggard", "Joseph Thompson", "Dan Leffelaar", "Jean-Marie Jobs", "Laura Leffelaar"];
    var LUNCH_MAYBE = ["Charise Proctor", "Kaylei Wright", "Shannon Curran", "Jenn Yeager", "Ruthie Kim", "Trey McKnight", "Jen Harris"];
    /* Team Prolific happy hour, Monday at the top of the gondola: coaches new to the firm since the last Fall Retreat */
    /* afternoon activities from the registration form */
    var HIKE = ["Aaron Ott", "Adam Duguay", "Amos Arnold", "Andrea Hinrichs", "Andrea Hyre", "Austin Rockwell", "Becca Egger", "CJ Martindale", "Claire Yinger", "Danielle DelBrocco", "Danny Bowers", "Elizabeth Boocks", "Ellie Martin", "Erik Williams", "Houston Bradley", "Itica Milanes", "Jack Campbell", "Jason Brown", "Jean-Marie Jobs", "Jeff Gerhardt", "Joseph Thompson", "Josh Orwick", "Karina Neal", "Karl Larsen", "Kristin Frade", "Kurt Duggleby", "LaVonda Baldwin", "Laura Leffelaar", "Layne Anonsen", "Matthew Gould", "Matthew Tuszynski", "Michael Vasquez", "Randee Blickenstaff", "Rebecca Olson", "Rosanna Tomiuk", "Ruthie Kim", "Ryan Farrell", "Ryen Wilkens", "Sean Patton", "Stephanie Hess", "Trey McKnight", "Will Fuller", "Kristine Singer", "Mallory Carellas"];
    var RIDE_TUE = ["Deb Foy", "Kaylei Wright", "Michelle Manuel", "Erica McIntyre", "Jennifer Tharp", "Magan Dobson", "Janet Breitenbach", "Rachel Gammell"];
    var NEWCOACH = ["Ellie Martin", "Erica McIntyre", "Rebecca Olson", "Itica Milanes", "Amos Arnold", "Christy Jansma"];
    var TIER = {"Aaron Ott": "sub100", "Adam Duguay": "sub100", "Alexander Inchaustegui": "sub100", "Alicia Howson": "sub100", "Amanda Jaggard": "mid", "Amy Pope": "sub100", "Amy Turner": "sub100", "Andrea Hinrichs": "sub100", "Andrea Hyre": "sub100", "Andrew Ladd": "mid", "Andrew Simila": "mid", "Arron Chambers": "sub100", "Austin Rockwell": "sub100", "Austin Walker": "sub100", "Becca Egger": "mid", "Blake Wheeler": "sub100", "Cayla Horey": "sub100", "Chad Richards": "mid", "CJ Martindale": "mid", "Claire Yinger": "sub100", "Cody Miller": "top20", "Dan Leffelaar": "top20", "Danielle DelBrocco": "sub100", "Danny Bowers": "sub100", "David Gerber": "top20", "David Gilbert": "sub100", "Dave Leach": "sub100", "David Miller": "top20", "Deb Foy": "mid", "Demore Barnes": "mid", "Dex Alexander": "sub100", "Dominique Perry": "sub100", "Doug Melder": "mid", "Eric Mansfield": "sub100", "Erik Williams": "sub100", "Garland Hunt Jr.": "mid", "Houston Bradley": "sub100", "Jack Campbell": "sub100", "James Merante": "sub100", "Janet Breitenbach": "top20", "Jarrett Stevens": "sub100", "Jason Brown": "sub100", "Jean-Marie Jobs": "mid", "Jeanette Pineiro": "sub100", "Jeff Gerhardt": "sub100", "Jennifer Tharp": "mid", "Jeremy Horton": "sub100", "Jessica Pipes": "sub100", "Jon Roberts": "top20", "Joseph Barkley": "top20", "Joseph Thompson": "top20", "Josh Orwick": "sub100", "Josh Powers": "sub100", "Karen Biebuyck": "sub100", "Karina Neal": "mid", "Karl Larsen": "sub100", "Kat Harris": "sub100", "Keely Ng": "sub100", "Kimber Liu": "sub100", "Kristen Franklin": "sub100", "Kristin Frade": "top20", "Kristine Singer": "sub100", "Kurt Duggleby": "sub100", "Laura Leffelaar": "mid", "Laura Lyng": "mid", "LaVonda Baldwin": "sub100", "Lawrence Huey": "sub100", "Layne Anonsen": "sub100", "Lori Krueger": "mid", "Luke Crowley": "sub100", "Mackie McAdam": "sub100", "Mallory Carellas": "sub100", "Matt Hulst": "sub100", "Matthew Gould": "sub100", "Matthew Tuszynski": "sub100", "Michael Vasquez": "sub100", "Michelle Manuel": "sub100", "Mike Hickerson": "sub100", "Mike Park": "top20", "Mike Rooney": "sub100", "Phil Leffelaar": "sub100", "Racheal Edwards": "sub100", "Rachel Baggech": "sub100", "Rob Blackledge": "sub100", "Rob Harris": "sub100", "Rodney Combs": "sub100", "Rosanna Tomiuk": "top20", "Ruthie Kim": "mid", "Ryan Coley": "sub100", "Ryan Farrell": "mid", "Sean Patton": "sub100", "Shauna Lang": "top20", "Shauna Miller": "sub100", "Shea Smith": "sub100", "Stephanie Hess": "sub100", "Steve Buse": "sub100", "Tim Gibson": "sub100", "Tim Hawkins": "sub100", "Travis Patzkowsky": "sub100", "Trey McKnight": "mid"};
    var MONTHS = {"Aaron Ott": 2, "Adam Duguay": 17, "Alexander Inchaustegui": 9, "Alicia Howson": 2, "Amanda Jaggard": 121, "Amy Pope": 6, "Amy Turner": 9, "Andrea Hinrichs": 6, "Andrea Hyre": 14, "Andrew Ladd": 37, "Andrew Simila": 47, "Arron Chambers": 12, "Austin Rockwell": 3, "Austin Walker": 32, "Becca Egger": 42, "Blake Wheeler": 18, "Cayla Horey": 12, "Chad Richards": 43, "CJ Martindale": 77, "Claire Yinger": 12, "Cody Miller": 32, "Dan Leffelaar": 122, "Danielle DelBrocco": 7, "Danny Bowers": 24, "David Gerber": 111, "David Gilbert": 14, "Dave Leach": 7, "David Miller": 60, "Deb Foy": 105, "Demore Barnes": 51, "Dex Alexander": 33, "Dominique Perry": 2, "Doug Melder": 26, "Eric Mansfield": 3, "Erik Williams": 9, "Garland Hunt Jr.": 24, "Houston Bradley": 12, "Jack Campbell": 3, "James Merante": 9, "Janet Breitenbach": 114, "Jarrett Stevens": 29, "Jason Brown": 9, "Jean-Marie Jobs": 49, "Jeanette Pineiro": 7, "Jeff Gerhardt": 7, "Jennifer Tharp": 47, "Jeremy Horton": 6, "Jessica Pipes": 6, "Jon Roberts": 117, "Joseph Barkley": 50, "Joseph Thompson": 68, "Josh Orwick": 6, "Josh Powers": 2, "Karen Biebuyck": 21, "Karina Neal": 62, "Karl Larsen": 37, "Kat Harris": 12, "Keely Ng": 22, "Kimber Liu": 15, "Kristen Franklin": 11, "Kristin Frade": 68, "Kristine Singer": 6, "Kurt Duggleby": 6, "Laura Leffelaar": 105, "Laura Lyng": 50, "LaVonda Baldwin": 11, "Lawrence Huey": 7, "Layne Anonsen": 6, "Lori Krueger": 49, "Luke Crowley": 7, "Mackie McAdam": 10, "Mallory Carellas": 6, "Matt Hulst": 3, "Matthew Gould": 11, "Matthew Tuszynski": 3, "Michael Vasquez": 7, "Michelle Manuel": 12, "Mike Hickerson": 12, "Mike Park": 50, "Mike Rooney": 7, "Phil Leffelaar": 21, "Racheal Edwards": 3, "Rachel Baggech": 6, "Rob Blackledge": 12, "Rob Harris": 2, "Rodney Combs": 6, "Rosanna Tomiuk": 64, "Ruthie Kim": 29, "Ryan Coley": 6, "Ryan Farrell": 29, "Sean Patton": 11, "Shauna Lang": 48, "Shauna Miller": 12, "Shea Smith": 18, "Stephanie Hess": 7, "Steve Buse": 7, "Tim Gibson": 24, "Tim Hawkins": 14, "Travis Patzkowsky": 6, "Trey McKnight": 42};
    var ROLE = {"Adyson De La Torre": "asst", "Ari Merritt": "asst", "Jamie Rohrbaugh": "asst", "Jen Harris": "asst", "Jenn Yeager": "asst", "Kim Bowers": "asst", "Lillian McCall": "asst", "Megan Hozinsky": "asst", "Megan Mendez": "asst", "Randee Blickenstaff": "asst", "Ryen Wilkens": "asst", "Magan Dobson": "ops", "Corey Gajewski": "ops", "Elizabeth Boocks": "ops", "Kelsey Carter": "ops", "Rachel Gammell": "ops", "Shannon Curran": "ops", "Kaylei Wright": "ops", "Will Fuller": "ops", "Shawna Wingert": "ops", "Rachelle Rummage": "ops", "Kevin Collins": "ops", "Tricia Harding": "lead", "Jason Jaggard": "lead", "Doug Melder": "lead", "Dan Leffelaar": "lead", "David Miller": "lead", "Charise Proctor": "lead", "Jaralyn Monkman": "lead", "Justin Probst": "lead", "Laura Leffelaar": "lead", "Joseph Barkley": "lead"};
    var ASSISTS = {"Adyson De La Torre": ["Kristin Frade", "Jennifer Tharp"], "Ari Merritt": ["Joseph Barkley"], "Jamie Rohrbaugh": ["Deb Foy"], "Jen Harris": ["David Miller"], "Jenn Yeager": ["Jason Jaggard"], "Kim Bowers": ["Danny Bowers", "Tim Gibson", "Chad Richards"], "Lillian McCall": ["Keely Ng", "Karen Biebuyck", "Andrew Simila"], "Megan Hozinsky": ["Jon Roberts", "Andrew Ladd"], "Megan Mendez": ["Shauna Lang", "Becca Egger"], "Randee Blickenstaff": ["Ryan Farrell"], "Ryen Wilkens": ["Dan Leffelaar"]};
    /* name: [arrive date, arrive minutes (-1 driving, -2 unknown), arrive flight, depart date, depart minutes, depart flight, offered to drive Tue, Wed lunch] */
    var FLY = {"Aaron Ott": ["10/19", -1, "Driving", "10/22", -1, "Driving", 1, "Turkey + Havarti sandwich"], "Adam Duguay": ["10/19", 900, "Delta 0663", "", -2, "", 0, "Turkey + Havarti sandwich"], "Adyson De La Torre": ["10/19", 637, "AA1878", "10/22", 795, "AA1871", 0, "Turkey + Havarti sandwich"], "Alexander Inchaustegui": ["10/18", 705, "AA6422", "10/22", 956, "AA4986", 0, "Grain bowl (gluten-free, vegan)"], "Alicia Howson": ["10/19", 950, "WN4634", "10/22", 825, "DL2205", 0, "Turkey + Havarti sandwich"], "Amanda Jaggard": ["10/18", 705, "AA6422", "10/22", 956, "AA4986", 0, "Grain bowl (gluten-free, vegan)"], "Amy Pope": ["10/19", 620, "3186", "10/22", 1100, "3878", 0, "Turkey + Havarti sandwich"], "Amy Turner": ["10/19", 633, "AS 430", "10/22", 1122, "AS 665", 0, "Turkey + Havarti sandwich"], "Andrea Hinrichs": ["10/18", 1085, "1701", "10/22", 1096, "SY 1700", 0, "Grain bowl (gluten-free, vegan)"], "Andrea Hyre": ["10/19", 700, "SW 1381", "10/22", -2, "", 0, "Turkey + Havarti sandwich"], "Andrew Ladd": ["10/19", 892, "DELTA 3713", "10/22", 905, "Delta 2936", 0, "Grain bowl (gluten-free, vegan)"], "Andrew Simila": ["10/19", -1, "Driving", "", -2, "", 1, "Roast beef + Swiss sandwich"], "Ari Merritt": ["10/19", 723, "DL0387", "10/22", 1415, "DL0912", 0, "Grain bowl (gluten-free, vegan)"], "Arron Chambers": ["10/19", -1, "Driving", "", -2, "", 1, "Roast beef + Swiss sandwich"], "Austin Rockwell": ["10/18", -2, "TBD", "10/22", 990, "Southwest WN 3877", 0, "Turkey + Havarti sandwich"], "Austin Walker": ["10/19", 582, "DL 2628", "10/22", 1065, "DL2935", 0, "Turkey + Havarti sandwich"], "Becca Egger": ["10/19", 637, "AA 1878", "10/22", 1007, "AA 1456", 0, "Grain bowl (gluten-free, vegan)"], "Blake Wheeler": ["10/19", 960, "DL2651", "10/22", -2, "", 0, "Grain bowl (gluten-free, vegan)"], "Cayla Horey": ["10/19", 604, "DL 1185", "10/22", 910, "UA 2333", 0, "Dietary request (no option fit)"], "Chad Richards": ["10/19", 620, "WN 3186", "10/22", 910, "WN 2333", 0, "Turkey + Havarti sandwich"], "Charise Proctor": ["10/18", 735, "United 2242", "10/22", 970, "United 1963", 0, "Turkey + Havarti sandwich"], "CJ Martindale": ["10/19", -1, "Driving", "10/22", -1, "Driving", 1, "Turkey + Havarti sandwich"], "Claire Yinger": ["10/19", 775, "WN4913", "10/22", 1050, "WN428", 0, "Grain bowl (gluten-free, vegan)"], "Cody Miller": ["10/19", 700, "WN 1381", "10/22", 1135, "WN 3883", 1, "Turkey + Havarti sandwich"], "Corey Gajewski": ["10/19", 795, "TBD", "10/22", 915, "TBD", 0, "Roast beef + Swiss sandwich"], "Dan Leffelaar": ["10/18", 960, "Delta 3713", "10/22", 1260, "Delta 4113", 0, "Roast beef + Swiss sandwich"], "Danielle DelBrocco": ["10/19", 745, "WN4370", "10/22", 990, "WN3877", 0, "Grain bowl (gluten-free, vegan)"], "Danny Bowers": ["10/18", 1005, "WN 1939", "10/22", 910, "WN 2333", 0, "Grain bowl (gluten-free, vegan)"], "Dave Leach": ["10/19", 743, "Delta 1317", "10/22", 929, "DL 1623", 0, "Grain bowl (gluten-free, vegan)"], "David Gilbert": ["10/19", 702, "AS3118", "10/22", 855, "3119", 0, "Roast beef + Swiss sandwich"], "David Gerber": ["10/19", 802, "United 1963", "10/22", 788, "UNITED 4720", 0, "Grain bowl (gluten-free, vegan)"], "David Miller": ["10/19", 660, "7813", "", -2, "", 1, "Dietary request (no option fit)"], "Deb Foy": ["10/19", 614, "698", "10/22", 1108, "2255", 0, "Grain bowl (gluten-free, vegan)"], "Dex Alexander": ["10/19", -1, "Driving", "", -2, "", 1, "Roast beef + Swiss sandwich"], "Dominique Perry": ["10/18", 615, "DELTA 1291", "10/22", 1065, "DELTA 2796", 0, "Turkey + Havarti sandwich"], "Doug Melder": ["10/17", 1352, "B6 71", "10/23", 1045, "UA 5683", 1, "Roast beef + Swiss sandwich"], "Elizabeth Boocks": ["10/19", 950, "Southwest WN 2330", "10/22", 905, "Southwest WN 4718", 0, "Grain bowl (gluten-free, vegan)"], "Ellie Martin": ["10/19", 1010, "WN4552", "10/22", 785, "WN4718", 0, "Grain bowl (gluten-free, vegan)"], "Eric Mansfield": ["10/19", 930, "3861", "10/22", 975, "4236", 0, "Turkey + Havarti sandwich"], "Erica McIntyre": ["10/19", 950, "WN2330", "10/22", 910, "WN2333", 0, "Turkey + Havarti sandwich"], "Erik Williams": ["10/19", 782, "F9 3016", "10/22", 976, "F9 4236", 0, "Roast beef + Swiss sandwich"], "Houston Bradley": ["10/19", 770, "DL1198", "10/22", 905, "DL1277", 0, "Grain bowl (gluten-free, vegan)"], "Jack Campbell": ["10/18", 660, "Dl0745", "10/22", 930, "Dl875", 0, "Turkey + Havarti sandwich"], "James Merante": ["10/19", 865, "WN 4370", "10/22", 1110, "WN 3877", 0, "Roast beef + Swiss sandwich"], "Jamie Rohrbaugh": ["10/19", 637, "AA 1878", "10/22", 837, "AA 1871", 0, "Grain bowl (gluten-free, vegan)"], "Janet Breitenbach": ["10/19", 573, "2897", "10/23", 820, "2903", 0, "Grain bowl (gluten-free, vegan)"], "Jaralyn Monkman": ["10/19", 892, "DELTA 3713", "10/22", 1256, "Delta 4113", 0, "Grain bowl (gluten-free, vegan)"], "Jarrett Stevens": ["10/19", 755, "WN 4370", "10/22", 815, "WN 3885", 1, "Turkey + Havarti sandwich"], "Jason Brown": ["10/19", 610, "WN3502", "10/22", 990, "WN3877", 0, "Grain bowl (gluten-free, vegan)"], "Jason Jaggard": ["10/16", 614, "Delta 1009", "10/22", 1030, "DELTA 697", 0, "Roast beef + Swiss sandwich"], "Jean-Marie Jobs": ["10/18", 737, "UA 5908", "10/29", 995, "UA 1225", 0, "Grain bowl (gluten-free, vegan)"], "Jeanette Pineiro": ["10/19", 620, "WN3186", "10/22", 1000, "WN263", 0, "Turkey + Havarti sandwich"], "Jeff Gerhardt": ["10/19", 780, "AA 1871", "10/22", 837, "aA 1871", 0, "Roast beef + Swiss sandwich"], "Jen Harris": ["10/17", 720, "AA1895", "", -2, "", 0, "Roast beef + Swiss sandwich"], "Jenn Yeager": ["10/18", 615, "Delta 2231", "10/22", 1075, "Delta 2413", 0, "Grain bowl (gluten-free, vegan)"], "Jennifer Tharp": ["10/19", 614, "DL1068", "10/22", 1135, "DL2317", 0, "Grain bowl (gluten-free, vegan)"], "Jeremy Horton": ["10/19", 955, "DL0423", "10/22?", 489, "DL1395", 0, "Roast beef + Swiss sandwich"], "Jessica Pipes": ["10/19", 956, "DL 1595", "10/22", 1100, "", 0, "Turkey + Havarti sandwich"], "Jon Roberts": ["10/19", 534, "Delta 1331", "10/22", 915, "DL 1088", 0, "Turkey + Havarti sandwich"], "Joseph Thompson": ["10/18", 1368, "UA2157", "10/22", 1078, "UA5752", 0, "Roast beef + Swiss sandwich"], "Joseph Barkley": ["10/19", 769, "DL3681", "10/22", 900, "DL3693", 1, "Roast beef + Swiss sandwich"], "Josh Orwick": ["10/16", 759, "DL1416", "10/22", 927, "DL3747", 1, "Turkey + Havarti sandwich"], "Josh Powers": ["10/19", 751, "DL1367", "10/22", 922, "DL 1342", 0, "Turkey + Havarti sandwich"], "Justin Probst": ["10/19", 825, "DL0663", "10/22", 940, "DL0875", 0, "Turkey + Havarti sandwich"], "Karen Biebuyck": ["10/19", 614, "DL0698", "10/22", 825, "DL0906", 0, "Turkey + Havarti sandwich"], "Karina Neal": ["10/19", 566, "DL1117", "10/22", 1050, "DL1252", 0, "Grain bowl (gluten-free, vegan)"], "Karl Larsen": ["10/19", 615, "DL 1068", "10/22", 1135, "DL2317", 0, "Grain bowl (gluten-free, vegan)"], "Kat Harris": ["10/19", 870, "NA", "10/22", 1020, "NA", 0, "Turkey + Havarti sandwich"], "Kaylei Wright": ["10/18", 750, "AS 3118", "10/22", -2, "", 0, "Roast beef + Swiss sandwich"], "Keely Ng": ["10/11", -1, "Driving", "", -2, "", 1, "Grain bowl (gluten-free, vegan)"], "Kelsey Carter": ["10/19", 892, "DELTA 3713", "10/22", 1256, "DELTA 4113", 0, "Grain bowl (gluten-free, vegan)"], "Kevin Collins": ["", -2, "", "", -2, "", 0, "Turkey + Havarti sandwich"], "Kim Bowers": ["10/18", 1000, "WN 1939", "10/22", 910, "WN 2333", 0, "Turkey + Havarti sandwich"], "Kimber Liu": ["10/17", 928, "DL0930", "10/22", 1245, "DL2797", 0, "Turkey + Havarti sandwich"], "Kristen Franklin": ["10/19", 825, "DL 0663", "", -2, "", 0, "Roast beef + Swiss sandwich"], "Kristin Frade": ["10/19", 780, "MX1411", "10/23", 450, "MX2505", 0, "Turkey + Havarti sandwich"], "Kristine Singer": ["10/19", 658, "AA 1991", "10/22", 932, "AA3258", 0, "Turkey + Havarti sandwich"], "Kurt Duggleby": ["10/19", 770, "Delta 1177", "10/22", 1140, "Alaska 3019", 0, "Turkey + Havarti sandwich"], "Laura Leffelaar": ["10/18", 960, "Delta 3713", "10/22", 1260, "Delta 4113", 0, "Grain bowl (gluten-free, vegan)"], "Laura Lyng": ["10/19", 866, "DL2651", "10/22", 905, "DL2936", 0, "Turkey + Havarti sandwich"], "LaVonda Baldwin": ["10/19", 522, "", "10/22", 995, "", 0, "Grain bowl (gluten-free, vegan)"], "Lawrence Huey": ["10/19", 870, "DL 1194", "10/22", 990, "Southwest 3931", 0, "Roast beef + Swiss sandwich"], "Layne Anonsen": ["10/19", 870, "SW4900", "10/22?", 990, "SW3877", 0, "Turkey + Havarti sandwich"], "Lillian McCall": ["10/19", 645, "AA1878", "10/22", 837, "AA1871", 0, "Roast beef + Swiss sandwich"], "Lori Krueger": ["10/19", 880, "4900", "10/22", 640, "2090 United", 1, "Turkey + Havarti sandwich"], "Luke Crowley": ["10/19", 603, "Delta 2582", "10/22", 1033, "Delta 1161", 0, "Roast beef + Swiss sandwich"], "Mackie McAdam": ["10/19", 545, "DL2142", "10/22", 827, "DL2244", 0, "Turkey + Havarti sandwich"], "Magan Dobson": ["10/19", 723, "DL0387", "10/23", 490, "DL0897", 0, "Turkey + Havarti sandwich"], "Mallory Carellas": ["10/17", -1, "Driving", "10/22", 855, "WN 1381", 0, "Grain bowl (gluten-free, vegan)"], "Matthew Tuszynski": ["10/19", 702, "Alaska 3118", "10/22", 920, "Southwest 3939", 0, "Roast beef + Swiss sandwich"], "Matthew Gould": ["10/19", 602, "Delta 3691", "10/22", 990, "Delta 3584", 0, "Grain bowl (gluten-free, vegan)"], "Megan Hozinsky": ["10/19", 610, "WN3502", "10/22", 990, "WN3877", 0, "Grain bowl (gluten-free, vegan)"], "Megan Mendez": ["10/19", 637, "AA1878", "10/22", 837, "AA1871", 0, "Turkey + Havarti sandwich"], "Michael Vasquez": ["10/18", 1355, "UA 5646", "10/22", 1000, "263", 0, "Turkey + Havarti sandwich"], "Michelle Manuel": ["10/19", 794, "United UA 2242", "10/22", 1035, "United UA 5545", 0, "Grain bowl (gluten-free, vegan)"], "Mike Park": ["10/19", 636, "UA 646", "10/22", 1030, "DL0697", 0, "Turkey + Havarti sandwich"], "Mike Rooney": ["10/19", 556, "Delta 892", "10/22", 1030, "Delta 697", 0, "Turkey + Havarti sandwich"], "Mike Hickerson": ["10/19", 900, "AA", "10/22", 900, "", 1, "Turkey + Havarti sandwich"], "Phil Leffelaar": ["10/19", 892, "3713", "10/22", 1256, "4113", 0, "Turkey + Havarti sandwich"], "Racheal Edwards": ["10/19", 715, "1426", "10/22", 910, "2333", 1, "Turkey + Havarti sandwich"], "Rachel Baggech": ["10/17", 890, "SW 1221", "10/22", 970, "United 1963", 1, "Grain bowl (gluten-free, vegan)"], "Rachel Gammell": ["10/19", 892, "WS6338", "10/22", 1256, "WS6327", 0, "Grain bowl (gluten-free, vegan)"], "Rachelle Rummage": ["10/19", 715, "WN1426", "10/22", 910, "WN2333", 0, "Grain bowl (gluten-free, vegan)"], "Randee Blickenstaff": ["10/19", 720, "DL1702", "10/22", 1415, "DL0912", 0, "Grain bowl (gluten-free, vegan)"], "Rebecca Olson": ["10/19", 982, "DELTA 1886", "10/22", 919, "DELTA 3903", 0, "Grain bowl (gluten-free, vegan)"], "Rob Blackledge": ["10/19", 1020, "WN 4634", "10/22", 970, "WN 2333", 1, "Grain bowl (gluten-free, vegan)"], "Rob Harris": ["10/17", 720, "AA1895", "", -2, "", 0, "Turkey + Havarti sandwich"], "Rodney Combs": ["10/19", 950, "WN 4634", "10/22", 920, "WN 3939", 0, "Turkey + Havarti sandwich"], "Rosanna Tomiuk": ["10/19", 815, "AC 4583", "10/23", 650, "DL 2477", 0, "Turkey + Havarti sandwich"], "Ruthie Kim": ["10/18", 1000, "Delta 1133", "10/22", 995, "UA1225", 0, "Turkey + Havarti sandwich"], "Ryan Coley": ["10/19", 587, "DL0580", "10/22", 1070, "0402 Delta", 1, "Turkey + Havarti sandwich"], "Ryan Farrell": ["10/19", 610, "3502", "10/22", 785, "", 0, "Turkey + Havarti sandwich"], "Ryen Wilkens": ["10/19", 1010, "WN2623", "10/22", 870, "UA 1662", 0, "Roast beef + Swiss sandwich"], "Sean Patton": ["10/19", 950, "SWA 4634", "10/22", 825, "DL2205", 0, "Roast beef + Swiss sandwich"], "Shannon Curran": ["10/18", 630, "DL 3542", "10/22", -2, "", 0, "Grain bowl (gluten-free, vegan)"], "Shauna Lang": ["10/19", 913, "UA1955", "10/22", 970, "UA1963", 0, "Dietary request (no option fit)"], "Shauna Miller": ["10/19", 700, "WN1381", "10/22", 1135, "WN3883", 0, "Turkey + Havarti sandwich"], "Shawna Wingert": ["10/19", -1, "Driving", "", -2, "", 0, "Grain bowl (gluten-free, vegan)"], "Shea Smith": ["10/18", 1000, "DELTA 1593", "10/22", 1050, "SOUTHWEST WN 0428", 0, "Turkey + Havarti sandwich"], "Stephanie Hess": ["10/19", 636, "UA 646", "10/22", 702, "UA 2109", 0, "Grain bowl (gluten-free, vegan)"], "Steve Buse": ["10/19", 613, "WS6333", "10/22", 1265, "WS6695", 0, "Grain bowl (gluten-free, vegan)"], "Tim Hawkins": ["10/19", 615, "DL3940", "10/22", 941, "DL4449", 1, "Grain bowl (gluten-free, vegan)"], "Tim Gibson": ["10/19", 950, "WN2330", "10/22", 1100, "WN3878", 1, "Turkey + Havarti sandwich"], "Travis Patzkowsky": ["10/19", 870, "3786", "10/22", 940, "3777", 0, "Turkey + Havarti sandwich"], "Tricia Harding": ["10/19", 740, "UA 4629", "10/22", 1130, "UA 5457", 1, "Turkey + Havarti sandwich"], "Trey McKnight": ["10/19", 825, "DL663", "10/22", 940, "DL875", 0, "Turkey + Havarti sandwich"], "Will Fuller": ["10/19", 535, "WS6341", "10/22?", 935, "WS8766", 0, "Turkey + Havarti sandwich"], "Amos Arnold": ["10/19", 610, "WN3502", "10/22", 990, "WN3877", 0, "Grain bowl (gluten-free, vegan)"], "Itica Milanes": ["10/19", 604, "1185", "10/22", 785, "4718", 0, "Turkey + Havarti sandwich"]};
    var ARCS_LIVE = true;
    var OPEN = ["tue2", "wed1"];
    var ROUNDS = {};
    DAYS.forEach(function (d) { d.items.forEach(function (it) { if (it.kind === "round") ROUNDS[it.id] = it; }); });
    var NAMES = ROOMS.map(function (r) { return r[0]; });
    var me = store.get("ngr-me"); if (NAMES.indexOf(me) < 0) me = null;
    var SIGN = null, apiDown = false, pending = null;

    function optTitle(rid, sid) { var o = ROUNDS[rid].options.filter(function (x) { return x.sid === sid; })[0]; return o ? o.title : ""; }
    function roommate(n) { var r = ROOMS.filter(function (x) { return x[0] === n; })[0]; if (!r) return ""; return !r[1] ? "No roommate listed" : r[1] === "OPEN" ? "To be confirmed" : r[1]; }
    function leadTeam(n) { return TEAMS.filter(function (t) { return t.lead === n; })[0]; }
    function memberTeam(n) { return TEAMS.filter(function (t) { return t.m.indexOf(n) > -1; })[0]; }
    function teamName(t) { return t.label ? t.lead + "'s " + t.label + " group" : t.lead + "'s team"; }
    function onFarm(n) { return FARM.indexOf(n) > -1; }
    function isNew(n) { return NEWCOACH.indexOf(n) > -1; }
    function isCoach(n) { return !!(leadTeam(n) || memberTeam(n) || isNew(n)); }
    var UNSURE = "Not on a list yet. We will confirm before the retreat.";
    function orList(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " or " + a[a.length - 1]; }
    var ARCS = (function () {
      var qs = ""; try { qs = window.location.search || ""; } catch (e) {}
      if (/preview=arcs/.test(qs)) store.set("ngr-arcs", "1");
      if (/preview=off/.test(qs)) store.set("ngr-arcs", null);
      return ARCS_LIVE || store.get("ngr-arcs") === "1";
    })();
    var TYPES = {
      newc: { label: "Coach with a new practice", tue2: ["intake", "compete"], wed1: ["soul"] },
      c100: { label: "Coach building toward 100K", tue2: ["intake", "compete"], wed1: ["belief", "sprint"] },
      c250: { label: "Coach in the 100K to 250K range", tue2: ["agents", "intake"], wed1: ["sprint", "belief"] },
      ctop: { label: "Top-20% coach", tue2: ["agents", "compete"], wed1: ["belief", "mpl"] },
      asst: { label: "Assistant", tue2: ["agents", "silos"], wed1: ["sprint", "mpl"] },
      ops: { label: "Operations", tue2: ["silos", "agents"], wed1: ["mpl", "sprint"] },
      lead: { label: "Non-coach leader", tue2: ["silos", "compete"], wed1: ["mpl", "sprint"] }
    };
    function typeOf(n) {
      if (isCoach(n)) {
        var mo = MONTHS[n];
        if (isNew(n) || mo == null || mo < 12) return "newc";
        return TIER[n] === "top20" ? "ctop" : TIER[n] === "mid" ? "c250" : "c100";
      }
      return ROLE[n] || (onFarm(n) ? "ops" : null);
    }
    /* picks from the Breakout Assignments sheet: [Tue 1:00, Tue 2:10, Wed 12:15, Wed 1:50] */
    var PIDX = { tue1: 0, tue2: 1, wed1: 2, wed2: 3 };
    function pick(n, rid) { return (PICKS[n] && PICKS[n][PIDX[rid]]) || ""; }
    function suggest(n, rid) { var s = pick(n, rid); return s ? [s] : []; }
    function carMates(n) {
      var t = leadTeam(n) || memberTeam(n); if (!t) return [];
      return [t.lead].concat(t.m).filter(function (x, i, a) { return x !== n && a.indexOf(x) === i && FLY[x] && FLY[x][6]; });
    }
    function dinnerFor(n, mine) {
      if (onFarm(n)) return "The Farm, Canyons Village";
      if (isNew(n)) return "With a coaching team. Your team lead will confirm. Coaches pay for their own dinner.";
      var s = null, t = leadTeam(n);
      if (t) s = t.rest + ". You are hosting " + (t.label ? "your " + t.label + " group." : "your team.");
      else { t = memberTeam(n); if (t) s = t.rest + ", with " + teamName(t); }
      if (!s) return UNSURE;
      if (mine) { var c = carMates(n); if (c.length) s = s.replace(/[.]$/, "") + ". Offered to drive: " + c.join(", "); }
      return s.replace(/[.]$/, "") + ". Coaches pay for their own dinner.";
    }
    function tue1For(n, mine) {
      var l = LEADS.tue1[n]; if (l) return "You are leading " + optTitle("tue1", l);
      var p = pick(n, "tue1");
      if (p === "cx" && ROLE[n] === "asst" && ASSISTS[n]) return "Creating a Meta Performance Client Experience, or join " + orList(ASSISTS[n]) + " if they want you in their room";
      if (p) return optTitle("tue1", p);
      var k = TIER[n] || (isNew(n) ? "sub100" : null);
      if (k) return optTitle("tue1", k);
      if (ROLE[n] === "asst" && ASSISTS[n]) return "Creating a Meta Performance Client Experience, or join " + orList(ASSISTS[n]) + " if they want you in their room";
      if (onFarm(n)) return "Creating a Meta Performance Client Experience";
      return UNSURE;
    }
    function wed2For(n) {
      if (n === "Tricia Harding") return "You are leading Self-Management for Leaders";
      var t = leadTeam(n); if (t) return "All Coaching Teams. You are leading " + (t.label ? "your " + t.label + " group." : "your team.");
      t = memberTeam(n); if (t) return "All Coaching Teams, with " + teamName(t);
      if (isNew(n)) return "All Coaching Teams. Your team lead will confirm your group.";
      if (onFarm(n)) return "Self-Management for Leaders with Tricia";
      return UNSURE;
    }
    function choiceOf(n, rid) {
      if (!SIGN || !SIGN[rid]) return null;
      for (var k in SIGN[rid]) { if (SIGN[rid][k].indexOf(n) > -1) return k; }
      return null;
    }
    function openFor(n, rid) {
      var l = LEADS[rid][n]; if (l) return { t: "You are leading " + optTitle(rid, l) };
      var sg = ARCS ? suggest(n, rid) : [];
      var c = choiceOf(n, rid);
      if (c) return { t: optTitle(rid, c) + (sg.length && sg[0] !== c ? ". We suggested " + optTitle(rid, sg[0]) + " for you" : "") };
      var tail = sg.length ? ". We suggest this breakout for you: " + optTitle(rid, sg[0]) : "";
      if (apiDown) return { t: "Sign up on the retreat website" + tail, todo: true };
      if (!SIGN) return { t: "Loading" };
      return { t: "Not signed up yet" + tail, todo: true, cta: true };
    }
    var DOW = { "10/10": "Sat", "10/11": "Sun", "10/16": "Fri", "10/17": "Sat", "10/18": "Sun", "10/19": "Mon", "10/20": "Tue", "10/21": "Wed", "10/22": "Thu", "10/23": "Fri", "10/29": "Thu" };
    function dayName(d) { if (!d) return ""; var q = d.replace("?", ""); return (DOW[q] ? DOW[q] + " " : "") + q + (d.indexOf("?") > -1 ? " (date to confirm)" : ""); }
    function flyText(n, w) {
      var f = FLY[n]; if (!f) return null;
      var d = w === "a" ? f[0] : f[3], m = w === "a" ? f[1] : f[4], no = w === "a" ? f[2] : f[5];
      if (m === -1) return (d ? dayName(d) + ". " : "") + "Driving";
      if (m === -2 && !no) return d ? dayName(d) + ". Flight not on file yet" : null;
      return (dayName(d) + (m >= 0 ? ", " + fmt(m) : "") + (no ? " · " + no : "")).trim();
    }
    function near(n, w) {
      var f = FLY[n]; if (!f) return [];
      var di = w === "a" ? 0 : 3, mi = w === "a" ? 1 : 4;
      if (f[mi] < 0) return [];
      return Object.keys(FLY).filter(function (x) { var g = FLY[x]; return x !== n && g[di] === f[di] && g[mi] >= 0 && Math.abs(g[mi] - f[mi]) <= 60; })
        .sort(function (a, b) { return Math.abs(FLY[a][mi] - f[mi]) - Math.abs(FLY[b][mi] - f[mi]); })
        .map(function (x) { return x + " (" + fmt(FLY[x][mi]) + ")"; });
    }
    function row(label, text, todo) {
      var r = el("li", "plan-row"); r.appendChild(el("i", null, label));
      r.appendChild(el("span", todo ? "todo" : null, text)); return r;
    }
    function goRound(rid) {
      var it = ROUNDS[rid]; if (it._open) it._open(true);
      var t = it._node; if (!t) return;
      try { t.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { t.scrollIntoView(true); }
    }
    var NOFLY = "Not on file. Text Laura Vander Neut, our travel advisor.";
    /* sessions people lead, host, speak at, or sit on the panel for: name: [[day index (0 Mon to 3 Thu), start, what]] */
    var LEADING = {
      "Doug Melder": [[1, "10:00", "You are on the panel for Vision for the Year Ahead"]],
      "Tricia Harding": [[1, "10:00", "You are leading the keynote for Vision for the Year Ahead"]],
      "Dan Leffelaar": [[1, "12:00", "You are on the Becoming a Million Dollar Coach Panel"], [2, "09:00", "You are leading the keynote for Nobility + the Next Decade"]],
      "Jason Jaggard": [[1, "12:00", "You are on the Becoming a Million Dollar Coach Panel"], [2, "09:00", "You are leading the live Q&A for Nobility + the Next Decade"]],
      "Houston Bradley": [[1, "07:00", "You are leading Novus Global Run Club (optional)"]],
      "Jean-Marie Jobs": [[1, "08:00", "You are leading the Breakfast Session: T3 and the Difference Between Coaching and Training"], [2, "10:30", "You are leading Ownership + Complaints"]],
      "Joseph Barkley": [[1, "09:00", "You are leading 10th Anniversary"]],
      "David Miller": [[1, "10:00", "You are on the panel for Vision for the Year Ahead"]],
      "Jaralyn Monkman": [[1, "10:00", "You are on the panel for Vision for the Year Ahead"]],
      "Charise Proctor": [[1, "10:00", "You are on the panel for Vision for the Year Ahead"]],
      "Jon Roberts": [[1, "12:00", "You are leading the Becoming a Million Dollar Coach Panel"]],
      "Andrew Ladd": [[2, "10:30", "You are leading Ownership + Complaints"]],
      "Rachel Baggech": [[1, "15:00", "You are leading Long Hike + Climb"]],
      "Sean Patton": [[3, "09:00", "You are leading Speakers Salon: Nobility in Practice"]],
      "Kristin Frade": [[3, "09:00", "You are leading Speakers Salon: Nobility in Practice"]]
    };
    function slot(d, hhmm) { return 1000 + d * 2000 + mins(hhmm); }
    function planList(n, mine) {
      var ul = el("ul", "plan");
      var head = el("li", "plan-name"); head.appendChild(el("b", null, n)); ul.appendChild(head);
      ul.appendChild(row("Roommate", roommate(n)));
      var items = [];
      function add(k, r) { items.push({ k: k, i: items.length, r: r }); }
      add(0, row("Arrive", flyText(n, "a") || NOFLY, !FLY[n]));
      if (mine) { var na = near(n, "a"); if (na.length) add(1, row("Ride buddies", "Landing within an hour of you: " + na.slice(0, 6).join(", "))); }
      add(slot(1, "13:00"), row("Tue 1:00", tue1For(n, mine)));
      var t2 = openFor(n, "tue2"); add(slot(1, "14:10"), row("Tue 2:10", t2.t, t2.todo));
      add(slot(1, "17:30"), row("Tue dinner", dinnerFor(n, mine)));
      add(slot(2, "11:45"), row("Wed lunch", FLY[n] && FLY[n][7] ? (FLY[n][7].indexOf("Dietary") === 0 ? "None of the options fit your diet. Check with Laura Vander Neut." : FLY[n][7]) : "No order on file. Text Laura Vander Neut."));
      var w1 = openFor(n, "wed1"); add(slot(2, "12:15"), row("Wed 12:15", w1.t, w1.todo));
      add(slot(2, "13:50"), row("Wed 1:50", wed2For(n)));
      if (LUNCH_IN.indexOf(n) > -1) add(slot(0, "13:00"), row("Mon 1:00", "Team Lead Working Time + Lunch, White Pine Parlor 1"));
      else if (LUNCH_MAYBE.indexOf(n) > -1) add(slot(0, "13:00"), row("Mon 1:00", "Lunch with the Team Leads, White Pine Parlor 1. Grab lunch and go, or stay for the working time."));
      var acts = [];
      if (HIKE.indexOf(n) > -1 && n !== "Rachel Baggech") acts.push("Long Hike + Climb with Rachel Baggech. Dress for it and bring water");
      if (RIDE_TUE.indexOf(n) > -1) acts.push("Horseback riding with Wasatch Adventure Group, weather permitting");
      if (n !== "Rachel Baggech") add(slot(1, "15:00"), row("Tue 3:00", acts.length ? acts.join(". ") + "." : "Free time until 5:30. Rest, explore, or get outside."));
      add(slot(2, "14:50"), row("Wed 2:50", "Rest window. Protected time before GLO-BALL."));
      (LEADING[n] || []).forEach(function (x) {
        var r = row(DAYS[x[0]].dow + " " + fmt(mins(x[1]), false), x[2]);
        r.lastChild.className = "leadrow";
        add(slot(x[0], x[1]), r);
      });
      add(99000, row("Depart", flyText(n, "d") || NOFLY, !FLY[n]));
      if (mine) { var nd = near(n, "d"); if (nd.length) add(99001, row("Ride buddies", "Flying out within an hour of you: " + nd.slice(0, 6).join(", "))); }
      items.sort(function (a, b) { return a.k - b.k || a.i - b.i; }).forEach(function (x) { ul.appendChild(x.r); });
      if (mine && (t2.cta || w1.cta)) {
        var go = el("li");
        var bt = el("button", "tbtn solid", "Sign up for your breakouts"); bt.type = "button";
        bt.addEventListener("click", function () { goRound(t2.cta ? "tue2" : "wed1"); });
        go.appendChild(bt); ul.appendChild(go);
      }
      return ul;
    }

    /* ride board + lunch list in Good to Know */
    function sortDay(d) { var q = d.replace("?", "").split("/"); return (+q[0]) * 100 + (+q[1]); }
    function board(w) {
      var di = w === "a" ? 0 : 3, mi = w === "a" ? 1 : 4, fi = w === "a" ? 2 : 5, byDay = {};
      Object.keys(FLY).forEach(function (n) { var f = FLY[n]; if (f[mi] < 0 || !f[di]) return; var k = f[di].replace("?", ""); (byDay[k] = byDay[k] || []).push(n); });
      var wrap = el("div");
      wrap.appendChild(el("h4", null, w === "a" ? "Landing at Salt Lake City" : "Flying out of Salt Lake City"));
      Object.keys(byDay).sort(function (a, b) { return sortDay(a) - sortDay(b); }).forEach(function (d) {
        wrap.appendChild(el("div", "bday", dayName(d)));
        var ul = el("ul"), hours = {};
        byDay[d].sort(function (a, b) { return FLY[a][mi] - FLY[b][mi]; }).forEach(function (n) { var h = Math.floor(FLY[n][mi] / 60); (hours[h] = hours[h] || []).push(n); });
        Object.keys(hours).sort(function (a, b) { return a - b; }).forEach(function (h) {
          var li = el("li"); li.appendChild(el("b", null, fmt(h * 60).replace(":00", "")));
          var sp = el("span");
          hours[h].forEach(function (n, i) {
            if (i) sp.appendChild(document.createTextNode(", "));
            var who = el("span", n === me ? "mine" : null, n); sp.appendChild(who);
            sp.appendChild(el("small", null, " " + fmt(FLY[n][mi], false)));
          });
          li.appendChild(sp); ul.appendChild(li);
        });
        wrap.appendChild(ul);
      });
      return wrap;
    }
    function toggler(btnId, boxId, build, showTxt, hideTxt) {
      var b = document.getElementById(btnId), box = document.getElementById(boxId); if (!b || !box) return;
      b.addEventListener("click", function () {
        if (box.hidden) { box.textContent = ""; box.appendChild(build()); }
        box.hidden = !box.hidden; b.textContent = box.hidden ? showTxt : hideTxt;
      });
    }
    toggler("rideBtn", "rides", function () {
      var f = document.createDocumentFragment(); f.appendChild(board("a")); f.appendChild(board("d"));
      f.appendChild(el("p", "fnote", "As reported on the registration form, so flights may have changed since. Driving or missing a flight? You are not on the board yet. Post in the WhatsApp group to share a ride."));
      return f;
    }, "Show the ride board", "Hide the ride board");
    toggler("lunchBtn", "lunches", function () {
      var by = {}, f = document.createDocumentFragment();
      Object.keys(FLY).forEach(function (n) { var l = FLY[n][7]; if (l) (by[l] = by[l] || []).push(n); });
      Object.keys(by).forEach(function (k) {
        var w = el("div"); w.appendChild(el("div", "bday", k + " (" + by[k].length + ")"));
        var ul = el("ul", "names"); by[k].sort().forEach(function (n) { ul.appendChild(el("li", n === me ? "me" : null, n)); }); w.appendChild(ul); f.appendChild(w);
      });
      f.appendChild(el("p", "fnote", "Not on the list? Text Laura Vander Neut before Wednesday."));
      return f;
    }, "See every order", "Hide the orders");
    function setMe(n) { me = n; store.set("ngr-me", n); renderAll(); }

    var mpMe = document.getElementById("mpMe");
    function renderMe() {
      if (!mpMe) return;
      mpMe.textContent = "";
      if (!me) { mpMe.appendChild(el("p", "mp-sub", "Type your name below, then tap “This is me” to keep your plan on this phone.")); return; }
      var pl = planList(me, true);
      var sw = el("button", "linkbtn", "Not you? Switch"); sw.type = "button";
      sw.addEventListener("click", function () { setMe(null); var qi = document.getElementById("rmq"); if (qi) qi.focus(); });
      pl.firstChild.appendChild(sw);
      mpMe.appendChild(pl);
    }

    var q = document.getElementById("rmq"), out = document.getElementById("rmres");
    function matches(v) {
      v = v.trim().toLowerCase(); if (v.length < 2) return [];
      return NAMES.filter(function (n) { n = n.toLowerCase(); return n.indexOf(v) === 0 || n.indexOf(" " + v) > -1; }).slice(0, 6);
    }
    function renderSearch() {
      if (!q || !out) return;
      out.textContent = "";
      var hits = matches(q.value);
      if (q.value.trim().length >= 2 && !hits.length) {
        var none = el("li"); none.appendChild(el("b", null, "No match yet"));
        none.appendChild(el("span", null, "Try another spelling, or text Laura Vander Neut.")); out.appendChild(none); return;
      }
      hits.forEach(function (n) {
        var li = el("li"); li.appendChild(planList(n, false));
        if (n !== me) {
          var b = el("button", "tbtn", "This is me"); b.type = "button";
          b.addEventListener("click", function () { setMe(n); q.value = ""; renderSearch(); goTo("me"); });
          li.appendChild(b);
        }
        out.appendChild(li);
      });
    }
    if (q) q.addEventListener("input", renderSearch);

    /* who-are-you sheet */
    var sheet = null;
    function openPicker(then) {
      pending = then;
      if (!sheet) {
        sheet = el("div", "pick"); sheet.setAttribute("role", "dialog"); sheet.setAttribute("aria-modal", "true"); sheet.setAttribute("aria-label", "Who are you?");
        var inner = el("div", "pick-in");
        inner.appendChild(el("h3", null, "Who are you?"));
        inner.appendChild(el("p", "mp-sub", "Pick your name once. This phone will remember it."));
        var inp = el("input"); inp.type = "search"; inp.placeholder = "Type your first or last name"; inp.setAttribute("aria-label", "Your name");
        var list = el("div", "pick-list");
        var cancel = el("button", "linkbtn", "Cancel"); cancel.type = "button";
        cancel.addEventListener("click", function () { sheet.hidden = true; pending = null; });
        inp.addEventListener("input", function () {
          list.textContent = "";
          matches(inp.value).forEach(function (n) {
            var b = el("button", null, n); b.type = "button";
            b.addEventListener("click", function () { sheet.hidden = true; setMe(n); var f = pending; pending = null; if (f) f(); });
            list.appendChild(b);
          });
        });
        sheet.addEventListener("click", function (e) { if (e.target === sheet) { sheet.hidden = true; pending = null; } });
        inner.appendChild(inp); inner.appendChild(list); inner.appendChild(cancel);
        sheet.appendChild(inner); document.body.appendChild(sheet);
        sheet._inp = inp; sheet._list = list;
      }
      sheet._inp.value = ""; sheet._list.textContent = ""; sheet.hidden = false;
      setTimeout(function () { sheet._inp.focus(); }, 50);
    }

    /* sign-up rows inside the breakout cards */
    var rows = {};
    OPEN.forEach(function (rid) {
      var it = ROUNDS[rid]; rows[rid] = {};
      var note = el("p", "signnote"); note.hidden = true; it._card.insertBefore(note, it._card.firstChild.nextSibling); it._signNote = note;
      it.options.forEach(function (o) {
        var host = it._optNodes[o.sid];
        var bar = el("div", "sign");
        var btn = el("button", "tbtn"); btn.type = "button";
        var cnt = el("span", "cnt");
        var whoBtn = el("button", "linkbtn", "See who"); whoBtn.type = "button";
        var who = el("ul", "goinglist"); who.hidden = true;
        var sug = el("span", "sugtag", "Suggested for you"); sug.hidden = true;
        whoBtn.addEventListener("click", function () { who.hidden = !who.hidden; whoBtn.textContent = who.hidden ? "See who" : "Hide"; });
        btn.addEventListener("click", function () {
          var act = function () {
            var cur = choiceOf(me, rid);
            save(rid, cur === o.sid ? null : o.sid);
          };
          if (!me) openPicker(act); else act();
        });
        bar.appendChild(sug); bar.appendChild(btn); bar.appendChild(cnt); bar.appendChild(whoBtn); bar.appendChild(who);
        host.appendChild(bar);
        rows[rid][o.sid] = { bar: bar, btn: btn, cnt: cnt, whoBtn: whoBtn, who: who, sug: sug };
      });
    });
    function renderRows() {
      OPEN.forEach(function (rid) {
        var it = ROUNDS[rid];
        var myLead = me ? LEADS[rid][me] : null;
        var mine = me ? choiceOf(me, rid) : null;
        var sgs = ARCS && me && !myLead ? suggest(me, rid) : [];
        it._signNote.hidden = !apiDown && !myLead;
        it._signNote.textContent = apiDown ? "Sign-ups are open on the retreat website (scan the QR code on your lanyard)." : myLead ? "You are leading " + optTitle(rid, myLead) + " in this round, so no sign-up needed." : "";
        it.options.forEach(function (o) {
          var r = rows[rid][o.sid];
          r.bar.hidden = apiDown;
          r.sug.hidden = sgs.indexOf(o.sid) < 0;
          var names = (SIGN && SIGN[rid] && SIGN[rid][o.sid]) || [];
          r.cnt.textContent = !SIGN ? "" : names.length === 0 ? "No one yet" : names.length === 1 ? "1 going" : names.length + " going";
          r.whoBtn.hidden = !names.length;
          r.who.textContent = ""; names.slice().sort().forEach(function (nm) { r.who.appendChild(el("li", null, nm)); });
          r.btn.hidden = !!myLead;
          r.btn.className = mine === o.sid ? "tbtn solid" : "tbtn";
          r.btn.textContent = mine === o.sid ? "You are going. Tap to undo" : mine ? "Switch to this one" : "I am going";
        });
      });
    }
    function renderAll() { renderRows(); renderMe(); renderSearch(); }

    function api(method, body) {
      var opt = { method: method, credentials: "same-origin" };
      if (body) { opt.headers = { "Content-Type": "application/json" }; opt.body = JSON.stringify(body); }
      return fetch("/api/signups", opt).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); });
    }
    function load() {
      api("GET").then(function (d) { SIGN = d.signups || {}; apiDown = false; renderAll(); })
        .catch(function () { apiDown = true; renderAll(); });
    }
    function save(rid, sid) {
      api("POST", { name: me, round: rid, session: sid }).then(function (d) { SIGN = d.signups || {}; renderAll(); })
        .catch(function () { alertOnce(rid); });
    }
    function alertOnce(rid) {
      var n = ROUNDS[rid]._signNote; n.hidden = false; n.textContent = "That did not save. Check your connection and try again.";
    }
    document.addEventListener("click", function (e) {
      var t = e.target && e.target.closest ? e.target.closest("[data-go]") : null;
      if (t) { e.preventDefault(); goTo(t.getAttribute("data-go")); }
    });
    renderAll();
    load();
    setInterval(load, 60000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) load(); });
  })();

  /* ---------- day bar follows the scroll ---------- */
  function setCurrent(key) {
    SECTIONS.forEach(function (k) { linkNodes[k].setAttribute("aria-current", k === key ? "true" : "false"); });
  }
  function onScroll() {
    var line = 196, cur = null;
    SECTIONS.forEach(function (k) { if (dayNodes[k].getBoundingClientRect().top <= line) cur = k; });
    setCurrent(cur);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- live now / next (Mountain Time) ---------- */
  function mountainNow() {
    if (window.__simNow) return window.__simNow;
    try {
      var parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      return { date: o.year + "-" + o.month + "-" + o.day, m: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) { return null; }
  }

  var live = document.getElementById("live"), liveRows = document.getElementById("liveRows"), jumpBtn = document.getElementById("jumpNow");
  var jumpTarget = null, currentNow = null;
  jumpBtn.addEventListener("click", function () { if (jumpTarget) jumpTarget.scrollIntoView({ block: "start" }); });

  function liveRow(label, it) {
    var r = el("div", "live-row");
    r.appendChild(el("span", "live-label", label));
    var tx = el("span", "live-text", (it.word && it.kind === "main" ? it.word + ": " : "") + it.title);
    if (label === "Up next" && it.start) { tx.appendChild(document.createTextNode(" ")); tx.appendChild(el("span", null, "at " + fmt(mins(it.start)))); }
    if (label === "Now" && it._e) { tx.appendChild(document.createTextNode(" ")); tx.appendChild(el("span", null, "until " + fmt(it._e))); }
    r.appendChild(tx);
    return r;
  }

  function tick() {
    var now = mountainNow();
    DAYS.forEach(function (d) {
      var dot = linkNodes[d.key].querySelector(".today"); if (dot) dot.remove();
      d.items.forEach(function (it) {
        it._node.classList.remove("is-now", "is-past");
        var old = it._chipHost && it._chipHost.querySelector(".chip.now"); if (old) old.remove();
      });
    });
    liveRows.textContent = ""; live.hidden = true; jumpTarget = null; currentNow = null;
    if (!now) return null;
    var today = null, todayIdx = -1;
    DAYS.forEach(function (d, i) { if (d.date === now.date) { today = d; todayIdx = i; } });
    // Fade earlier days once the retreat is underway
    DAYS.forEach(function (d, i) { if (todayIdx > -1 && i < todayIdx) d.items.forEach(function (it) { it._node.classList.add("is-past"); }); });
    if (!today) {
      var first = DAYS[0].date;
      if (now.date < first) {
        var pd = function (x) { var q = x.split("-"); return Date.UTC(+q[0], +q[1] - 1, +q[2]); };
        var n = Math.round((pd(first) - pd(now.date)) / 86400000);
        var r = el("div", "live-row");
        var lb = el("span", "live-label", "Countdown"); lb.style.width = "auto"; r.appendChild(lb);
        var tx = el("span", "live-text", n === 1 ? "1 day and a wake up" : n + " days to go");
        tx.appendChild(document.createTextNode(" ")); tx.appendChild(el("span", null, "Starts Monday, October 19"));
        r.appendChild(tx); liveRows.appendChild(r);
        jumpBtn.hidden = true; live.hidden = false;
      }
      return null;
    }
    jumpBtn.hidden = false;
    linkNodes[today.key].appendChild(el("span", "today"));
    var nowItem = null, nextItem = null;
    today.items.forEach(function (it) {
      if (it._s == null) return;
      if (now.m >= it._s && now.m < it._e && it.kind !== "end") { nowItem = it; }
      else if (now.m >= it._e) { it._node.classList.add("is-past"); }
      if (it._s > now.m && !nextItem) nextItem = it;
    });
    currentNow = nowItem;
    if (nowItem) {
      nowItem._node.classList.add("is-now");
      var c = el("span", "chip now", "Now");
      if (nowItem._chipHost) nowItem._chipHost.insertBefore(c, nowItem._chipHost.firstChild);
      liveRows.appendChild(liveRow("Now", nowItem));
    }
    if (nextItem) liveRows.appendChild(liveRow("Up next", nextItem));
    jumpTarget = (nowItem || nextItem || {})._node || dayNodes[today.key];
    jumpBtn.textContent = nowItem ? "Jump to now" : "Jump to next";
    if (nowItem || nextItem) live.hidden = false;
    return today.key;
  }

  var expandBtn = document.getElementById("expandAll"), allOpen = false;
  function setAll(v) {
    allOpen = v;
    DAYS.forEach(function (d) { d.items.forEach(function (it) { if (it._open) it._open(v); }); });
    expandBtn.textContent = v ? "Collapse all" : "Expand all";
    expandBtn.setAttribute("aria-pressed", v ? "true" : "false");
  }
  expandBtn.addEventListener("click", function () { setAll(!allOpen); store.set("ngr-expand", allOpen ? "1" : null); });
  if (store.get("ngr-expand") === "1") setAll(true);

  tick();
  if (currentNow && currentNow._open) currentNow._open(true);
  setInterval(tick, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) tick(); });
  window.__ngrTick = tick;
})();
</script>

</body>
</html>
`;
const LOGIN: string = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#000000">
<title>Novus Global Fall Retreat</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap">
<style>
:root { --bg: #000000; --g1: #191919; --g3: #3E3A39; --g4: #B3B5B8; --white: #FFFFFF; --acid: #4FC4FC; --err: #F2B8A8; --head: Futura, "Futura PT", "Jost", "Century Gothic", sans-serif; --body: "Avenir Next", Avenir, "Nunito Sans", "Segoe UI", system-ui, sans-serif; color-scheme: dark; }
* { box-sizing: border-box; }
html, body { height: 100%; }
body { margin: 0; background: var(--bg); color: var(--white); font-family: var(--body); display: grid; place-items: center; padding: 24px 16px; -webkit-font-smoothing: antialiased; }
main { width: 100%; max-width: 380px; display: grid; gap: 20px; }
.wordmark { display: inline-flex; align-items: center; gap: .55em; font-family: var(--head); font-weight: 500; letter-spacing: .32em; font-size: .82rem; text-transform: uppercase; }
.wordmark svg { width: 2.1em; height: 1.3em; flex: none; }
h1 { margin: 0; font-family: var(--head); font-weight: 500; font-size: 2rem; line-height: 1.1; letter-spacing: .14em; text-transform: uppercase; }
h1 span { display: block; color: var(--g4); font-weight: 300; }
p { margin: 0; color: var(--g4); }
form { display: grid; gap: 10px; }
label { font-family: var(--head); text-transform: uppercase; letter-spacing: .22em; font-size: .7rem; color: var(--g4); }
input { font: inherit; font-size: 1.05rem; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--g3); background: var(--g1); color: var(--white); width: 100%; }
input:focus { outline: none; border-color: var(--acid); }
button { font-family: var(--head); text-transform: uppercase; letter-spacing: .2em; font-size: .8rem; font-weight: 500; padding: 14px; border-radius: 999px; border: 0; background: var(--white); color: var(--bg); cursor: pointer; }
button:focus-visible { outline: 2px solid var(--acid); outline-offset: 2px; }
.err { color: var(--err); font-size: .92rem; }
</style>
</head>
<body>
<main>
  <div class="wordmark" aria-label="Novus Global">
    <span>Novus</span>
    <svg viewBox="0 0 40 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M1 13.2 H9.5 A9.5 9.5 0 0 0 28.5 13.2"/><path d="M11.5 10.8 A9.5 9.5 0 0 1 30.5 10.8 H39"/></svg>
    <span>Global</span>
  </div>
  <h1>Fall Retreat <span>2026</span></h1>
  <p>Enter the retreat password to see the schedule.</p>
  <form method="post" action="/login">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" autofocus required>
    <!--ERROR-->
    <button type="submit">View schedule</button>
  </form>
</main>
</body>
</html>
`;

const COOKIE = "ngr_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const enc = new TextEncoder();

// Breakout sign-ups. Names come from the attendee list inside the page.
const ROUNDS: Record<string, string[]> = {
  tue2: ["compete", "agents", "intake", "silos"],
  wed1: ["soul", "belief", "sprint", "mpl"],
};
const roomsSrc = PAGE.slice(PAGE.indexOf("var ROOMS = ") + 12, PAGE.indexOf(";", PAGE.indexOf("var ROOMS = ")));
const NAMES = new Set<string>((JSON.parse(roomsSrc) as string[][]).map((r) => r[0]));

const leadsSrc = PAGE.slice(PAGE.indexOf("var LEADS = ") + 12, PAGE.indexOf(";", PAGE.indexOf("var LEADS = ")));
const LEADS = JSON.parse(leadsSrc) as Record<string, Record<string, string>>;
const TITLES: Record<string, string> = {
  compete: "Competitive Landscape", agents: "Building Agents + Skills", intake: "The Art of Creating the Intake", silos: "Understanding (and Avoiding) Silos",
  soul: "Soul-Line Coaching for Beginners", belief: "Belief Work", sprint: "Sprint Work", mpl: "Meta Performance Leadership",
};

const useMemory = !Bun.env.DATABASE_URL && Bun.env.DEV_MEMORY === "1";
const memory = new Map<string, string>();
let ready: Promise<void> | null = null;
function db() {
  if (!ready) {
    ready = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS signups (name text NOT NULL, round text NOT NULL, session text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (name, round))`;
    })();
    ready.catch(() => { ready = null; });
  }
  return ready;
}

async function allSignups(): Promise<{ name: string; round: string; session: string; updated_at?: string }[]> {
  if (useMemory) return [...memory.entries()].map(([k, session]) => { const [name, round] = k.split("|"); return { name, round, session }; });
  await db();
  return await sql`SELECT name, round, session, updated_at FROM signups ORDER BY updated_at`;
}

async function grouped() {
  const out: Record<string, Record<string, string[]>> = {};
  for (const r of Object.keys(ROUNDS)) { out[r] = {}; for (const s of ROUNDS[r]) out[r][s] = []; }
  for (const row of await allSignups()) {
    if (out[row.round] && out[row.round][row.session]) out[row.round][row.session].push(row.name);
  }
  return out;
}

async function setSignup(name: string, round: string, session: string | null) {
  if (useMemory) { if (session) memory.set(name + "|" + round, session); else memory.delete(name + "|" + round); return; }
  await db();
  if (session) {
    await sql`INSERT INTO signups (name, round, session, updated_at) VALUES (${name}, ${round}, ${session}, now())
      ON CONFLICT (name, round) DO UPDATE SET session = EXCLUDED.session, updated_at = now()`;
  } else {
    await sql`DELETE FROM signups WHERE name = ${name} AND round = ${round}`;
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { ...baseHeaders, "Content-Type": "application/json" } });
}

function csvCell(v: string): string {
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

async function sessionToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("ngr-session-v1"));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function readCookie(req: Request, name: string): string | null {
  const raw = req.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

const baseHeaders = {
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
};

function html(body: string, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(body, { status, headers: { ...baseHeaders, "Content-Type": "text/html; charset=utf-8", ...extra } });
}

function loginPage(error?: string, status = 200): Response {
  const msg = error ? `<p class="err" role="alert">${error}</p>` : "";
  return html(LOGIN.replace("<!--ERROR-->", msg), status);
}

if (!useMemory && Bun.env.DATABASE_URL) {
  db().then(() => console.log("db ready")).catch((e) => console.error("db startup error", e && e.message ? e.message : e));
}

Bun.serve({
  port: Number(Bun.env.PORT) || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/healthz") return new Response("ok");

    const password = Bun.env.SITE_PASSWORD || "";
    if (!password) {
      return loginPage("The site password has not been set up yet. Please check back soon.", 503);
    }
    const expected = await sessionToken(password);

    if (url.pathname === "/login" && req.method === "POST") {
      let given = "";
      try {
        const form = await req.formData();
        given = String(form.get("password") || "");
      } catch {}
      if (safeEqual(given.trim(), password)) {
        const secure = url.protocol === "https:" || req.headers.get("x-forwarded-proto") === "https";
        const cookie = `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
        return new Response(null, { status: 303, headers: { ...baseHeaders, Location: "/", "Set-Cookie": cookie } });
      }
      await Bun.sleep(600);
      return loginPage("That password didn't work. Please try again.", 401);
    }

    if (url.pathname === "/logout") {
      return new Response(null, { status: 303, headers: { ...baseHeaders, Location: "/", "Set-Cookie": `${COOKIE}=; Path=/; Max-Age=0` } });
    }

    const token = readCookie(req, COOKIE);
    const authed = !!token && safeEqual(token, expected);

    if (url.pathname === "/api/signups") {
      if (!authed) return json({ error: "login required" }, 401);
      if (!useMemory && !Bun.env.DATABASE_URL) return json({ error: "sign-ups are not set up yet" }, 503);
      try {
        if (req.method === "POST") {
          const body = (await req.json()) as { name?: string; round?: string; session?: string | null };
          const name = String(body.name || "");
          const round = String(body.round || "");
          const session = body.session == null ? null : String(body.session);
          if (!NAMES.has(name) || !ROUNDS[round] || (session !== null && !ROUNDS[round].includes(session))) {
            return json({ error: "bad request" }, 400);
          }
          await setSignup(name, round, session);
        } else if (req.method !== "GET") {
          return json({ error: "method not allowed" }, 405);
        }
        return json({ signups: await grouped() });
      } catch (e) {
        console.error("signups error", e);
        return json({ error: "server error" }, 500);
      }
    }

    if (url.pathname === "/signups/status") {
      if (!authed) return loginPage();
      try {
        const rows = await allSignups();
        const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const labels: Record<string, string> = { tue2: "Tuesday 2:10 Choose Your Own Adventure", wed1: "Wednesday 12:15 Group A" };
        let body = "";
        for (const round of Object.keys(ROUNDS)) {
          const leaders = new Set(Object.keys(LEADS[round] || {}));
          const eligible = [...NAMES].filter((n) => !leaders.has(n));
          const done = new Set(rows.filter((r) => r.round === round && !leaders.has(r.name)).map((r) => r.name));
          const pct = eligible.length ? Math.round((done.size / eligible.length) * 100) : 0;
          const per = ROUNDS[round].map((sid) => `<li>${esc(TITLES[sid])}: <b>${rows.filter((r) => r.round === round && r.session === sid).length}</b></li>`).join("");
          const missing = eligible.filter((n) => !done.has(n)).sort();
          body += `<section><h2>${labels[round]}</h2><p class="big"><b>${pct}%</b> signed up (${done.size} of ${eligible.length}, not counting presenters). Goal: 80%.</p><ul>${per}</ul><details><summary>Not signed up yet (${missing.length})</summary><p>${missing.map(esc).join(", ")}</p></details></section>`;
        }
        const pageHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Sign-up status</title><style>body{margin:0;background:#191919;color:#DADBDC;font-family:"Avenir Next",Avenir,system-ui,sans-serif;padding:20px 16px 40px;line-height:1.5}main{max-width:640px;margin:0 auto;display:grid;gap:22px}h1{font-size:1.3rem;color:#fff;margin:0}h2{font-size:1rem;color:#4FC4FC;margin:0 0 6px}section{background:#252829;border:1px solid #3E3A39;border-radius:12px;padding:14px}.big b{font-size:1.6rem;color:#fff}ul{margin:6px 0;padding-left:1.1rem}summary{cursor:pointer;color:#fff;font-weight:600}a{color:#4FC4FC}</style></head><body><main><h1>Breakout sign-up status</h1>${body}<p><a href="/signups.csv">Download every sign-up (CSV)</a> · <a href="/">Back to the schedule</a></p></main></body></html>`;
        return html(pageHtml);
      } catch (e) {
        console.error("status error", e);
        return new Response("Could not load sign-ups.", { status: 500 });
      }
    }

    if (url.pathname === "/signups.csv") {
      if (!authed) return loginPage();
      try {
        const rows = await allSignups();
        const titles: Record<string, string> = {
          tue2: "Tuesday 2:10 Choose Your Own Adventure", wed1: "Wednesday 12:15 Group A",
          compete: "Competitive Landscape", agents: "Building Agents + Skills", intake: "The Art of Creating the Intake", silos: "Understanding (and Avoiding) Silos",
          soul: "Soul-Line Coaching for Beginners", belief: "Belief Work", sprint: "Sprint Work", mpl: "Meta Performance Leadership",
        };
        const lines = ["Round,Session,Name,Signed up"];
        rows.sort((a, b) => (a.round + a.session + a.name).localeCompare(b.round + b.session + b.name));
        for (const r of rows) lines.push([titles[r.round] || r.round, titles[r.session] || r.session, r.name, String(r.updated_at || "")].map(csvCell).join(","));
        return new Response(lines.join("\n") + "\n", { headers: { ...baseHeaders, "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="retreat-breakout-signups.csv"' } });
      } catch (e) {
        console.error("csv error", e);
        return new Response("Could not load sign-ups.", { status: 500 });
      }
    }

    if (authed) return html(PAGE);
    return loginPage();
  },
});
