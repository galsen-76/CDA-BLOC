<%*
/* Crée le dossier complet d'un nouveau bloc, sur le même modèle que le BLOC 1. */
const safe = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 60);
const n = ((await tp.system.prompt("Numéro du bloc (ex. 2)")) || "").trim();
if (!/^\d+$/.test(n)) return;
const nom = safe((await tp.system.prompt("Nom du bloc (ex. Développement)")) || "Nouveau bloc");
const root = `${Number(n) * 10} - BLOC ${n} - ${nom}`;
if (app.vault.getAbstractFileByPath(root)) { new Notice("Ce bloc existe déjà"); return; }
for (const sub of ["", "/Sujet", "/Dossier", "/Soutenance", "/Tâches", "/Diagrammes", "/Rendu"]) await app.vault.createFolder(root + sub);
const files = {
  [`Dossier/00 - Dossier BLOC ${n} (assemblage).md`]:
`---
type: assemblage
bloc: ${n}
cssclasses:
  - dossier
---
# BLOC ${n} · ${nom}

%% Ajouter ici une ligne par section : ![[01 - Titre#1. Titre]] %%
`,
  [`Soutenance/Soutenance BLOC ${n}.md`]:
`# BLOC ${n} · ${nom}

---

# Slide 2

%% ![[01 - Titre#À l'oral]] %%
`,
  [`Sujet/Le sujet en une page (BLOC ${n}).md`]:
`---
type: reference
bloc: ${n}
---
# Le sujet en une page · BLOC ${n}

## En une phrase

## Ce qu'on rend

## Les contraintes
`,
  [`Ressources BLOC ${n}.md`]: `---\ntype: reference\nbloc: ${n}\n---\n# Ressources BLOC ${n}\n`,
};
for (const [p, c] of Object.entries(files)) await app.vault.create(`${root}/${p}`, c);
await tp.file.move(`${root}/BLOC ${n} - Vue d'ensemble`);
new Notice(`BLOC ${n} créé. Ajoute les sections avec le modèle « Nouvelle section ».`);
-%>
---
type: bloc
bloc: <% n %>
titre: BLOC <% n %> · <% nom %>
j1:
j2:
j3:
rendu:
cssclasses:
  - dw-wide
---
# BLOC <% n %> · <% nom %>

> [!abstract] Le projet en 4 lignes
> 

## Les étapes
| Quand | On fait quoi | On produit quoi |
| --- | --- | --- |
| J1 |  |  |
| J2 |  |  |
| J3 |  |  |

## Avancement
```dataviewjs
await dv.view("90 - Outils/Scripts/equipe", { view: "bloc" })
```

## Ce qu'on rend
- 📄 [[00 - Dossier BLOC <% n %> (assemblage)]]
- 🎤 [[Soutenance BLOC <% n %>]]

## Checklist avant de rendre
- [ ] 
