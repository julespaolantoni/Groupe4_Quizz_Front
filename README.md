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

Mettez à jour la variable `apiBaseUrl` pour pointer vers votre backend, par exemple :

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
```

Si vous ne souhaitez pas modifier les fichiers d'environnement, vous pouvez aussi configurer un proxy de développement (voir ci‑dessous) pour rediriger `/api` vers le backend.

Développement (lancer localement)
---------------------------------
Démarrer le serveur de développement Angular :

```bash
npm run start
# ou
ng serve --open
```

Par défaut l'app est accessible sur : http://localhost:4200

Utiliser un proxy pour éviter les problèmes CORS (optionnel)
-----------------------------------------------------------
Pour le développement, si le backend est sur `http://localhost:8080`, créez un fichier `proxy.conf.json` à la racine de `Groupe4_Quizz_Front` :

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

Puis lancez Angular avec le proxy :

```bash
ng serve --proxy-config proxy.conf.json --open
```

Build pour production
---------------------
Compiler l'application pour la production :

```bash
ng build --configuration production
```

Le contenu optimisé est généré dans `dist/` et peut être servi par un serveur web ou empaqueté avec le backend.

Tests
-----
- Tests unitaires :

```bash
npm test
```

- Tests e2e (si configurés) :

```bash
npm run e2e
```

Identifiants de démonstration
-----------------------------
- Admin (démo) :
  - Email : `admin@site.com`
  - Mot de passe : `admin123`

(s'il existe un jeu de données d'initialisation côté backend, ces identifiants fonctionneront ; sinon, créez un compte admin via l'API ou l'interface d'administration)

Dépannage rapide
-----------------
- Erreur CORS : utilisez le `proxy.conf.json` en dev ou activez CORS côté backend.
- API non trouvée (404) : vérifiez `apiBaseUrl` et que le backend est démarré (par défaut `http://localhost:8080`).
- Versions Node/Angular : assurez-vous d'utiliser Node.js 18+ et Angular CLI compatible.
- Si `npm install` échoue : supprimer `node_modules` puis relancer `npm install`.

Conseils de déploiement
-----------------------
- Construire le frontend (`ng build --configuration production`) et déployer le contenu de `dist/` sur un CDN ou un serveur statique.
- Vous pouvez servir les fichiers statiques via le backend Spring Boot en copiant les fichiers dans `src/main/resources/static` du backend avant de builder le jar.

Contributions
-------------
- Respectez les conventions de code Angular.
- Ouvrir une issue ou un merge request avec une description claire des changements.

Contact
-------
Pour toute question sur le frontend, voir la documentation du projet ou contacter les mainteneurs du dépôt.
