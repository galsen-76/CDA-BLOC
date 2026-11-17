/* =====================================================================
   BLOC Workspace — vues d'avancement (Dataview)

   Dans une note :
     ```dataviewjs
     await dv.view("90 - Outils/Scripts/equipe", { view: "accueil" })
     ```
   Vues :
     accueil            tableau de bord général (tous les blocs, tous les membres)
     bloc               avancement d'UN bloc (la note doit être dans le dossier du bloc)
     membre { qui }     l'espace d'une personne : ses sections, ses relectures
     equipe             qui fait quoi (tableau généré, rien à remplir à la main)
     calendrier         mois : jalons des blocs (J1, J2, oral), réunions, échéances

   Ce que lit le script (propriétés en haut des notes) :
     type: section | tache | bloc | reunion
     (bloc : j1, j2, j3, rendu = dates ; reunion : date = AAAA-MM-JJ HH:mm)
     statut: à faire | en cours | à relire | fait
     responsable: Prénom      relecteur: Prénom
     jour: J1 | J2 | J3       echeance: AAAA-MM-JJ     pages: 2
   Prérequis : plugin Dataview + « Enable JavaScript Queries ».
   ===================================================================== */

const MEMBRES = ["Camille", "Oumar", "Alescis"];
const JOURNAL = (qui) => `01 - Membres/${qui}/Journal`;

const M = window.moment;
const opts = input || {};
const cur = dv.current();
const today = M().startOf("day");
const root = dv.container.createDiv({ cls: "dw-root" });

/* ---------- Statuts ----------------------------------------------------- */
const norm = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const KIND = (s) => {
  const n = norm(s);
  if (["fait", "termine", "terminee", "done", "ok", "valide"].includes(n)) return "done";
  if (["a relire", "relecture", "en relecture", "review"].includes(n)) return "review";
  if (["en cours", "doing", "commence"].includes(n)) return "doing";
  return "todo";
};
const COLS = [
  { kind: "todo", label: "À faire" },
  { kind: "doing", label: "En cours" },
  { kind: "review", label: "À relire" },
  { kind: "done", label: "Fait" },
];
const WEIGHT = { todo: 0, doing: 0.4, review: 0.8, done: 1 };
const TONE = { todo: "blue", doing: "orange", review: "violet", done: "green" };
const LABEL = Object.fromEntries(COLS.map((c) => [c.kind, c.label]));

/* ---------- Utilitaires ------------------------------------------------- */
const person = (v) => {
  if (!v) return "";
  if (typeof v === "object" && v.path) return v.path.split("/").pop().replace(/\.md$/, "");
  return String(v).replace(/^\[\[|\]\]$/g, "").split("|")[0].trim();
};
const toneOf = (qui) => (MEMBRES.includes(qui) ? "is-" + norm(qui) : "is-grey");
const toM = (d) => (!d ? null : d.toISO ? M(d.toISO()) : M(String(d), "YYYY-MM-DD"));
const pct = (items) => (items.length ? Math.round((100 * items.reduce((a, i) => a + WEIGHT[i.kind], 0)) / items.length) : 0);
const blocOf = (path) => path.split("/").find((s) => /^\d+ - BLOC/i.test(s)) || "";

function md(parent, text, cls) {
  const el = dv.el("div", text, cls ? { cls } : {});
  parent.appendChild(el);
  return el;
}
function panel(parent, title, toneCls) {
  const p = parent.createDiv({ cls: "dw-panel " + (toneCls || "") });
  p.createDiv({ cls: "dw-panel-title", text: title });
  return p;
}
function empty(parent, text) { parent.createDiv({ cls: "dw-empty", text: text || "Rien pour l'instant" }); }
function badge(parent, text, toneCls) { parent.createSpan({ cls: "dw-badge " + (toneCls || ""), text }); }
function bar(parent, v) {
  const b = parent.createDiv({ cls: "dw-progress" });
  b.createDiv({ cls: "dw-progress-fill", attr: { style: `width:${Math.max(0, Math.min(100, v))}%` } });
}
function stat(parent, value, label, tone) {
  const s = parent.createDiv({ cls: "dw-stat is-" + tone });
  s.createDiv({ cls: "dw-stat-value", text: String(value) });
  s.createDiv({ cls: "dw-stat-label", text: label });
}
function progressRow(parent, labelMd, items) {
  const r = parent.createDiv({ cls: "dw-row" });
  const top = r.createDiv({ cls: "dw-row-top" });
  md(top, labelMd);
  const done = items.filter((i) => i.kind === "done").length;
  top.createDiv({ cls: "dw-row-pct", text: `${pct(items)} % · ${done}/${items.length} fait` });
  bar(r, pct(items));
}

