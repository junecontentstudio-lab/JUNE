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

**Typo des réels (références n°1 et n°2, 24-25/11/2026)**

Deux niveaux de texte, jamais mélangés au même moment :

1. **Sous-titres courants** (ce que dit la personne) : **police et couleur de la référence n°2**
   - Couleur : **jaune pastel `#FFF8B2`** (mesurée sur la vidéo), sans contour ni fond.
   - Police : **serif classique type Times, en romain (pas d'italique), poids normal, lettres serrées**. Le nom exact n'est pas encore confirmé. En attendant, la plus proche testée est **Tinos** (le clone libre de Times New Roman) avec un espacement des lettres de -0,03 em ; Crimson Text est la deuxième option.
   - Taille : environ 46 px sur une vidéo 1080×1920 (petit, discret). En minuscules, comme on parle.
   - Placement : **centrés, au milieu de l'écran** (vers 50 % de la hauteur).
   - Découpage : 1 à 3 mots à la fois, qui changent au rythme de la voix (la référence n°2 affiche **un mot à la fois**).
   - Animation : celle de la référence n°1 (voir « Effets de texte » ci-dessous) : apparition en fondu rapide, sobre.

2. **Mots-clés en « titre éditorial »** (1 ou 2 fois par réel, sur le mot fort de la phrase) : **style de la référence n°1**
   - Placé **en haut, au-dessus de la tête**, à la place des sous-titres (les sous-titres disparaissent pendant ce temps).
   - Une **petite phrase d'amorce** en serif fine et contrastée, minuscules, couleur claire (ex. « où j'ai eu une », « sur tous les »)…
   - … puis le **mot fort en très grand**, serif « magazine » à fort contraste (type Didot/Bodoni), **italique condensé** pour les mots (« *illumination* », « *pôles* »), romain gras pour les chiffres (« 360 »).
   - Mise en page serrée : l'amorce **chevauche légèrement** le haut du grand mot, interlignage négatif, lettres serrées. Le grand mot peut être décalé vers la droite (effet escalier).
   - Polices à tester : grand mot en **Playfair Display Italic** ou **Bodoni Moda Italic** ; amorce en **Bodoni Moda** fin ou **Cormorant Garamond Light**.

**Effets de texte (référence n°1, que June aime beaucoup)**
- **Le texte passe DERRIÈRE la personne** ⭐ : le grand mot est placé derrière la tête. Les cheveux et le visage passent **devant** les lettres (on voit « illumi…ation » avec la tête qui cache le milieu du mot). Technique : détourer la personne (`hyperframes remove-background` sur le rush), puis empiler 3 couches : le rush en fond → le texte → la personne détourée par-dessus. À utiliser sur les mots-clés en haut de l'écran, quand la tête ou le corps croise le texte.
- L'amorce apparaît d'abord, **en fondu rapide (environ 0,15 s)**.
- Le grand mot arrive **un temps après**, sur le mot prononcé : il **glisse légèrement depuis la gauche** jusqu'à sa place, en fondu (environ 0,25 s).
- Le bloc reste environ 1 seconde, puis disparaît ; on revient aux sous-titres.
- **Flou de passage** : quand une nouvelle phrase arrive alors qu'un grand mot est encore à l'écran (« 360 » → « sur tous les pôles »), l'ancien grand mot **se floute, glisse et s'efface** pendant que le nouveau texte apparaît dessous.
- Pas d'effets gadgets (rebond, rotation, couleurs flashy) : sobre et éditorial.

**Couleurs des textes (demande de June, 24-25/11/2026)**
- **Sous-titres : jaune pastel `#FFF8B2`** (référence n°2).
- **Gros textes (mots-clés) : marron** (marron foncé, type `#4A2E20`, code exact à valider sur un test).
- Amorces des mots-clés : jaune pastel `#FFF8B2` ou crème, selon le fond (à valider sur un test).
- ⚠️ Ces couleurs remplacent, pour les réels, le Sapin et le Laiton de la proposition v2.

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
