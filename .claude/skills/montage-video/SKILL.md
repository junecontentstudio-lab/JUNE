---
name: montage-video
description: Règles de montage vidéo de June Content Studio (réels Instagram montés avec HyperFrames à partir des rushs de June). À lire AVANT tout montage, maquette ou modèle de réel, pour June elle-même ou pour un de ses clients. Contient le style June, les règles tirées de ses références, et la façon d'adapter le style à un client.
---

# Montage vidéo : June Content Studio

Ce skill rassemble **tout ce que June veut (et ne veut pas)** dans ses montages. Il grandit à chaque référence qu'elle donne.

- Les règles à appliquer sont ici, dans `SKILL.md`.
- Le détail de chaque référence (lien, ce qui a plu, ce qu'on en garde) est dans `references.md`, dans ce même dossier.
- L'outil de montage est HyperFrames (skills `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`). Ce skill dit **quoi** faire ; les skills HyperFrames disent **comment**.

## 0. Avant chaque montage : pour qui ?

Toujours vérifier d'abord **pour qui est le réel** :

| Cas | Ce qu'on applique |
|---|---|
| **June** (@junecontentstudio, c'est le cas le plus fréquent) | Section 1 (règles communes) + section 2 (identité June) |
| **Un client** | Section 1 (règles communes) + section 3 (adapter au client). L'identité June n'apparaît **pas**, sauf accord (ex. tampon discret en fin) |

Si ce n'est pas clair, demander à June avant de commencer.

## 1. Règles communes (June et clients)

Ce qui fait « un montage June », quel que soit le compte. Mettre à jour à chaque référence.

- Le but du contenu : faire ressortir **l'expérience du lieu** et donner envie de **venir la vivre** (POV, lifestyle, découverte).
- Format : vertical 1080×1920 (réels Instagram).
- **Mouvements lents** (travellings, panoramiques), pas de coupes rapides en rafale. *(à confirmer par les références)*
- Son : ambiance réelle du lieu + musique douce, volume bas. *(à confirmer par les références)*
- Garder la voix et la façon de parler de June (humaine, proche). Les textes à l'écran sont courts.

*(Règles issues des références : à compléter, voir `references.md`.)*

## 2. Identité June (réels pour @junecontentstudio)

> Base : proposition v2 du 25/10/2026 (`rapports/strategie-identite-2026-10-25.md`). Les références de June priment sur cette base : si une référence la contredit, on corrige ici.

**Esprit** : maison de contenu / boutique de village de montagne d'autrefois. Vintage, magasin, classe, élégant. *Élégant, chaleureux, sincère, soigné, local.*
**À éviter** : flashy, néon, fond blanc pur, polices fantaisie, filtres trop saturés.

**Palette**

| Nom | Code | Rôle |
|---|---|---|
| Papier | `#F3ECE0` | Fond principal (jamais de blanc pur) |
| Sapin | `#2F4036` | Couleur de marque |
| Laiton | `#B38B4D` | Détails : filets, lettrage doré, numéros (un seul accent doré par écran) |
| Café | `#3A2B22` | Texte |
| Rose poudré | `#D9B8A6` | Touche douce, fonds secondaires |

> ⭐ **RÉFÉRENCE MAÎTRE (décision de June, 25/11/2026)** : la vidéo **@bella.agence** (référence n°1 dans `references.md`) est LA référence pour **tous les montages**. On reprend **sa typo et ses animations à l'identique**. Seules les **couleurs** changent : **jaune pastel et marron**. En cas de doute, on revient à cette vidéo.

**Typo (identique à la référence maître)**

Deux niveaux de texte, jamais en même temps :

1. **Sous-titres courants** (ce que dit la personne)
   - Police : **sans-serif moderne, poids normal, lettres et mots serrés** (celle de la référence maître). Le nom exact n'est pas connu, parce que ce n'est pas le projet CapCut de June. Les plus proches testées sont **Plus Jakarta Sans 400** ou **Manrope 400**, avec un espacement des lettres de -0,02 em. À valider sur un test.
   - Taille : petite et discrète (environ 40-44 px sur une vidéo 1080×1920). En minuscules, comme on parle.
   - Placement : centrés, à hauteur de la poitrine, légèrement sous le milieu de l'écran.
   - Découpage : **2 à 4 mots** à la fois, au rythme de la voix (« et où je me suis dit », « tiens », « il y a une place »).
   - Animation : **coupe sèche**, sans fondu : le groupe de mots est remplacé d'un coup par le suivant.
   - Couleur : **jaune pastel `#FFF8B2`**.

2. **Mots-clés en « titre éditorial »** (1 ou 2 fois par réel, sur le mot fort de la phrase)
   - Placé **en haut, au-dessus de la tête**, à la place des sous-titres (les sous-titres disparaissent pendant ce temps).
   - Une **petite phrase d'amorce** en serif fine et contrastée, minuscules (ex. « où j'ai eu une », « sur tous les »), en **jaune pastel `#FFF8B2`**…
   - … puis le **mot fort en très grand**, serif « magazine » à fort contraste (type Didot/Bodoni), **italique condensé** pour les mots (« *illumination* », « *pôles* »), romain gras pour les chiffres (« 360 »), en **marron** (type `#4A2E20`, à valider).
   - Mise en page serrée : l'amorce **chevauche légèrement** le haut du grand mot, interlignage négatif, lettres serrées. Le grand mot peut être décalé vers la droite (effet escalier).
   - Polices à tester : grand mot en **Playfair Display Italic** ou **Bodoni Moda Italic** ; amorce en **Bodoni Moda** fin ou **Cormorant Garamond Light**.

**Animations (identiques à la référence maître)**
- **Le texte passe DERRIÈRE la personne** : le grand mot est placé derrière la tête, et les cheveux et le visage passent **devant** les lettres. Technique : détourer la personne (`hyperframes remove-background` sur le rush), puis empiler 3 couches : le rush en fond → le texte → la personne détourée par-dessus.
- L'amorce apparaît d'abord, **en fondu rapide (environ 0,15 s)**.
- Le grand mot arrive **un temps après**, sur le mot prononcé : il **glisse légèrement depuis la gauche** jusqu'à sa place, en fondu et **en partant flou puis net** (environ 0,25 s). Vu aussi dans la vidéo 1 de June.
- Le bloc reste environ 1 seconde, puis disparaît ; on revient aux sous-titres.
- **Flou de passage** : quand une nouvelle phrase arrive alors qu'un grand mot est encore à l'écran (« 360 » → « sur tous les pôles »), l'ancien grand mot **se floute, glisse et s'efface** pendant que le nouveau texte apparaît dessous.
- Pas d'effets gadgets (rebond, rotation, couleurs flashy) : sobre et éditorial.

**Bruitages (référence n°3 = « vidéo 1 » de June, 25/11/2026 : à garder pour TOUTES les vidéos)**

Deux sons, et seulement ceux-là (noms confirmés par June dans CapCut) :

| Son | Nom dans CapCut | À quoi il ressemble | Quand |
|---|---|---|---|
| **Le clic** | `Flashlight-Large-Flashlight-Press-Button-On-o_GEN-HD3-34523` | Clic sec et très court d'un bouton de lampe torche | Sur **la plupart des textes du bloc titre** (en haut) : le grand mot (« *vit* », « *joli* », « *émotion* », « *découvert* », « *chez vous* », « *réputée* ») ou la petite phrase d'amorce quand elle arrive (« si on racontait », « mais surtout il ») |
| **Le whoosh** | `挥舞Whoosh声2` (« whoosh de geste n°2 ») | Souffle grave et doux d'environ 0,35 s, qui monte environ 0,25 s puis retombe, large en stéréo | Sur **les grands mots les plus forts** (« *fondue* », « *l'expérience* », « *concernée* », « 1000 ») |

