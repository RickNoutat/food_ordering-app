# FoodOrder — Application mobile de commande de nourriture

Application mobile full-stack de commande de nourriture, développée avec React Native, Expo Router, TypeScript, NativeWind et Appwrite.

---

## Table des matières

1. [Présentation](#présentation)
2. [Stack technique](#stack-technique)
3. [Fonctionnalités](#fonctionnalités)
4. [Architecture du projet](#architecture-du-projet)
5. [Démarrage rapide](#démarrage-rapide)
6. [Variables d'environnement](#variables-denvironnement)

---

## Présentation

FoodOrder est une application mobile iOS/Android permettant aux utilisateurs de parcourir un menu de restauration, de rechercher et filtrer des plats par catégorie, de consulter les détails nutritionnels de chaque article, et de gérer un panier d'achat en temps réel.

Le back-end repose entièrement sur **Appwrite** (authentification, base de données, stockage), sans serveur dédié. La gestion d'état globale est assurée par **Zustand**, le monitoring des erreurs par **Sentry**.

---

## Stack technique

| Domaine | Technologies |
| --- | --- |
| Mobile | React Native 0.81, Expo SDK 54 |
| Navigation | Expo Router v6 (file-based routing) |
| Langage | TypeScript |
| Style | NativeWind v4 (Tailwind CSS pour RN) |
| Back-end / BaaS | Appwrite (Auth, Database, Storage) |
| État global | Zustand v5 |
| Monitoring | Sentry React Native |

---

## Fonctionnalités

- **Authentification** — Inscription et connexion par email/mot de passe via Appwrite Auth
- **Accueil personnalisé** — Salutation dynamique, bannières promotionnelles et section "Articles populaires" triés par note
- **Recherche & filtres** — Recherche par nom avec filtrage par catégorie en temps réel
- **Détail d'un plat** — Image, prix, catégorie, note, calories, protéines et description
- **Panier** — Ajout, modification de quantité, suppression d'articles et récapitulatif de paiement
- **Profil utilisateur** — Affichage des informations du compte et déconnexion sécurisée
- **Navigation par onglets** — Home, Recherche, Panier, Profil avec tab bar flottante

---

## Architecture du projet

```text
app/
├── (auth)/          # Écrans d'authentification (sign-in, sign-up)
├── (tabs)/          # Navigation principale (home, search, cart, profile)
└── menu/[id].tsx    # Détail dynamique d'un article

components/          # Composants UI réutilisables
lib/
├── appwrite.ts      # Client Appwrite + toutes les fonctions de données
└── useAppwrite.ts   # Hook générique de fetch avec état loading/error
store/
├── auth.store.ts    # Store Zustand — session utilisateur
└── cart.store.ts    # Store Zustand — panier
constants/           # Données statiques, assets, constantes
assets/              # Polices, icônes, images
```

---

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/en) LTS
- [Expo Go](https://expo.dev/go) sur votre appareil mobile (iOS ou Android)
- Un projet [Appwrite](https://appwrite.io/) configuré

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-username/food-ordering.git
cd food-ordering
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine :

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://<REGION>.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=votre_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=votre_database_id
EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=categories
EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID=menu
EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID=customizations
EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID=menu_customizations
```

### 4. Lancer l'application

```bash
npm start
```

- Appuyer sur `i` — simulateur iOS
- Appuyer sur `a` — émulateur Android
- Scanner le QR code avec Expo Go — appareil physique

---

## Variables d'environnement

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_APPWRITE_ENDPOINT` | URL de l'instance Appwrite |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | ID du projet Appwrite |
| `EXPO_PUBLIC_APPWRITE_DATABASE_ID` | ID de la base de données |
| `EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID` | Collection des profils utilisateurs |
| `EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID` | Collection des catégories |
| `EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID` | Collection des articles du menu |
| `EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID` | Collection des personnalisations |
| `EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID` | Table de liaison menu ↔ personnalisations |

---

## Crédits

Ce projet est basé sur le tutoriel de [JavaScript Mastery](https://www.youtube.com/@javascriptmastery/videos) — [Build a Food Delivery App](https://www.youtube.com/watch?v=LKrX390fJMw).

Le projet original a été repris, mis à jour vers Expo SDK 54 / React Native 0.81, puis enrichi avec de nouvelles fonctionnalités (page de détail, items populaires, profil complet, état panier vide, corrections de flux d'authentification).
