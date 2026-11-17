<%*
const MEMBRES = ["Camille", "Oumar", "Alescis"];
const safe = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 80);
const blocs = app.vault.getAllLoadedFiles().filter((f) => f.children && /^\d+ - BLOC/i.test(f.name)).map((f) => f.path).sort();
const bloc = await tp.system.suggester(blocs, blocs, false, "Quel bloc ?");
if (!bloc) return;
const n = ((await tp.system.prompt("Numéro de la section (ex. 3)")) || "").trim();
const titre = safe((await tp.system.prompt("Titre de la section")) || "Nouvelle section");
const resp = await tp.system.suggester(MEMBRES, MEMBRES, false, "Qui l'écrit ?");
const rel = await tp.system.suggester(MEMBRES.filter((m) => m !== resp), MEMBRES.filter((m) => m !== resp), false, "Qui la relit ?");
const jour = await tp.system.suggester(["J1", "J2", "J3"], ["J1", "J2", "J3"], false, "Quel jour ?");
const num = (bloc.match(/BLOC\s*(\d+)/i) || [])[1] || "";
const folder = `${bloc}/Dossier`;
if (!app.vault.getAbstractFileByPath(folder)) await app.vault.createFolder(folder);
const nn = n.padStart(2, "0");
await tp.file.move(`${folder}/${nn} - ${titre}`);
-%>
---
type: section
bloc: <% num %>
ordre: <% Number(n) || 99 %>
statut: à faire
responsable: <% resp || "" %>
relecteur: <% rel || "" %>
jour: <% jour || "" %>
pages: 1
tags:
  - dossier
---
> [!consigne]- Ce qu'on attend ici
> - 
> - Penser à ajouter `![[<% nn %> - <% titre %>#<% Number(n) %>. <% titre %>]]` dans la note d'assemblage du dossier, et `![[<% nn %> - <% titre %>#À l'oral]]` dans la soutenance.

## <% Number(n) %>. <% titre %>

%% Le texte du dossier va ici. Sous-titres en ###. %%

## À l'oral
%% 3 à 5 puces pour la slide. %%
- 

## Remarques de relecture
%% Zone du relecteur uniquement. %%