/* ---------- Données ----------------------------------------------------- */
function loadItems(filterBloc) {
  return dv.pages()
    .where((p) => ["section", "tache"].includes(norm(p.type)))
    .where((p) => !p.file.path.startsWith("90 - Outils/"))
    .where((p) => !filterBloc || blocOf(p.file.path) === filterBloc)
    .array()
    .map((p) => ({
      p,
      kind: KIND(p.statut),
      type: norm(p.type),
      resp: person(p.responsable),
      relect: person(p.relecteur),
      jour: p.jour ? String(p.jour) : "",
      due: toM(p.echeance),
      pages: p.pages ?? null,
      ordre: Number(p.ordre ?? 999),
      bloc: blocOf(p.file.path),
    }))
    .sort((a, b) => (a.jour || "Z").localeCompare(b.jour || "Z") || a.ordre - b.ordre || a.p.file.name.localeCompare(b.p.file.name));
}
const blocs = () =>
  dv.pages().where((p) => norm(p.type) === "bloc").sort((p) => p.file.path).array();

/* ---------- Cartes ------------------------------------------------------ */
function card(parent, it, { showResp = true } = {}) {
  const c = parent.createDiv({ cls: "dw-card" + (it.kind === "done" ? " is-done" : "") });
  md(c, `[[${it.p.file.path.replace(/\.md$/, "")}|${it.p.file.name}]]`);
  const meta = c.createDiv({ cls: "dw-card-meta" });
  if (showResp && it.resp) badge(meta, it.resp, toneOf(it.resp));
  if (it.jour) badge(meta, it.jour, "is-grey");
  if (it.type === "tache") badge(meta, "tâche", "is-grey");
  if (it.due) {
    const late = it.kind !== "done" && it.due.isBefore(today);
    badge(meta, (late ? "en retard · " : "") + it.due.format("DD/MM"), late ? "is-red" : it.due.diff(today, "days") <= 2 ? "is-orange" : "is-grey");
  }
  if (it.relect && it.kind === "review") badge(meta, "relu par " + it.relect, toneOf(it.relect));
}
function board(parent, items, opt) {
  const b = parent.createDiv({ cls: "dw-board" });
  for (const col of COLS) {
    const list = items.filter((i) => i.kind === col.kind);
    const c = b.createDiv({ cls: "dw-col is-" + (col.kind === "todo" ? "todo" : col.kind) });
    const h = c.createDiv({ cls: "dw-col-head" });
    h.createSpan({ text: col.label });
    h.createSpan({ cls: "dw-col-count", text: String(list.length) });
    const box = c.createDiv({ cls: "dw-col-items" });
    if (!list.length) empty(box, "—");
    list.forEach((it) => card(box, it, opt));
  }
}
function stats(parent, items) {
  const s = parent.createDiv({ cls: "dw-stats" });
  stat(s, pct(items) + " %", "avancement", "violet");
  stat(s, items.filter((i) => i.kind === "done").length + "/" + items.length, "fait", "green");
  stat(s, items.filter((i) => i.kind === "doing").length, "en cours", "orange");
  stat(s, items.filter((i) => i.kind === "review").length, "à relire", "violet");
  const late = items.filter((i) => i.kind !== "done" && i.due && i.due.isBefore(today)).length;
  stat(s, late, "en retard", late ? "red" : "grey");
}

