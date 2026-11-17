# Décisions

Une décision = un fichier (Ctrl+P → *Templater : Create new note from template* → **Décision**). Une fois validée par l'équipe, elle ne bouge plus : si on change d'avis, on crée une nouvelle décision qui remplace l'ancienne.

```dataview
TABLE WITHOUT ID file.link AS "Décision", date AS "Date", statut AS "Statut", proposee_par AS "Proposée par"
FROM "03 - Décisions"
WHERE type = "decision"
SORT date DESC
```
