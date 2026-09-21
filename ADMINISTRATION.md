# Configuration administrateur

La configuration des domaines utilise `storage.managed`. Elle ne depend pas de la page Settings et ne peut pas etre modifiee par l utilisateur.

## Politique Chrome / Intune


# Configuration des domaines

La liste est integree directement dans `site-policy.json`. Elle ne depend pas de la page Settings et ne demande aucune GPO.

## Modifier la liste

Editez `site-policy.json` avant de reempaqueter l extension :

```json
{
  "disabledDomains": [
    "*.qc.ca",
    "*.exemple.com"
  ],
  "allowedDomains": [
    "saaq.gouv.qc.ca",
    "portail.exemple.qc.ca"
  ]
}
```

`disabledDomains` desactive l extension sur les domaines correspondants. `allowedDomains` constitue les exceptions et a priorite sur les domaines desactives.

Motifs acceptes :

- `*.qc.ca` : `qc.ca` et tous ses sous-domaines
- `*.gouv.qc.ca` : les domaines gouvernementaux quebecois
- `example.com` : `example.com` et ses sous-domaines

## Reempaqueter

1. Modifiez uniquement `site-policy.json`.
2. Ouvrez `chrome://extensions`.
3. Activez le mode developpeur.
4. Utilisez **Pack extension** et selectionnez le dossier du projet.
5. Distribuez le fichier `.crx` et le fichier `.pem` selon la procedure de deploiement de l organisation.

Le fichier `site-policy.json` est declare comme ressource de l extension afin que le script de contenu puisse le lire sur chaque site.
