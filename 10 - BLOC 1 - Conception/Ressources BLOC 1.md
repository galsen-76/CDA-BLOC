---
type: reference
bloc: 1
---
# Ressources BLOC 1

Seulement ce qui sert pour **ce** dossier. Chaque ressource indique la section concernée.

## Outils (gratuits)
| Outil | Pour quoi | Lien |
| --- | --- | --- |
| **draw.io** (diagrams.net) | Bête à cornes, pieuvre, cas d'utilisation, architecture. Existe aussi en application de bureau | https://app.diagrams.net |
| **Looping** | MCD Merise (notation française) et génération du MLD / SQL. Windows | https://www.looping-mcd.fr |
| **Mocodo** | MCD Merise en ligne, à partir d'un texte | https://www.mocodo.net |
| **Mermaid** | Diagrammes de classes et de séquence écrits **dans la note** (rien à installer, rendu dans Obsidian) | https://mermaid.js.org/syntax/classDiagram.html |
| **PlantUML** | Cas d'utilisation en texte | https://plantuml.com/fr/use-case-diagram |
| **GanttProject** | Planning de Gantt | https://www.ganttproject.biz |
| **Canva / Figma** | Logo du prestataire, personas | https://www.canva.com · https://www.figma.com |

## Analyse du besoin (J1)
### Cahier des charges et reformulation · sections 2, 3
- Méthode simple : pour chaque besoin du sujet, se demander **qui** en a besoin, **pourquoi**, et **comment on saura que c'est réussi**.
- Wikipédia, « Cahier des charges » : https://fr.wikipedia.org/wiki/Cahier_des_charges
- Pyramide de Maslow (citée par le sujet) : https://fr.wikipedia.org/wiki/Pyramide_des_besoins

### Personas · section 4
- Un persona = prénom, âge, situation, objectif, frein, une citation. 2 ou 3 suffisent, **très différents** (âge, aisance numérique).
- Wikipédia, « Persona (marketing) » : https://fr.wikipedia.org/wiki/Persona_(marketing)

### Analyse de la valeur · section 5
- **Bête à cornes** : 3 questions → À qui le produit rend-il service ? Sur quoi agit-il ? Dans quel but ?
- **Pieuvre** : le produit au centre, les éléments extérieurs autour. **FP** (fonction principale) = relie 2 éléments extérieurs **à travers** le produit ; **FC** (fonction contrainte) = relie le produit à 1 élément.
- Chercher « bête à cornes » et « diagramme pieuvre » sur Wikipédia ou sur YouTube (vidéos de 5 min).

### Priorisation · section 6
- Méthode MoSCoW (Must / Should / Could / Won't) : https://fr.wikipedia.org/wiki/M%C3%A9thode_MoSCoW

### Normes · section 7
- **RGPD**, guide du développeur de la CNIL (court et concret) : https://www.cnil.fr/fr/guide-rgpd-du-developpeur
- **RGAA** (accessibilité, site officiel) : https://accessibilite.numerique.gouv.fr
- **OWASP Top 10** (les 10 risques de sécurité web) : https://owasp.org/www-project-top-ten/

## Modélisation (J2)
### UML · sections 9, 10, 12
- Cours OpenClassrooms « Débutez l'analyse logicielle avec UML » : https://openclassrooms.com/fr/courses/2035826-debutez-lanalyse-logicielle-avec-uml
- Cas d'utilisation : https://fr.wikipedia.org/wiki/Diagramme_des_cas_d%27utilisation
- Classes en Mermaid : https://mermaid.js.org/syntax/classDiagram.html
- Séquences en Mermaid : https://mermaid.js.org/syntax/sequenceDiagram.html

> [!tip] Les 3 erreurs classiques en UML
> 1. Mettre des **actions de l'interface** (« cliquer sur valider ») comme cas d'utilisation : un cas = un **objectif** de l'acteur.
> 2. Oublier l'**héritage entre acteurs** (Citoyen connecté hérite de Citoyen).
> 3. Un diagramme de classes **sans multiplicités**.

### Merise · section 13
- Merise sur Wikipédia : https://fr.wikipedia.org/wiki/Merise_(informatique)
- Cours OpenClassrooms « Modélisez vos bases de données » (chercher le titre sur OpenClassrooms)
- Règle de passage MCD → MLD : une association **1,n – 1,n** devient une **table** ; une **0,1/1,1 – x,n** devient une **clé étrangère**.

### Architecture et MVC · section 11
- Modèle-Vue-Contrôleur : https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur
- Design patterns expliqués simplement : https://refactoring.guru/fr/design-patterns

## Soutenance
- **1 idée par slide**, un schéma plutôt qu'un paragraphe, 20 min = environ 2 min par slide.
- Chacun présente ses sections, on se passe la parole proprement.
- Préparer les questions : voir [[Répéter la soutenance]].

## Obsidian et Git
- Exporter en PDF : https://help.obsidian.md/export-pdf
- Présenter avec les Diapositives d'Obsidian : https://help.obsidian.md/plugins/slides
- Obsidian Git : https://github.com/Vinzent03/obsidian-git
