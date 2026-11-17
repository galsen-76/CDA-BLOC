---
type: section
bloc: 1
ordre: 10
partie: Modélisation
statut: à faire
responsable: Camille
relecteur: Alescis
jour: J2
pages: 1
tags:
  - dossier
---
> [!consigne]- Ce qu'on attend ici · objectif ≈ 1 page(s) · Camille écrit, Alescis relit
> Illustrer le fonctionnement sur **1 ou 2 scénarios clés** avec des diagrammes de séquence (ou d'activité).
> - Scénario conseillé : un citoyen crée une ressource, un modérateur la valide, elle devient publique.
> - Montrer les couches MVC (Vue, Contrôleur, Modèle, BDD) pour faire le lien avec [[11 - Architecture logicielle]].
> - Le diagramme peut s'écrire directement ici en **Mermaid** (texte, donc zéro conflit Git et rendu dans Obsidian et le PDF). Exemple pré-rempli ci-dessous.
> - Ressources utiles : [[Ressources BLOC 1]]

## 10. Scénarios et séquences

### Créer et publier une ressource
```mermaid
sequenceDiagram
    actor C as Citoyen connecté
    participant V as Vue
    participant Ctl as Contrôleur Ressource
    participant Mod as Modèle Ressource
    participant DB as Base de données
    actor M as Modérateur
    C->>V: Remplit le formulaire
    V->>Ctl: creer(ressource)
    Ctl->>Mod: valider les données
    Mod->>DB: INSERT (statut = en attente)
    DB-->>Mod: ok
    Ctl-->>V: « Ressource envoyée en validation »
    M->>V: Ouvre les ressources à valider
    V->>Ctl: valider(id)
    Ctl->>Mod: publier(id)
    Mod->>DB: UPDATE statut = publiée
```
%% À adapter : ajouter les cas d'erreur (alt), les notifications, etc. %%

## À l'oral
%% Ce qui ira sur la slide : 3 à 5 puces, des mots-clés, un schéma. Repris tel quel dans [[Soutenance BLOC 1]]. %%
- Le parcours « créer → valider → publier »

## Remarques de relecture
%% Zone de Alescis : écrire seulement ici. Camille corrige au-dessus puis passe le statut à « fait ». %%
