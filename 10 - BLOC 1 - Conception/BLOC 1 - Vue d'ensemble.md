---
type: bloc
bloc: 1
titre: BLOC 1 · Conception
responsable: Oumar
j1:
j2:
j3:
rendu:
cssclasses:
  - dw-wide
---
# BLOC 1 · Conception

> [!abstract] Le projet en 4 lignes
> On joue une **entreprise prestataire** qui répond à un appel d'offres du **Ministère des Solidarités et de la Santé** : la plateforme **(RE)Sources Relationnelles** (web + mobile), qui propose aux citoyens des ressources pour améliorer leurs relations.
> Pour le BLOC 1, on ne code rien : on **analyse le besoin** (cahier des charges) et on **modélise** l'application (UML, base de données).
> On rend **un dossier de 15 à 20 pages** et on fait **une soutenance de 20 min** (≈ 10 slides) + 10 min de questions.
> Tout le détail : [[Le sujet en une page]].

> [!todo] À remplir au kick-off (Oumar)
> Les dates en haut de cette note (`j1`, `j2`, `j3`, `rendu`) au format `AAAA-MM-JJ`. Elles apparaissent alors dans le [[Calendrier]].

## Les étapes
| Quand | On fait quoi | On produit quoi |
| --- | --- | --- |
| **Avant J1** | Kick-off (45 min en visio) : on lit le sujet, on valide la répartition, le nom du prestataire | [[Kick-off BLOC 1]] |
| **J1** | Analyse du contexte et de la demande | Sections 1 à 8 : **cahier des charges** |
| **J2** | Modélisation de l'architecture et de la base de données | Sections 9 à 14 : **UML, MCD**, puis assemblage et slides |
| **J3 matin** | Soutenance orale (20 min + 10 min de questions) | [[Soutenance BLOC 1]] |
| **J3 après-midi** | Retour d'expérience avec la promo | Une note dans `02 - Réunions` |

Qui fait quoi et ce qu'on fait ensemble : **[[Répartition et plan de travail]]**.

## Avancement
```dataviewjs
await dv.view("90 - Outils/Scripts/equipe", { view: "bloc" })
```

## Ce qu'on rend
- 📄 **Le dossier** : [[00 - Dossier BLOC 1 (assemblage)]] (se remplit tout seul à partir des sections)
- 🎤 **La soutenance** : [[Soutenance BLOC 1]] (se remplit toute seule à partir des parties « À l'oral »)

## Checklist avant de rendre
> [!check] Il n'y a pas de grille d'évaluation pour ce bloc : cette liste reprend **tout ce que demande le sujet**. Oumar coche (il est le seul à modifier cette note).

**Contenu exigé**
- [ ] Reformulation du besoin, du contexte et des contraintes (cahier des charges)
- [ ] Diagramme(s) de **cas d'utilisation** UML
- [ ] **Analyse de la valeur** : bête à cornes **et** pieuvre
- [ ] **Diagramme de classes** UML
- [ ] **MCD Merise** (+ MLD)
- [ ] Architecture logicielle **MVC** expliquée
- [ ] RGPD, RGAA, sécurité, navigateurs, mobile first abordés
- [ ] Budget ≤ 90 000 € et planning sur 12 mois
- [ ] Identité du prestataire et personas (conseillés par le sujet)

**Forme**
- [ ] Dossier entre **15 et 20 pages**, page de garde, sommaire, pages lisibles
- [ ] Mêmes noms partout (acteurs, entités) entre cas d'utilisation, classes et MCD
- [ ] Schémas lisibles une fois exportés en PDF
- [ ] Relecture croisée faite sur toutes les sections (statut « fait »)

**Soutenance**
- [ ] ≈ 10 slides, 20 min chrono, chacun présente ses parties
- [ ] Au moins une répétition chronométrée
- [ ] 5 questions probables préparées avec leur réponse
