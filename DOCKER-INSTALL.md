# Installation de Docker

Ce guide vous aidera à installer Docker sur votre système si vous ne l'avez pas encore installé.

## Table des matières

- [Installation sur Windows](#installation-sur-windows)
- [Installation sur Linux](#installation-sur-linux)
- [Installation sur macOS](#installation-sur-macos)
- [Vérification de l'installation](#vérification-de-linstallation)

---

## Installation sur Windows

### Prérequis

- Windows 10 64-bit: Pro, Enterprise, ou Education (Build 19041 ou supérieur)
- OU Windows 11
- Virtualisation activée dans le BIOS
- Au moins 4 GB de RAM

### Étapes d'installation

#### 1. Activer WSL 2 (Windows Subsystem for Linux)

Ouvrez **PowerShell en tant qu'administrateur** et exécutez :

```powershell
# Activer WSL
wsl --install

# Redémarrez votre ordinateur après cette étape
```

Après le redémarrage, WSL 2 sera configuré avec Ubuntu par défaut.

#### 2. Télécharger Docker Desktop

1. Rendez-vous sur [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Cliquez sur "Download for Windows"
3. Exécutez le fichier `Docker Desktop Installer.exe`

#### 3. Installation de Docker Desktop

1. Double-cliquez sur l'installeur
2. Suivez les instructions à l'écran
3. Assurez-vous que l'option **"Use WSL 2 instead of Hyper-V"** est cochée
4. Cliquez sur "Ok" pour installer
5. Redémarrez votre ordinateur si demandé

#### 4. Démarrer Docker Desktop

1. Lancez Docker Desktop depuis le menu Démarrer
2. Acceptez les conditions d'utilisation
3. Vous pouvez créer un compte Docker Hub (optionnel) ou cliquer sur "Skip"
4. Attendez que Docker démarre complètement (l'icône Docker dans la barre des tâches devient verte)

#### 5. Configuration (optionnel mais recommandé)

Ouvrez Docker Desktop et allez dans **Settings** :

- **Resources > Advanced** : Allouez au moins 4 GB de RAM et 2 CPUs
- **General** : Cochez "Start Docker Desktop when you log in"

### Dépannage Windows

#### Erreur : "WSL 2 installation is incomplete"

```powershell
# Mettre à jour le kernel WSL 2
wsl --update
wsl --set-default-version 2
```

#### Erreur : "Hardware assisted virtualization and data execution protection must be enabled"

1. Redémarrez votre ordinateur
2. Entrez dans le BIOS (généralement F2, F10, ou Del au démarrage)
3. Cherchez "Virtualization Technology" ou "VT-x" ou "AMD-V"
4. Activez cette option
5. Sauvegardez et quittez le BIOS

#### Docker ne démarre pas

```powershell
# Redémarrer le service Docker
net stop com.docker.service
net start com.docker.service
```

---

## Installation sur Linux

### Ubuntu / Debian

#### 1. Mettre à jour le système

```bash
sudo apt update
sudo apt upgrade -y
```

#### 2. Installer les prérequis

```bash
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

#### 3. Ajouter la clé GPG officielle de Docker

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

#### 4. Ajouter le dépôt Docker

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 5. Installer Docker Engine

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 6. Ajouter votre utilisateur au groupe docker

```bash
sudo usermod -aG docker $USER

# Appliquer les changements (ou déconnectez-vous et reconnectez-vous)
newgrp docker
```

#### 7. Activer Docker au démarrage

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

### Fedora / CentOS / RHEL

#### 1. Installer les prérequis

```bash
sudo dnf -y install dnf-plugins-core
```

#### 2. Ajouter le dépôt Docker

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

#### 3. Installer Docker

```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 4. Démarrer Docker

```bash
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker
```

### Arch Linux

```bash
# Installer Docker
sudo pacman -S docker docker-compose

# Démarrer et activer Docker
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker
```

### Dépannage Linux

#### Permission refusée lors de l'utilisation de Docker

```bash
# Vérifier que vous êtes dans le groupe docker
groups

# Si 'docker' n'apparaît pas, ajoutez-vous au groupe
sudo usermod -aG docker $USER

# Déconnectez-vous et reconnectez-vous, ou utilisez :
newgrp docker
```

#### Docker ne démarre pas

```bash
# Vérifier le statut de Docker
sudo systemctl status docker

# Redémarrer Docker
sudo systemctl restart docker

# Voir les logs d'erreur
sudo journalctl -xu docker
```

---

## Installation sur macOS

### Prérequis

- macOS 11 ou supérieur
- Processeur Apple Silicon (M1/M2/M3) ou Intel 64-bit

### Étapes d'installation

#### 1. Télécharger Docker Desktop

1. Rendez-vous sur [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Téléchargez la version appropriée :
   - **Mac with Apple chip** (M1/M2/M3)
   - **Mac with Intel chip**

#### 2. Installation

1. Ouvrez le fichier `.dmg` téléchargé
2. Glissez l'icône Docker dans le dossier Applications
3. Lancez Docker depuis le dossier Applications
4. Accordez les permissions nécessaires
5. Attendez que Docker démarre

#### 3. Configuration

- Docker Desktop s'exécute dans la barre de menus (icône en haut à droite)
- Vous pouvez configurer les ressources dans **Preferences > Resources**

### Dépannage macOS

#### Docker est lent

1. Ouvrez Docker Desktop
2. Allez dans **Preferences > Resources**
3. Augmentez la RAM et les CPUs alloués

---

## Vérification de l'installation

Une fois Docker installé, vérifiez que tout fonctionne correctement :

### Test de base

```bash
# Vérifier la version de Docker
docker --version

# Vérifier la version de Docker Compose
docker compose version

# Tester Docker avec un conteneur hello-world
docker run hello-world
```

Si vous voyez un message de succès avec "Hello from Docker!", votre installation est réussie ! 🎉

### Test spécifique pour ce projet

```bash
# Cloner le projet et tester MongoDB
cd test-tech
pnpm install
pnpm dev
```

MongoDB devrait démarrer automatiquement dans Docker.

### Commandes Docker utiles

```bash
# Lister les conteneurs en cours d'exécution
docker ps

# Lister tous les conteneurs
docker ps -a

# Lister les images Docker
docker images

# Arrêter tous les conteneurs
docker stop $(docker ps -q)

# Nettoyer les conteneurs arrêtés
docker container prune -f

# Nettoyer les images non utilisées
docker image prune -a -f

# Voir l'utilisation des ressources
docker stats
```

---

## Ressources additionnelles

- [Documentation officielle Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Guide Docker Compose](https://docs.docker.com/compose/)
- [Tutoriels Docker](https://docs.docker.com/get-started/)

---

## Besoin d'aide ?

Si vous rencontrez des problèmes d'installation :

1. Vérifiez les logs d'erreur
2. Recherchez l'erreur spécifique sur [Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
3. Consultez les [issues GitHub de Docker](https://github.com/docker/for-win/issues) (Windows) ou [Docker for Mac](https://github.com/docker/for-mac/issues)
4. Documentez le problème dans votre livrable si vous ne pouvez pas le résoudre

**Bonne installation ! 🐳**
