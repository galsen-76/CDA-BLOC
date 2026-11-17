---
type: section
bloc: 1
ordre: 13
partie: Modélisation
statut: à faire
responsable: Oumar
relecteur: Camille
jour: J2
pages: 1.5
tags:
  - dossier
---
> [!consigne]- Ce qu'on attend ici · objectif ≈ 1,5 page(s) · Oumar écrit, Camille relit
> Le sujet demande un **modèle conceptuel de données Merise** (MCD), puis on en déduit le **MLD** (tables, clés).
> - Faire le MCD dans **Looping** (gratuit, notation Merise française) : entités, associations, **cardinalités**. Exporter en PNG dans `Diagrammes/`.
> - En déduire le MLD : une ligne par table avec clés primaires (soulignées) et étrangères (#).
> - Un **dictionnaire de données** court pour les entités principales.
> - Penser RGPD : quelles données sont personnelles ? lesquelles chiffrer ?
> - Ressources utiles : [[Ressources BLOC 1]]

## 13. Base de données (MCD et MLD)

### MCD
%% ![[mcd.png]] %%

### MLD
%% Exemple : RESSOURCE (**id_ressource**, titre, contenu, visibilite, statut, date_creation, #id_categorie, #id_type_ressource, #id_auteur) %%


### Dictionnaire de données
| Donnée | Type | Taille | Contrainte | Donnée perso. ? |
| --- | --- | --- | --- | --- |
| email | texte | 255 | unique, obligatoire | oui |

## À l'oral
%% Ce qui ira sur la slide : 3 à 5 puces, des mots-clés, un schéma. Repris tel quel dans [[Soutenance BLOC 1]]. %%
- Le MCD
- 2 ou 3 règles de gestion importantes

## Remarques de relecture
%% Zone de Camille : écrire seulement ici. Oumar corrige au-dessus puis passe le statut à « fait ». %%
