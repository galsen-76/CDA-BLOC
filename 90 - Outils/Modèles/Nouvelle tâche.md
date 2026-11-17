<%*
const MEMBRES = ["Camille", "Oumar", "Alescis"];
const safe = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 80);
const blocs = app.vault.getAllLoadedFiles().filter((f) => f.children && /^\d+ - BLOC/i.test(f.name)).map((f) => f.path).sort();
const bloc = blocs.length === 1 ? blocs[0] : await tp.system.suggester(blocs, blocs, false, "Quel bloc ?");
if (!bloc) return;
const titre = safe((await tp.system.prompt("Titre de la tâche")) || "Nouvelle tâche");
const resp = await tp.system.suggester(MEMBRES, MEMBRES, false, "Responsable");
const jour = await tp.system.suggester(["J1", "J2", "J3", "Avant J1", "—"], ["J1", "J2", "J3", "Avant J1", ""], false, "Quel jour ?");
const due = ((await tp.system.prompt("Échéance (AAAA-MM-JJ, vide si aucune)", "")) || "").trim();
const num = (bloc.match(/BLOC\s*(\d+)/i) || [])[1] || "";
const folder = `${bloc}/Tâches`;
if (!app.vault.getAbstractFileByPath(folder)) await app.vault.createFolder(folder);
await tp.file.move(`${folder}/${titre}`);
-%>
---
type: tache
bloc: <% num %>
statut: à faire
responsable: <% resp || "" %>
relecteur:
jour: <% jour || "" %>
echeance: <% /^\d{4}-\d{2}-\d{2}$/.test(due) ? due : "" %>
---
# <% titre %>

- [ ] 
