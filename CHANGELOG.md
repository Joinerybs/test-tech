# Changelog du test technique

Toutes les modifications majeures apportées au projet sont répertoriées ci-dessous.

### Ajouts :
- **Persistance MongoDB** : Intégration de Mongoose pour remplacer le stockage en mémoire
- **Validation Robuste** : Mise en place de class-validator et class-transformer sur tous les points d'entrée (DTO)
- **Gestion des Stats** : Nouvel endpoint /tasks/statistics fournissant le décompte par statut et priorité
- **Tris et Filtres** : Ajout d'un tri par date de création décroissante et filtre par statut sur la récupération globale

### Sécurité & Validation
- **Pipes Globaux** : Activation du ValidationPipe avec whitelist: true pour empêcher l'injection de champs non autorisés
- **Enums métier** : Contrainte sur les valeurs de status (todo, in-progress, done) et priorité (low, medium, high)
- **Sanitisation** : Transformation automatique des identifiants MongoDB (_id) en id pour la cohérence du Frontend

### Documentation
- **JSDoc** : Documentation complète de toutes les méthodes du Service et du Controller
- **Typage** : Renforcement du typage TypeScript pour une meilleure auto-complétion et maintenance.