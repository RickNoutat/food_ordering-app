# Fast Food — Application mobile de commande de nourriture

Application mobile full-stack de commande de nourriture, développée avec **React Native + Expo**, **Appwrite** comme backend et déployée via **Codemagic CI/CD**.

![Hero](./assets/readme/hero.png)

---

## Table des matières

1. [Présentation](#présentation)
2. [Fonctionnalités](#fonctionnalités)
3. [Stack technique](#stack-technique)
4. [Architecture du projet](#architecture-du-projet)
5. [Démarrage rapide](#démarrage-rapide)
6. [Variables d'environnement](#variables-denvironnement)
7. [Configuration Appwrite](#configuration-appwrite)
8. [CI/CD — Codemagic](#cicd--codemagic)

---

## Présentation

Fast Food est une application mobile iOS/Android permettant aux utilisateurs de parcourir un menu de restauration rapide, de rechercher et filtrer des plats par catégorie, de consulter les détails nutritionnels de chaque article (calories, protéines, note), et de gérer un panier d'achat avec personnalisations.

Le back-end repose entièrement sur **Appwrite** (authentification, base de données, stockage d'images), sans serveur dédié. La gestion d'état globale est assurée par **Zustand** et le monitoring des erreurs par **Sentry**.

---

## Fonctionnalités

- **Authentification** — Inscription et connexion par email/mot de passe via Appwrite Auth
- **Accueil personnalisé** — Salutation dynamique, bannières promotionnelles (Summer Combo, Burger Bash, Pizza Party, Burrito Delight) et section "Articles populaires"
- **Recherche & filtres** — Recherche par nom avec filtrage par catégorie (All, Burger, Pizza, Wrap, Burrito)
- **Détail d'un plat** — Image, prix, catégorie, note, calories, protéines et description complète
- **Panier intelligent** — Ajout avec personnalisations (toppings, accompagnements), ajustement des quantités, suppression d'articles et récapitulatif de paiement (sous-total, livraison, réduction, total)
- **État panier vide** — Redirection vers la recherche si le panier est vide
- **Profil utilisateur** — Informations du compte et déconnexion sécurisée
- **Navigation par onglets** — Home, Recherche, Panier, Profil avec tab bar flottante
- **Monitoring** — Sentry pour la capture des erreurs en production

---

## Stack technique

| Domaine | Technologie |
| --- | --- |
| Framework | React Native 0.81 + Expo SDK 54 |
| Navigation | Expo Router v6 (file-based routing) |
| Langage | TypeScript |
| Style | NativeWind v4 (Tailwind CSS pour React Native) |
| Backend / BaaS | Appwrite (Auth, Database, Storage) |
| État global | Zustand v5 |
| Monitoring | Sentry React Native |
| CI/CD | Codemagic + EAS Build |

---

## Architecture du projet

```text
├── app/
│   ├── _layout.tsx              # Root layout — chargement des polices, guard auth
│   ├── (auth)/
│   │   ├── sign-in.tsx          # Connexion
│   │   └── sign-up.tsx          # Inscription
│   ├── (tabs)/
│   │   ├── index.tsx            # Accueil — offres + articles populaires
│   │   ├── search.tsx           # Menu — recherche + filtres catégories
│   │   ├── cart.tsx             # Panier — articles + récapitulatif paiement
│   │   └── profile.tsx          # Profil utilisateur
│   └── menu/
│       └── [id].tsx             # Détail dynamique d'un article
│
├── components/                  # Composants UI réutilisables
│   ├── CartButton.tsx
│   ├── CartItem.tsx
│   ├── CustomButton.tsx
│   ├── CustomHeader.tsx
│   ├── CustomInput.tsx
│   ├── Filter.tsx
│   ├── MenuCard.tsx
│   └── SearchBar.tsx
│
├── store/
│   ├── auth.store.ts            # Store Zustand — session utilisateur
│   └── cart.store.ts            # Store Zustand — panier + calculs
│
├── lib/
│   ├── appwrite.ts              # Client Appwrite + requêtes (menu, auth, profil)
│   └── useAppwrite.ts           # Hook générique de fetch avec loading/error
│
├── constants/                   # Catégories, offres, exports assets
├── assets/                      # Polices Quicksand, icônes, images
├── codemagic.yaml               # Configuration CI/CD
└── eas.json                     # Profils de build EAS
```

---

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/) >= 10
- [Expo Go](https://expo.dev/go) sur iOS ou Android (pour tester sur appareil physique)
- Un projet [Appwrite](https://appwrite.io/) configuré

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-username/food-ordering-app.git
cd food-ordering-app
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Remplir les valeurs dans `.env` (voir la section [Variables d'environnement](#variables-denvironnement)).

### 4. Lancer l'application

```bash
npm start
```

| Raccourci | Action |
| --- | --- |
| `i` | Ouvrir sur simulateur iOS |
| `a` | Ouvrir sur émulateur Android |
| `w` | Ouvrir dans le navigateur |
| Scanner le QR | Ouvrir dans Expo Go sur appareil physique |

---

## Variables d'environnement

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_APPWRITE_ENDPOINT` | URL de l'instance Appwrite (ex: `https://cloud.appwrite.io/v1`) |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | ID du projet Appwrite |
| `EXPO_PUBLIC_APPWRITE_DATABASE_ID` | ID de la base de données |
| `EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID` | Collection des profils utilisateurs |
| `EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID` | Collection des catégories |
| `EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID` | Collection des articles du menu |
| `EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID` | Collection des personnalisations (toppings, sides) |
| `EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID` | Table de liaison menu ↔ personnalisations |

---

## Configuration Appwrite

1. Créer un projet sur [cloud.appwrite.io](https://cloud.appwrite.io)
2. Activer l'authentification **Email/Password**
3. Créer une base de données avec les collections suivantes :

   | Collection | Attributs principaux |
   | --- | --- |
   | `menu` | `name`, `type`, `price`, `rating`, `calories`, `protein`, `description`, `image_url` |
   | `customizations` | `name`, `price`, `image_url`, `type` (topping / side) |
   | `menu_customizations` | `menu_id`, `customization_id` |
   | `users` | `name`, `email`, `avatar_url` |

4. Configurer les permissions : lecture autorisée pour les utilisateurs authentifiés
5. Seed la base de données :

   ```bash
   node scripts/seed.mjs
   ```

---

## CI/CD — Codemagic

Le fichier `codemagic.yaml` configure 4 workflows automatisés :

| Workflow | Déclencheur | Action |
| --- | --- | --- |
| `pr-check` | Pull Request sur `main` / `develop` | Lint + vérification TypeScript |
| `android-preview` | Push sur `develop` | EAS Build → APK interne |
| `production-release` | Push sur `main` | EAS Build iOS + Android → stores |
| `web-deploy` | Push sur `main` | Build web + déploiement Netlify |

### Mise en place

1. Connecter le dépôt sur [codemagic.io](https://codemagic.io)
2. Ajouter les groupes de variables dans **App Settings > Environment variables** :

   ```text
   expo_credentials   →  EXPO_TOKEN, EMAIL_RECIPIENT
   apple_credentials  →  APPLE_ID, APP_STORE_CONNECT_KEY_IDENTIFIER
   google_credentials →  GOOGLE_SERVICE_ACCOUNT_KEY
   ```

3. Ajouter les variables Appwrite et Sentry
4. Pousser sur `develop` ou `main` pour déclencher un build

---

## Crédits

Basé sur le tutoriel de [JavaScript Mastery](https://www.youtube.com/@javascriptmastery/videos) — mis à jour vers Expo SDK 54 / React Native 0.81 et enrichi avec une page de détail, articles populaires, profil complet, CI/CD Codemagic et corrections de dépendances.