- **Calage** :
  - le clic tombe **pile sur l'image où le texte apparaît** ;
  - le whoosh **démarre environ 0,2 s avant** le grand mot, et son point le plus fort tombe sur l'apparition.
- **Les deux peuvent s'enchaîner** : clic sur l'amorce, puis whoosh sur le grand mot qui suit (ex. « si on racontait » → « *l'expérience* »).
- **Dosage (vidéo 1, 66 s)** : environ 11 clics et 5 whooshs. On peut compter un bruitage sur presque chaque arrivée de texte en haut, dont environ 1 whoosh toutes les 10 à 15 s, réservé aux mots forts.
- **Les sous-titres courants** (au niveau de la poitrine) **n'ont aucun bruitage**.
- **Volume** : discret, toujours sous la voix.
- **Fichiers** : ce sont des sons CapCut Pro (avec le diamant), qu'on ne peut pas récupérer tels quels. Dans HyperFrames, on utilise des **équivalents libres de droits** les plus proches possible (un clic de bouton de lampe torche, un whoosh grave et doux), via le skill `media-use`. Les ranger dans `video/sons/` (`clic.wav`, `whoosh.wav`) et toujours réutiliser les mêmes.

**Couleurs des textes (demande de June, 25/11/2026)**
- **Jaune pastel `#FFF8B2`** : sous-titres et amorces (petits textes).
- **Marron** (type `#4A2E20`) : gros textes (mots-clés).
- Ces couleurs remplacent, pour les réels, le Sapin et le Laiton de la proposition v2.
- Si un texte ne se lit pas sur le fond (ex. marron sur un fond sombre), on inverse : jaune pastel pour le gros mot.

**Ancienne option (référence n°2, remplacée le 25/11)** : sous-titres en **True Fate** (police CapCut Pro, payante en dehors de CapCut). On ne l'utilise plus par défaut, puisque la référence maître impose sa propre typo. On peut y revenir si June le demande.

**Signature**
- Début : une porte ou une enseigne qui s'ouvre (« réel d'ouverture de porte »).
- Fin : le tampon rond « Vu par June · Alpe d'Huez » (voir `kit-marque/09-tampon.png`).

**Étalonnage** : chaud, noirs relevés (délavé léger), saturation -10, verts vers l'olive, hautes lumières crème, grain léger.

**Durées** : immersifs 15 à 25 s ; éducatifs 25 à 40 s (accroche 3 s → problème → 3 conseils → appel à l'action).

**Les 4 rayons** (types de réels) : La Vitrine (donner envie), Le Comptoir (éducatif), L'Atelier (cas clients, coulisses), Le Carnet (local).

## 3. Réels pour un client

- Partir de **l'identité du client** (ses couleurs, ses polices, son ton, son feed), pas de celle de June.
- Garder les règles communes (section 1) : c'est la « patte » de June.
- Noter les préférences propres à chaque client dans `references.md`, rubrique « Clients ».

## 4. Comment on enrichit ce skill

À chaque référence que June donne :
1. L'ajouter dans `references.md` (date, source, pour qui, ce qui plaît, ce qu'on garde, ce qu'on ne garde pas).
2. Traduire ce qu'on garde en **règle concrète et applicable** dans la bonne section ci-dessus (ex. « transition : coupe sur le mouvement de la main », pas « dynamique »).
3. Si une nouvelle règle contredit une ancienne, garder la plus récente et le signaler à June.
