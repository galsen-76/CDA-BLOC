# Réunions

Nouvelle réunion : **Ctrl+P → « Templater: Create new note from template » → Réunion**. Celui qui anime la crée et la remplit.

```dataview
TABLE WITHOUT ID file.link AS "Réunion", date AS "Date", anime_par AS "Animée par"
FROM "02 - Réunions"
WHERE type = "reunion"
SORT date DESC
```
