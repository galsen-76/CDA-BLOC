<%*
const safe = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 80);
let qui = null;
try { qui = localStorage.getItem("bloc-qui"); } catch (e) {}
const titre = safe((await tp.system.prompt("Sujet de la réunion", "Point d'équipe")) || "Point d'équipe");
const whenIn = ((await tp.system.prompt("Date et heure (AAAA-MM-JJ HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"))) || "").trim();
const when = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(whenIn) ? whenIn : tp.date.now("YYYY-MM-DD HH:mm");
await tp.file.move("02 - Réunions/" + when.slice(0, 10) + " " + titre);
-%>
---
type: reunion
date: <% when.replace(" ", "T") %>
anime_par: <% qui || "" %>
---
# <% titre %>

**Objectif :** 

## Chacun en une phrase
- **Camille** : 
- **Oumar** : 
- **Alescis** : 

## Décisions
%% Une décision importante → créer aussi une note avec le modèle « Décision ». %%
- 

## Actions
- [ ] 
