# Groupe4_Quizz_Front — README

Présentation
------------
Application Angular (UI) du projet de quizz. Elle communique avec le backend Spring Boot situé dans `../Groupe4_Quizz_Back` pour récupérer les quizz, questions, envoyer les réponses et récupérer les résultats.

Ce README décrit : les fonctionnalités offertes par le frontend, les prérequis et les commandes pour installer, configurer et lancer l'application en développement ou en production.

Fonctionnalités principales
---------------------------
- Navigation liste de quizz et catégories
- Lancement d'un quizz et affichage des questions
- Saisie des réponses et calcul du score
- Affichage des résultats et de l'historique
- Authentification (utilisateur / administrateur)
- Interface d'administration : création / modification / suppression de quizz et questions (si le rôle admin est actif)

Prérequis
---------
- Node.js 18+ (v18 recommandé)
- npm (fourni avec Node)
- Angular CLI 17 (optionnel pour dev global) : `npm install -g @angular/cli@17`
- Backend du projet en cours d'exécution (par défaut attendu sur `http://localhost:8080`)
- BDD : MySQL (http://localhost:3306)
Installation
------------
Depuis le dossier `Groupe4_Quizz_Front` du dépôt :

```bash
npm install
```

Configuration
-------------
L'application utilise les fichiers d'environnements pour connaître l'URL du backend. Ouvrez :

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Développement (lancer localement)
---------------------------------
Démarrer le serveur de développement Angular :

```bash
ng serve 
```

Par défaut l'app est accessible sur : http://localhost:4200



Identifiants de démonstration
-----------------------------
- Admin (démo) :
  - Email : `admin@site.com`
  - Mot de passe : `admin123`


Dépannage rapide
-----------------
- Erreur CORS : utilisez le `proxy.conf.json` en dev ou activez CORS côté backend.
- API non trouvée (404) : vérifiez `apiBaseUrl` et que le backend est démarré (par défaut `http://localhost:8080`).
- Versions Node/Angular : assurez-vous d'utiliser Node.js 18+ et Angular CLI compatible.
- Si `npm install` échoue : supprimer `node_modules` puis relancer `npm install`.
