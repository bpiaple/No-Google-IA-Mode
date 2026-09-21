# Déploiement de l’extension par GPO

Ce document explique comment déployer l’extension **Ville de Rimouski / Pas de Mode IA Google** avec une stratégie de groupe (GPO), à partir du partage réseau :

```text
Z:\Informatique\extensions
```

Le chemin `Z:` est utilisé pour l’administration. Dans la GPO et dans `update.xml`, utiliser de préférence le chemin UNC correspondant au partage réseau, par exemple :

```text
\\sfrimouski\commun\Informatique\extensions
```

## 1. Préparer la configuration des domaines

Modifier `site-policy.json` avant chaque nouvelle livraison :

```json
{
  "disabledDomains": [
    "*.gouv.qc.ca",
    "*.qc.ca"
  ],
  "allowedDomains": [
    "google.com"
  ]
}
```

- `disabledDomains` désactive l’extension sur un domaine et ses sous-domaines.
- `allowedDomains` définit les exceptions prioritaires.
- Les motifs tels que `*.qc.ca` sont acceptés.
- Une liste vide dans `allowedDomains` signifie qu’aucune exception n’est permise.

Le fichier `site-policy.json` est intégré au paquet de l’extension. Toute modification de ce fichier nécessite donc un nouveau paquet et une nouvelle version.

## 2. Vérifier et augmenter la version

Dans `manifest.json`, augmenter la valeur de `version` avant chaque livraison. La version doit être supérieure à celle déjà installée sur les postes.

Exemple :

```json
"version": "1.0.8"
```

## 3. Tester l’extension localement

1. Ouvrir `chrome://extensions` dans Chrome ou `edge://extensions` dans Microsoft Edge.
2. Activer le **Mode développeur**.
3. Cliquer sur **Charger l’extension non empaquetée**.
4. Sélectionner le dossier contenant `manifest.json`.
5. Tester un domaine visé par `disabledDomains`.
6. Tester un domaine inscrit dans `allowedDomains`.
7. Tester une page qui n’est visée par aucune règle.
8. Vérifier le fonctionnement du popup et de la page des paramètres.

## 4. Créer le paquet de l’extension

1. Ouvrir `chrome://extensions` dans Chrome.
2. Activer le **Mode développeur**.
3. Cliquer sur **Empaqueter l’extension**.
4. Sélectionner le dossier racine du projet, celui qui contient `manifest.json`.
5. Sélectionner le fichier de clé existant `extension-private.pem`.
6. Cliquer sur **Empaqueter l’extension**.
7. Déposer le nouveau fichier `.crx` dans :

   ```text
   Z:\Informatique\extensions
   ```

8. Conserver le fichier `.pem` dans un emplacement sécurisé réservé aux administrateurs.

Ne jamais générer une nouvelle clé `.pem` pour une mise à jour. Une nouvelle clé créerait un nouvel identifiant d’extension et empêcherait la mise à jour des installations existantes.

## 5. Préparer le fichier `update.xml`

Le fichier `update.xml` doit contenir l’identifiant de l’extension, le chemin UNC du fichier `.crx` et la version publiée :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
  <app appid="jfdchlmafcnibgdmkiphbhfeangakhdo">
    <updatecheck codebase="file://///sfrimouski/commun/Informatique/extensions/Ville_de_Rimouski_Pas_de_Mode_IA_Google.crx" version="1.0.8" />
  </app>
</gupdate>
```

Après chaque livraison :

- mettre à jour la valeur `version`;
- vérifier que `codebase` pointe vers le fichier `.crx` disponible sur le partage;
- déposer `update.xml` dans le même emplacement réseau que le paquet.

Le fichier `.pem` ne doit pas être distribué aux utilisateurs.

## 6. Installer les modèles de stratégie Chrome et Edge

Installer les modèles ADMX/ADML officiels des navigateurs sur le contrôleur de domaine ou dans le magasin central des stratégies de groupe.

Les paramètres à utiliser sont :

- Google Chrome : **ExtensionInstallForcelist**;
- Microsoft Edge : **ExtensionInstallForcelist**.

## 7. Configurer la GPO Chrome

Dans la console **Gestion de stratégie de groupe** :

1. Créer ou modifier la GPO destinée aux postes concernés.
2. Ouvrir :

   ```text
   Configuration ordinateur
   > Modèles d’administration
   > Google
   > Google Chrome
   > Extensions
   ```

3. Activer **Configurer la liste des extensions installées de force**.
4. Ajouter une entrée contenant l’identifiant de l’extension et l’URL du fichier `update.xml` :

   ```text
   jfdchlmafcnibgdmkiphbhfeangakhdo;file://///sfrimouski/commun/Informatique/extensions/update.xml
   ```

5. Lier la GPO à l’unité d’organisation contenant les ordinateurs visés.

## 8. Configurer la GPO Microsoft Edge

Dans la même console :

1. Créer ou modifier la GPO destinée aux postes Microsoft Edge.
2. Ouvrir :

   ```text
   Configuration ordinateur
   > Modèles d’administration
   > Microsoft Edge
   > Extensions
   ```

3. Activer **Contrôler les extensions installées de force** ou **ExtensionInstallForcelist**, selon la version des modèles ADMX/ADML.
4. Ajouter la même entrée :

   ```text
   jfdchlmafcnibgdmkiphbhfeangakhdo;file://///sfrimouski/commun/Informatique/extensions/update.xml
   ```

5. Lier la GPO à l’unité d’organisation contenant les ordinateurs visés.

## 9. Actualiser et vérifier la stratégie

Sur un poste pilote :

1. Exécuter :

   ```text
   gpupdate /force
   ```

2. Redémarrer le navigateur.
3. Vérifier la stratégie dans :

   - `chrome://policy` pour Chrome;
   - `edge://policy` pour Edge.

4. Cliquer sur **Recharger les stratégies**.
5. Vérifier que l’extension apparaît dans `chrome://extensions` ou `edge://extensions`.
6. Vérifier que la version affichée correspond à celle publiée.

## 10. Procédure de mise à jour

Pour chaque nouvelle version :

1. Modifier `site-policy.json`, si nécessaire.
2. Augmenter la version dans `manifest.json`.
3. Tester l’extension non empaquetée.
4. Empaqueter l’extension avec le même fichier `.pem`.
5. Copier le fichier `.crx` dans `Z:\Informatique\extensions`.
6. Mettre à jour `update.xml` avec la nouvelle version.
7. Vérifier l’installation sur un poste pilote.
8. Attendre la validation avant de déployer la mise à jour à tous les postes.

## Dépannage

- **L’extension n’apparaît pas** : vérifier l’identifiant, le lien de la GPO, l’accès au partage réseau et la stratégie dans `chrome://policy` ou `edge://policy`.
- **La mise à jour ne s’installe pas** : vérifier que la version est supérieure et que le même fichier `.pem` a été utilisé.
- **Le fichier `update.xml` est inaccessible** : vérifier les droits de lecture du compte ordinateur sur le partage réseau.
- **La politique de domaines ne change pas** : vérifier que `site-policy.json` a été inclus dans le nouveau paquet `.crx`.
- **Un site est encore bloqué** : vérifier qu’il correspond bien à une entrée de `allowedDomains`.
- **Un site n’est pas bloqué** : vérifier qu’il ne correspond pas à une entrée de `allowedDomains` et que l’extension est active sur ce site.
