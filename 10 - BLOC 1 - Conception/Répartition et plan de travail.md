---
type: plan
bloc: 1
responsable: Oumar
---
# Répartition et plan de travail · BLOC 1

> [!tip] La règle d'or
> On met le gros de l'énergie sur **ce qui pèse le plus dans la note** et on fait le reste **correctement, sans plus**. Une section correcte et finie vaut mieux qu'une section parfaite pas finie.

## Où mettre l'effort
| Priorité | Sections | Pourquoi | Temps à y passer |
| --- | --- | --- | --- |
| 🔴 **Cœur** | [[03 - Reformulation du besoin et périmètre\|3. Reformulation]], [[09 - Cas d'utilisation\|9. Cas d'utilisation]], [[12 - Diagramme de classes\|12. Classes]], [[13 - Base de données (MCD et MLD)\|13. MCD]] | C'est ce que le sujet demande explicitement de « constater » et de « modéliser » : le jury regarde d'abord ça | Le maximum, avec relecture attentive |
| 🟠 **Important** | 4. Acteurs, 5. Analyse de la valeur, 6. Fonctionnalités, 11. Architecture, la soutenance | Exigé par le sujet, et ça montre qu'on a compris | Bien fait, sans en rajouter |
| 🟢 **Suffisant** | 1. Prestataire, 2. Contexte, 7. Contraintes, 8. Budget, 10. Séquences, 14. Conclusion | Attendu, mais vite fait bien fait | Limiter le temps : 1 h max par section |

**Pièges qui coûtent le plus de points** : des noms différents d'un diagramme à l'autre, recopier le sujet au lieu de le reformuler, des schémas illisibles dans le PDF, un oral pas chronométré.

## Qui fait quoi
Chacun a **un fil logique** : ses sections s'enchaînent, il n'attend presque personne.

| | Camille | Oumar | Alescis |
| --- | --- | --- | --- |
| **Fil** | L'utilisateur et le modèle objet | Le besoin et les données | Le fonctionnel et la technique |
| **J1** | 1. Prestataire et équipe · 4. Acteurs et personas · 5. Analyse de la valeur | 2. Contexte · 3. Reformulation · 8. Budget et planning | 6. Fonctionnalités et priorités · 7. Contraintes et normes |
| **J2** | 10. Séquences · 12. Diagramme de classes | 13. MCD et MLD · 14. Conclusion · assemblage du dossier | 9. Cas d'utilisation · 11. Architecture · slides |
| **Relit** | les sections d'Alescis | les sections de Camille | les sections d'Oumar |
| **Rôle CCTP** (à confirmer) | Cellule de support / UX | Chef de projet | Agent technique / architecte |

Les dépendances entre nous, à connaître :
- Les **acteurs** de Camille (4) sont repris tels quels dans les **cas d'utilisation** d'Alescis (9) → Camille les fixe dès le matin de J1.
- Les **fonctionnalités** d'Alescis (6) alimentent les **classes** (12) et le **MCD** (13).
- Les **classes** (Camille) et le **MCD** (Oumar) doivent avoir les mêmes entités → atelier commun au début de J2.

## Ce qu'on fait ensemble (et seulement ça)
Le reste du temps, chacun avance seul dans ses fichiers. Ces moments-là sont courts mais **non négociables** :

| Moment | Durée | Qui | Ce qu'on en sort |
| --- | --- | --- | --- |
| **Kick-off** (avant J1) | 45 min | Tous | Sujet compris, répartition validée, nom du prestataire, dates dans la vue d'ensemble → [[Kick-off BLOC 1]] |
| **Point du matin** (J1, J2) | 10 min | Tous | Chacun dit : ce que je fais aujourd'hui, ce qui me bloque |
| **Atelier modèle de données** (début J2) | 1 h | Tous (Camille + Oumar surtout) | La liste des entités, attributs et cardinalités, notée dans une **décision**. Classes et MCD en découlent sans contradiction |
| **Relecture croisée** (fin J1, fin J2) | 30 min | Chacun relit ses sections attribuées | Remarques dans « Remarques de relecture » |
| **Point du soir** (J1, J2) | 10 min | Tous | Statuts à jour, problèmes levés |
| **Répétition** (fin J2) | 2 × 30 min | Tous | Oral chronométré, 5 questions probables préparées |

## Une journée type
1. **Ouvrir Obsidian** → Obsidian Git récupère le travail des autres.
2. **Point du matin** (10 min).
3. Ouvrir **son espace** (`01 - Membres/<prénom>`) : on voit ses sections et ce qu'on doit relire.
4. Écrire dans ses sections, passer le **statut** à « en cours », puis « à relire » quand c'est prêt.
5. Noter ce qu'on a fait dans **son journal** (Ctrl+P → *Templater : Mon journal du jour*).
6. **Point du soir**, statuts à jour.
