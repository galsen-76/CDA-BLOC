<%*
const MEMBRES = ["Camille", "Oumar", "Alescis"];
let qui = null;
try { qui = localStorage.getItem("bloc-qui"); } catch (e) {}
if (!MEMBRES.includes(qui)) {
  qui = await tp.system.suggester(MEMBRES, MEMBRES, false, "Qui es-tu ? (retenu sur cet ordinateur)");
  if (!qui) throw new Error("Annulé");
  try { localStorage.setItem("bloc-qui", qui); } catch (e) {}
}
const day = tp.date.now("YYYY-MM-DD");
const folder = `01 - Membres/${qui}/Journal`;
const target = `${folder}/${day}.md`;
const existing = app.vault.getAbstractFileByPath(target);
if (existing) {
  await app.workspace.getLeaf(false).openFile(existing);
  await app.vault.trash(tp.config.target_file, true);
  throw new Error("Ton journal du jour existe déjà : il est ouvert.");
}
if (!app.vault.getAbstractFileByPath(folder)) await app.vault.createFolder(folder);
await tp.file.move(`${folder}/${day}`);
const label = window.moment().locale("fr").format("dddd D MMMM YYYY");
-%>
---
type: journal
qui: <% qui %>
date: <% day %>
---
# <% label.charAt(0).toUpperCase() + label.slice(1) %>

## Aujourd'hui je fais
- [ ] 

## Ce que j'ai fait
- 

## Ce qui me bloque / questions pour l'équipe
- 