/* ---------- Vues -------------------------------------------------------- */
function viewAccueil() {
  const items = loadItems();
  root.createDiv({ cls: "dw-hero-title", text: "Tableau de bord de l'équipe" });
  root.createDiv({ cls: "dw-hero-sub", text: cap(today.clone().locale("fr").format("dddd D MMMM YYYY")) + " · Camille, Oumar, Alescis" });
  stats(root, items);
  const grid = root.createDiv({ cls: "dw-grid" });

  const pb = panel(grid, "Avancement par bloc", "is-violet");
  const bl = blocs();
  if (!bl.length) empty(pb, "Aucun bloc (note avec « type: bloc »)");
  for (const b of bl) {
    const its = items.filter((i) => i.bloc === blocOf(b.file.path));
    const rendu = toM(b.rendu);
    progressRow(pb, `[[${b.file.path.replace(/\.md$/, "")}|${b.titre || b.file.name}]]` + (rendu ? ` · oral le ${rendu.format("DD/MM")}` : ""), its);
  }

  const pm = panel(grid, "Avancement par personne", "is-blue");
  for (const qui of MEMBRES) progressRow(pm, `[[01 - Membres/${qui}/${qui}|${qui}]]`, items.filter((i) => i.resp === qui));

  for (const qui of MEMBRES) {
    const p = panel(grid, qui + " · en ce moment", toneOf(qui));
    const mine = items.filter((i) => i.resp === qui && i.kind !== "done");
    const toReview = items.filter((i) => i.relect === qui && i.kind === "review");
    const box = p.createDiv({ cls: "dw-items" });
    if (!mine.length && !toReview.length) empty(box, "Tout est fait 🎉");
    mine.slice(0, 6).forEach((it) => card(box, it, { showResp: false }));
    toReview.forEach((it) => card(box, { ...it, relect: "" }, { showResp: true }));
    if (toReview.length) p.createDiv({ cls: "dw-more", text: `${toReview.length} section(s) à relire pour ${qui}` });
  }
}

function viewBloc() {
  const bloc = blocOf(cur.file.path);
  const items = loadItems(bloc);
  stats(root, items);
  const pm = panel(root, "Avancement par personne", "is-blue");
  for (const qui of MEMBRES) progressRow(pm, qui, items.filter((i) => i.resp === qui));
  board(root, items);
}

function viewMembre() {
  const qui = opts.qui || cur.file.name;
  const items = loadItems().filter((i) => i.resp === qui);
  const toReview = loadItems().filter((i) => i.relect === qui && i.kind === "review");
  stats(root, items);
  const grid = root.createDiv({ cls: "dw-grid" });
  const r = panel(grid, "À relire pour toi", "is-violet");
  const rb = r.createDiv({ cls: "dw-items" });
  if (!toReview.length) empty(rb, "Rien à relire");
  toReview.forEach((it) => card(rb, it));
  board(grid, items, { showResp: false });
  const j = panel(grid, "Mon journal (5 derniers)", toneOf(qui));
  const notes = dv.pages(`"${JOURNAL(qui)}"`).where((p) => /^\d{4}-\d{2}-\d{2}/.test(p.file.name)).sort((p) => p.file.name, "desc").limit(5).array();
  if (!notes.length) empty(j, "Pas encore de journal : Ctrl+P → « Templater: Mon journal du jour »");
  else md(j, notes.map((n) => `- [[${n.file.path.replace(/\.md$/, "")}|${n.file.name}]]`).join("\n"), "dw-list");
}

function viewEquipe() {
  const items = loadItems();
  const rows = items.map((i) => [
    i.p.file.link, i.bloc.replace(/^\d+ - /, ""), i.resp || "—", i.relect || "—", i.jour || "—", LABEL[i.kind],
  ]);
  dv.table(["Section / tâche", "Bloc", "Responsable", "Relecteur", "Jour", "Statut"], rows);
}

