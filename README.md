# API de Gestion des Recettes

## Description

Cette API permet de gérer des recettes culinaires, en fournissant des fonctionnalités CRUD (Create, Read, Update, Delete). Elle est construite avec **Express.js** et utilise **MySQL** pour la gestion de la base de données. Le projet inclut des tests unitaires, des outils d'analyse et de formatage de code (ESLint, Prettier), ainsi qu'une containerisation avec **Docker** pour le déploiement.

## Objectifs

- Développer et tester une API RESTful avec Express.js et MySQL.
- Intégrer des outils d'analyse et de formatage de code.
- Containeriser l'API avec Docker pour faciliter le déploiement.
- Déployer l'API dans un environnement conteneurisé via DockerHub.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js**
- **MySQL**
- **Postman** (pour tester l'API)
- **Docker** (pour la containerisation)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

**Clonez le repository :**

```bash
git clone https://github.com/HarounaTraore/API-gestion-recette.git
```

**Accédez au dossier du projet :**

```bash
cd order-manager-app
```

**Installez les dépendances :**

```bash
npm install
```

## Configuration de la base de données

1. Assurez-vous que **MySQL** est en cours d'exécution sur votre machine.
2. Créez une base de données pour le projet (par exemple, `gestion_recette`).
3. Modifiez le fichier `.env.exampl`en le nommant `.env` pour y insérer les informations de connexion à la base de données.

Exemple de fichier `.env` :

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=gestion_recette
```

## Utilisation


Pour démarrer l'application :

```bash
npm start
```

L'API sera accessible à `http://localhost:3000`.

## Endpoints de l'API

### GET /recettes

- **Description** : Récupère toutes les recettes.
- **Réponse** :

```json
[
  {
    "id": 1,
    "titre": "Tarte aux pommes",
    "type": "Dessert",
    "ingrédients": "Pommes, Sucre, Pâte"
  }
]
```

### POST /recettes

- **Description** : Crée une nouvelle recette.
- **Corps de la requête** :

```json
{
  "titre": "Salade César",
  "type": "Entrée",
  "ingrédients": "Laitue, Poulet, Parmesan, Croutons"
}
```

- **Réponse** :

```json
{
  "message": "Recette ajoutée avec succès"
}
```

### PUT /recettes/:id

- **Description** : Met à jour une recette existante.
- **Corps de la requête** :

```json
{
  "titre": "Pizza améliorée",
  "type": "Plat principal",
  "ingrédients": "Tomates, Fromage, Pâte, Basilic"
}
```

- **Réponse** :

```json
{
  "message": "Recette mise à jour avec succès"
}
```

### DELETE /recettes/:id

- **Description** : Supprime une recette par ID.
- **Réponse** :

```json
{
  "message": "Recette supprimée avec succès"
}
```

## Tests unitaires

Des tests unitaires sont fournis pour vérifier le bon fonctionnement des fonctionnalités CRUD.

- **Framework utilisé** : Jasmine
- **Exécution des tests** :

```bash
npm test
```

## Analyse et formatage de code

L'analyse statique du code est réalisée avec **ESLint** et le formatage avec **Prettier**. Ces outils sont configurés pour être utilisés dans votre pipeline de développement afin de maintenir un code propre et cohérent.

### Exécuter l'analyse du code :

```bash
npm run lint
```

### Exécuter le formatage automatique :

```bash
npm run format
```

## Containerisation avec Docker

Ce projet utilise **Docker** pour la containerisation, ce qui permet de déployer facilement l'API dans n'importe quel environnement.

### Instructions pour Docker :

1. **Lien vers l'image DockerHub** : [ lien image](https://hub.docker.com/r/harounatraore/recette)

2. **Lancer les conteneurs Docker** :

   ```bash
   docker-compose up -d
   ```

## Documentation et Collection Postman

Pour tester les différents endpoints de l'API, vous pouvez utiliser la collection Postman incluse dans ce projet. Elle contient toutes les requêtes configurées pour interagir avec l'API.

- **Exporter la collection** : `gestion-recette-API.postman_collection.json`
- **Importer dans Postman** et exécuter les requêtes.

## Auteur

[Harouna Traoré](https://github.com/HarounaTraore)

## Contributeur

[Abderahmane Thimbo](https://github.com/AbderahmaneThimbo)
