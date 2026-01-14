# Instructions - Test Technique (Windows)

**Durée estimée : 4 heures**

L'objectif de ce test est d'évaluer votre capacité à améliorer une application existante en identifiant et en résolvant des problématiques réelles de développement.

## Contexte

Vous disposez d'une application de gestion de tâches (Task Manager) avec :
- Un backend NestJS
- Un frontend React + TypeScript
- Une architecture monorepo avec pnpm

L'application fonctionne actuellement mais présente plusieurs problèmes de conception et d'implémentation.

## Prérequis

- Node.js (v18 ou supérieur)
- pnpm (`npm install -g pnpm`)
- Docker Desktop pour Windows ([Guide d'installation](DOCKER-INSTALL.md))
- Git for Windows (inclut Git Bash)

## Processus de travail

### 1. Fork et clonage du projet

1. **Forker le repository**
   - Rendez-vous sur le repository GitHub du projet
   - Cliquez sur le bouton "Fork" en haut à droite
   - Sélectionnez votre compte personnel comme destination

2. **Cloner votre fork**
   
   **PowerShell / CMD :**
   ```powershell
   git clone https://github.com/VOTRE-USERNAME/test-tech.git
   cd test-tech
   ```

3. **Installer les dépendances**
   ```powershell
   pnpm install
   ```

### 2. Créer une branche de travail

```powershell
# Créez une branche descriptive pour vos modifications
git checkout -b feature/mongodb-validation-error-handling
```

### 3. Développer vos solutions

- Travaillez sur les tâches décrites ci-dessous
- Faites des commits réguliers avec des messages clairs
- Testez votre code au fur et à mesure

```powershell
# Exemple de commits
git add .
git commit -m ":sparkles: feat: ajout du schéma Mongoose pour les tâches"
git commit -m ":sparkles: feat: implémentation de la validation des données"
git commit -m ":bug: fix: gestion des erreurs API dans le frontend"
```

### 4. Pousser vos modifications

```powershell
# Poussez votre branche vers votre fork
git push origin feature/mongodb-validation-error-handling
```

### 5. Ouvrir une Pull Request

1. Rendez-vous sur votre fork GitHub
2. Cliquez sur "Compare & pull request"
3. Assurez-vous que la PR pointe vers le repository original
4. Rédigez une description claire :
   - Résumé des modifications apportées
   - Solutions implémentées pour chaque tâche
   - Points techniques importants
   - Éventuelles difficultés rencontrées
5. Soumettez la Pull Request

**Note importante :** La Pull Request est votre livrable principal. Assurez-vous qu'elle soit bien documentée et que le code soit propre avant de la soumettre.

---

## Tâches à réaliser

### 1. Migration vers une base de données MongoDB (2-3h)

**Problème actuel :** Les données sont stockées en mémoire et sont perdues à chaque redémarrage du serveur.

**Objectif :** Migrer le système de stockage vers MongoDB en utilisant Mongoose.

**Configuration déjà en place :**
- ✅ Dépendances MongoDB installées (`@nestjs/mongoose`, `mongoose`)
- ✅ Configuration de base dans `app.module.ts`
- ✅ Variables d'environnement configurées dans `.env`
- ✅ Connexion MongoDB prête à l'emploi

**Ce que nous attendons :**
- Création d'un schéma Mongoose pour les tâches
- Intégration du schéma dans le module Tasks
- Migration de toute la logique métier pour utiliser MongoDB
- Les données doivent persister entre les redémarrages
- Gestion appropriée des erreurs de base de données

**Points d'attention :**
- Utiliser les décorateurs Mongoose (`@Schema`, `@Prop`)
- Gérer correctement les types MongoDB (ObjectId)
- Opérations asynchrones avec async/await
- Types TypeScript cohérents entre interface et schéma

---

### 2. Validation des données d'entrée (1h)

**Problème actuel :** Aucune validation robuste des données envoyées par le client.

**Objectif :** Implémenter un système de validation complet pour toutes les données entrantes.

**Ce que nous attendons :**
- Validation des champs obligatoires
- Validation des types et formats
- Validation des valeurs autorisées (enums)
- Messages d'erreur clairs et exploitables
- Protection contre les données malformées

**Points d'attention :**
- Utilisation des bonnes pratiques NestJS
- Validation au bon niveau de l'architecture
- Cohérence des messages d'erreur

---

### 3. Gestion des erreurs API (1h)

**Problème actuel :** Les erreurs réseau et serveur ne sont pas gérées correctement dans le frontend.

**Objectif :** Créer un système centralisé de gestion des erreurs API.

**Ce que nous attendons :**
- Interception et traitement des erreurs HTTP
- Affichage de messages d'erreur compréhensibles pour l'utilisateur
- Gestion des différents codes d'erreur (400, 404, 500, etc.)
- Expérience utilisateur améliorée en cas d'échec

**Points d'attention :**
- Architecture propre et réutilisable
- Séparation des préoccupations
- UX : l'utilisateur doit comprendre ce qui s'est passé

---

## Critères d'évaluation

1. **Qualité du code** (30%)
   - Lisibilité et organisation
   - Respect des conventions
   - Commentaires pertinents

2. **Architecture** (30%)
   - Choix techniques appropriés
   - Séparation des responsabilités
   - Scalabilité de la solution

3. **Fonctionnalité** (25%)
   - L'application fonctionne correctement
   - Tous les cas d'usage sont couverts
   - Gestion des cas limites

4. **Compréhension** (15%)
   - Identification des problèmes
   - Choix des solutions
   - Capacité à naviguer dans le code existant

## Livrables

- Code source modifié avec vos améliorations
- Un fichier `CHANGELOG.md` décrivant brièvement vos modifications
- Instructions pour lancer l'application (si différentes de l'existant)
- (Optionnel) Un fichier expliquant vos choix techniques

## Notes

- Vous pouvez installer les dépendances nécessaires
- **MongoDB démarre automatiquement** avec la commande `pnpm dev`
- Si l'auto-démarrage échoue, démarrez MongoDB manuellement (voir commandes ci-dessous)
- N'hésitez pas à refactoriser le code existant si besoin
- La qualité est plus importante que la quantité
- En cas de blocage, documentez votre approche et les difficultés rencontrées

## Commandes utiles

**PowerShell :**
```powershell
# Installer les dépendances
pnpm install

# Lancer l'application (démarre automatiquement MongoDB avec Docker)
pnpm dev

# Gestion manuelle de MongoDB (si nécessaire) :
docker compose up -d      # Démarrer MongoDB
docker compose ps         # Vérifier le statut
docker compose down       # Arrêter MongoDB

# Backend seul
pnpm --filter backend dev

# Frontend seul
pnpm --filter frontend dev
```

**CMD :**
```cmd
REM Installer les dépendances
pnpm install

REM Lancer l'application
pnpm dev

REM Gestion manuelle de MongoDB
docker compose up -d
docker compose ps
docker compose down
```

**Git Bash (alternative pour les scripts bash) :**
```bash
# Si MongoDB ne démarre pas automatiquement avec pnpm dev
bash scripts/start-mongodb.sh

# Variable d'environnement si nécessaire
export DOCKER_HOST=unix:///var/run/docker.sock
```

## Dépannage Windows

### Docker Desktop n'est pas démarré
1. Ouvrez Docker Desktop depuis le menu Démarrer
2. Attendez que Docker soit complètement démarré (icône verte)
3. Relancez `pnpm dev`

### Permission refusée avec Docker
- Assurez-vous que votre utilisateur est dans le groupe `docker-users`
- Redémarrez votre session Windows si vous venez d'installer Docker

### Port déjà utilisé

**PowerShell :**
```powershell
# Vérifier les ports utilisés
netstat -ano | findstr :3000  # Frontend
netstat -ano | findstr :3001  # Backend
netstat -ano | findstr :27017 # MongoDB

# Tuer un processus si nécessaire
taskkill /PID <PID> /F
```

**CMD :**
```cmd
REM Vérifier les ports utilisés
netstat -ano | findstr :3000

REM Tuer un processus
taskkill /PID <PID> /F
```

### WSL2 requis pour Docker
Si Docker vous demande d'activer WSL2 :
1. Ouvrez PowerShell en tant qu'administrateur
2. Exécutez : `wsl --install`
3. Redémarrez votre ordinateur
4. Relancez Docker Desktop

### Scripts bash ne fonctionnent pas
- Option 1 : Utilisez Git Bash (inclus avec Git for Windows)
- Option 2 : Utilisez directement `docker compose up -d` au lieu du script bash
- Option 3 : Installez WSL2 et utilisez un terminal Linux

---

**Bonne chance ! 🚀**
