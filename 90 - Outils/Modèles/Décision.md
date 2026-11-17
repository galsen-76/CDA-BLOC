<%*
const safe = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 80);
let qui = null;
try { qui = localStorage.getItem("bloc-qui"); } catch (e) {}
const titre = safe((await tp.system.prompt("La décision en quelques mots")) || "Décision");
const day = tp.date.now("YYYY-MM-DD");
await tp.file.move("03 - Décisions/" + day + " " + titre);
-%>
---
type: decision
date: <% day %>
statut: proposée
proposee_par: <% qui || "" %>
---
# <% titre %>

> [!decision] Décision
> 

## Pourquoi
- 

## Options écartées
- 

%% Statut : proposée → validée (par les 3) → remplacée (si une nouvelle décision la remplace). %%
