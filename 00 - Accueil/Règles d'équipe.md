# Règles d'équipe

> [!abstract] En résumé
> 1. **Chacun écrit dans ses fichiers.** Jamais dans ceux des autres.
> 2. **On récupère avant de travailler, on envoie après.** (Obsidian Git le fait tout seul.)
> 3. **Le relecteur écrit seulement dans « Remarques de relecture ».**
> 4. **On ne renomme pas et on ne déplace pas** les fichiers des autres.

## Qui écrit où
| Fichier | Qui peut écrire |
| --- | --- |
| `01 - Membres/<prénom>/…` (fiche, journal, brouillons) | La personne seulement |
| Une **section du dossier** | Son `responsable` (le relecteur : uniquement sous « Remarques de relecture ») |
| Une **tâche** | Son `responsable` |
| Une **réunion** | Celui qui l'a créée (les autres notent leurs idées dans leur journal) |
| Une **décision** | Celui qui l'a créée, une fois validée elle ne bouge plus |
| Vue d'ensemble du bloc, note d'assemblage du dossier, cette note | Oumar |
| Support de soutenance | Alescis |
| `.obsidian/` (réglages, thème) | Personne : on ne change pas les réglages partagés |

> [!info] Pourquoi c'est sans conflit
> Git sait fusionner deux modifications du **même fichier** si elles touchent des **endroits différents**. Il bloque seulement quand deux personnes changent **la même ligne**. Avec un propriétaire par fichier, ça n'arrive quasiment jamais.

## Les statuts
Dans les propriétés en haut de chaque section ou tâche, champ `statut` :

`à faire` → `en cours` → `à relire` → `fait`

- Quand c'est prêt, le responsable met **à relire** : la section apparaît chez le relecteur.
- Le relecteur laisse ses remarques, le responsable corrige et met **fait**.
- Les tableaux de bord se mettent à jour tout seuls.

## Routine Git (avec Obsidian Git)
Le plugin est réglé pour : **récupérer à l'ouverture**, puis **enregistrer et envoyer toutes les 10 minutes**. En pratique, il n'y a rien à faire. Pour forcer :
- **Ctrl+P → « Obsidian Git: Commit-and-sync »** avant de fermer Obsidian.
- **Ctrl+P → « Obsidian Git: Pull »** si on attend le travail de quelqu'un.

## Si un conflit arrive quand même
1. Pas de panique : rien n'est perdu.
2. Obsidian Git ouvre le fichier avec des marques `<<<<<<<`, `=======`, `>>>>>>>`.
3. Garder la bonne version, supprimer les marques, puis **Commit-and-sync**.
4. Si c'est dans un fichier qui n'est pas le sien : prévenir son propriétaire et le laisser faire.

## Créer une note
Toujours avec les modèles (**Ctrl+P → « Templater: Create new note from template »**) :
| Modèle | Crée |
| --- | --- |
| Mon journal du jour | Ton journal dans ton espace |
| Nouvelle tâche | Une tâche dans un bloc, avec responsable |
| Nouvelle section | Une section de dossier dans un bloc |
| Réunion | Un compte rendu dans `02 - Réunions` |
| Décision | Une décision dans `03 - Décisions` |
| Nouveau bloc | Le dossier complet d'un nouveau bloc (BLOC 2, BLOC 3…) |