/* ---------- Calendrier -------------------------------------------------- */
function agenda() {
  const ev = [];
  for (const b of blocs()) {
    const name = (b.titre || b.file.name).replace(/ - Vue d'ensemble$/, "");
    for (const [k, label] of [["j1", "J1"], ["j2", "J2"], ["j3", "J3"], ["rendu", "Oral"]]) {
      const m = toM(b[k]);
      if (m) ev.push({ m, kind: k === "rendu" || k === "j3" ? "red" : "violet", text: `${label} · [[${b.file.path.replace(/\.md$/, "")}|${name}]]` });
    }
  }
  for (const r of dv.pages().where((p) => norm(p.type) === "reunion").array()) {
    const m = r.date ? M(r.date.toISO ? r.date.toISO() : String(r.date)) : null;
    if (m && m.isValid()) ev.push({ m, kind: "blue", text: `${m.format("HH:mm") !== "00:00" ? m.format("HH:mm") + " · " : ""}Réunion · [[${r.file.path.replace(/\.md$/, "")}|${r.file.name}]]` });
  }
  for (const it of loadItems().filter((i) => i.due && i.kind !== "done")) {
    ev.push({ m: it.due, kind: it.due.isBefore(today) ? "red" : "orange", text: `Échéance · [[${it.p.file.path.replace(/\.md$/, "")}|${it.p.file.name}]] (${it.resp || "?"})` });
  }
  return ev.sort((a, b) => a.m.valueOf() - b.m.valueOf());
}

function viewCalendrier() {
  const ev = agenda();
  let month = today.clone().startOf("month");
  let picked = today.clone();
  const holder = root.createDiv({ cls: "dw-cal" });
  const draw = () => {
    holder.empty();
    const nav = holder.createDiv({ cls: "dw-cal-nav" });
    const prev = nav.createEl("button", { text: "‹" });
    nav.createSpan({ cls: "dw-cal-title", text: cap(month.clone().locale("fr").format("MMMM YYYY")) });
    const next = nav.createEl("button", { text: "›" });
    const now = nav.createEl("button", { text: "Aujourd'hui" });
    prev.onclick = () => { month.subtract(1, "month"); draw(); };
    next.onclick = () => { month.add(1, "month"); draw(); };
    now.onclick = () => { month = today.clone().startOf("month"); picked = today.clone(); draw(); };
    const g = holder.createDiv({ cls: "dw-cal-grid" });
    ["L", "M", "M", "J", "V", "S", "D"].forEach((d) => g.createDiv({ cls: "dw-cal-head", text: d }));
    const start = month.clone().startOf("isoWeek");
    const end = month.clone().endOf("month").endOf("isoWeek");
    for (const d = start.clone(); d.isSameOrBefore(end, "day"); d.add(1, "day")) {
      const day = d.clone();
      const todays = ev.filter((e) => e.m.isSame(day, "day"));
      const cell = g.createDiv({ cls: "dw-cal-cell" +
        (day.month() !== month.month() ? " is-out" : "") +
        (day.isSame(today, "day") ? " is-today" : "") +
        (todays.length ? " has-note" : "") });
      cell.createDiv({ cls: "dw-cal-num", text: String(day.date()) });
      const dots = cell.createDiv({ cls: "dw-cal-dots" });
      [...new Set(todays.map((e) => e.kind))].forEach((k) => dots.createSpan({ cls: "dw-dot is-" + k }));
      cell.onclick = () => { picked = day; draw(); };
    }
    const legend = holder.createDiv({ cls: "dw-cal-legend" });
    [["violet", "Jalon (J1, J2)"], ["red", "Oral / en retard"], ["blue", "Réunion"], ["orange", "Échéance"]]
      .forEach(([t, l]) => { const s = legend.createSpan(); s.createSpan({ cls: "dw-dot is-" + t }); s.appendText(" " + l); });
    const p = panel(holder, cap(picked.clone().locale("fr").format("dddd D MMMM")), "is-violet");
    const list = ev.filter((e) => e.m.isSame(picked, "day"));
    if (!list.length) empty(p, "Rien ce jour-là. Touche un autre jour du calendrier.");
    else md(p, list.map((e) => "- " + e.text).join("\n"), "dw-list");
    const up = panel(holder, "À venir (14 jours)", "is-orange");
    const soon = ev.filter((e) => e.m.isSameOrAfter(today, "day") && e.m.isBefore(today.clone().add(15, "days")));
    if (!soon.length) empty(up, "Rien de prévu. Pensez à renseigner les dates J1, J2, J3 dans la vue d'ensemble du bloc.");
    else md(up, soon.map((e) => `- **${e.m.clone().locale("fr").format("ddd DD/MM")}** · ${e.text}`).join("\n"), "dw-list");
  };
  draw();
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const VIEWS = { accueil: viewAccueil, bloc: viewBloc, membre: viewMembre, equipe: viewEquipe, calendrier: viewCalendrier };
const fn = VIEWS[opts.view || "accueil"];
if (!fn) empty(root, "Vue inconnue : " + opts.view);
else {
  try { fn(); }
  catch (e) { console.error(e); empty(root, "Erreur dans la vue « " + opts.view + " » : " + e.message); }
}
