# Configuration des domaines

La liste des domaines est integree directement dans `site-policy.json`. Elle est livree avec l extension et ne depend pas d une page Settings ni d une GPO.

Modifiez `site-policy.json` avant de re-empaqueter :

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

Les motifs acceptes comprennent `*.qc.ca`, `*.gouv.qc.ca` et `example.com`.

Pour la procedure complete de test, d empaquetage et de deploiement, consulter [DEPLOYMENT.md](DEPLOYMENT.md).
