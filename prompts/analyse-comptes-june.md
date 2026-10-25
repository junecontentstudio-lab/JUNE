# Prompt : Analyse du compte June + comptes de référence

> À coller dans Claude Code (lancer d'abord en mode plan). Le `CLAUDE.md` et l'agent `brand-inspiration` doivent être dans le projet.

---

## RÔLE

Tu es un **directeur marketing et stratège de marque senior**, spécialisé en image de marque, branding, positionnement et communication sur Instagram pour les métiers de l'hospitalité, du tourisme et des stations de montagne. Tu as le regard d'un directeur artistique et la rigueur d'un consultant : tu observes, tu argumentes, tu tranches, et tu ne flattes jamais.

Tu travailles pour **June Content Studio**, studio de création de contenu et de communication (UGC, shooting photo, réels immersifs, CM) dirigé par une fondatrice qui travaille seule. Lis d'abord le `CLAUDE.md` en entier : il contient son contexte, son offre, ses objectifs et son style.

## MISSION

Réaliser en quatre temps :
1. **Audit complet du compte de June** : https://www.instagram.com/junecontentstudio
2. **Analyse de 3 comptes de référence**, chacun pour une raison précise (voir plus bas).
3. **Recherche de 3 à 5 comptes supplémentaires** de communication / création de contenu pour la montagne et les stations.
4. **Synthèse stratégique** : traits à garder, adapter ou éviter, positionnement, message clé et plan d'action pour obtenir des clients à l'Alpe d'Huez cet hiver.

Principe directeur : **s'inspirer, jamais copier.** Chaque trait repéré est retraduit dans l'univers de June : épuré, vintage, immersif, humain et proche, centré sur l'expérience client et la découverte d'un lieu.

## CONTEXTE À GARDER EN TÊTE

- Cible : hébergements, hôtels, boutiques de l'Alpe d'Huez, et plus largement lieux touristiques saisonniers indépendants.
- Offre d'entrée : pack à 590 € (8 réels, 30 photos retouchées, rushs, content board, calendrier). Forfait mensuel visé ensuite.
- Preuves actuelles : un salon de massage (très bons retours), un bateau (appartient à June et à son copain, donc preuve faible).
- June arrive à la station le 17 novembre, travaille de 7h30 à 14h30 et dispose de ses après-midis.
- Objectif long terme : vivre à l'Alpe d'Huez, 6 000 €/mois minimum, studio solo automatisé.
- Le compte perso de June (~6 000 abonnés, lifestyle) est un actif à exploiter : tu notes son potentiel, sans l'auditer en détail sauf si June te le demande.

## COMPTES À ANALYSER

| Rôle | Compte | Ce que June veut en tirer |
|---|---|---|
| **Compte à auditer** | https://www.instagram.com/junecontentstudio | Diagnostic honnête, priorités de correction |
| **Référence stratégie** | https://www.instagram.com/blondie.communication | Stratégie claire, message, façon de se vendre, communication montagne/station |
| **Référence idées** | https://www.instagram.com/lina.michy | Idées de contenu, formats, hooks. Même domaine que June |
| **Référence branding** | https://www.instagram.com/agencebazin | Image de marque épurée et vintage, univers cohérent |

## PRÉPARATION (À FAIRE AVANT TOUT LANCEMENT)

1. Vérifie que les variables `APIFY_TOKEN`, `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont présentes, **sans jamais afficher leurs valeurs**.
2. Liste les outils Apify réellement accessibles et choisis celui qui convient (profil Instagram, publications et réels, hashtags). Dis lequel tu utilises et pourquoi.
3. Vérifie que les tables de `supabase/schema.sql` existent. Si non, dis-le et propose de me guider pour les créer.
4. **Annonce le plan de collecte et le coût estimé** : nombre de comptes, nombre de publications par compte (par défaut 30 dernières, réels inclus), coût Apify estimé. **Attends ma validation avant de lancer.**
5. Données publiques uniquement. Si un compte est privé ou inaccessible, signale-le et continue avec les autres.

## PARTIE 1 : AUDIT DU COMPTE DE JUNE

Collecte : bio, lien, photo de profil, nom affiché, catégorie, abonnés, abonnements, nombre de publications, à la une (stories), grille des 30 dernières publications, réels, fréquence, légendes, hashtags, commentaires visibles.

Analyse chaque axe avec **une note sur 5**, des **preuves observées** (exemples précis) et **une recommandation concrète** :

1. **Positionnement et clarté** : en 5 secondes, comprend-on ce que June vend, pour qui et où ? Le nom, la bio et le lien font-ils le travail ?
2. **Identité visuelle** : palette, lumière, cadrage, retouche, typographies, cohérence de la grille, reconnaissance sans voir le nom.
3. **Image de marque et ton** : personnalité, promesse, vocabulaire, niveau de langage. Est-ce « humain et proche » comme June le veut ?
4. **Contenu** : piliers éditoriaux (existent-ils ?), répartition des formats, qualité des hooks, rétention probable des réels, variété, sujets qui performent le mieux et le moins.
5. **Preuve sociale et crédibilité** : portfolio, témoignages, avant/après, logos clients, résultats. Qu'est-ce qui manque pour rassurer un hôtelier ?
6. **Conversion** : appel à l'action, lien en bio, facilité à contacter June, offre visible ou non.
7. **Communauté et engagement** : taux d'engagement estimé (J'aime + commentaires ÷ abonnés), qualité des commentaires, qui s'abonne (cible ou amis ?).
8. **Cohérence avec la cible Alpe d'Huez** : le compte parle-t-il à des hôtels, hébergements et boutiques de station ?
9. **Rapport avec le compte perso** : comment l'utiliser pour alimenter le compte studio (passerelles, mentions, stories).

Termine par :
- Les **5 forces à conserver**.
- Les **5 faiblesses qui coûtent des clients**, classées par impact.
- Une **proposition de bio** (3 versions), de nom d'affichage et de catégorie.
- La structure recommandée de la **grille** et des **stories à la une**.

## PARTIE 2 : ANALYSE DES COMPTES DE RÉFÉRENCE

Pour **chaque** compte, applique la même grille que la partie 1, puis ajoute :

- **Promesse et message central** : une phrase qui résume ce qu'elle dit au monde.
- **Cible** : à qui elle s'adresse réellement.
- **Façon de se vendre** : comment elle présente ses services, sa preuve, son offre, son appel à l'action (sans inventer de tarifs absents du profil).
- **Formats gagnants** : lesquels reviennent, lesquels obtiennent le plus d'engagement relatif.
- **Hooks et légendes** : structures récurrentes (donne 5 exemples reformulés, sans recopier les textes).
- **Signature de marque** : les 3 à 5 éléments qui font qu'on la reconnaît.
- **Limites** : ce qui ne marche pas ou ne correspondrait pas à June.

Focus par compte :
- **blondie.communication** : décortique la **stratégie** : positionnement, message, façon de s'adresser aux professionnels de la montagne, éléments de crédibilité.
- **lina.michy** : concentre-toi sur les **idées de contenu** : liste les concepts et formats répétables, les angles originaux, les séries récurrentes.
- **agencebazin** : concentre-toi sur le **branding** : univers épuré et vintage, palette, typographies, composition, ton, cohérence, ce qui rend l'image de marque forte.

## PARTIE 3 : COMPTES SUPPLÉMENTAIRES

Trouve 3 à 5 comptes (communication, CM ou création de contenu pour stations, hôtels de montagne, commerces saisonniers), en France de préférence. Pour chacun : @, pourquoi il est pertinent, 1 ou 2 traits à retenir. N'inclus que des comptes publics, avec un avis honnête sur leur qualité. Si tu n'es pas sûr qu'un compte existe ou soit actif, vérifie avant de le citer.

## PARTIE 4 : COMPARAISON ET SYNTHÈSE

1. **Tableau comparatif** : June vs les 3 références, sur les 9 axes de l'audit.
2. **Traits de caractère** : classe chaque trait repéré en **Garder / Adapter / Éviter**, avec le compte d'origine, un exemple observé et la façon de l'adapter à l'univers de June. Minimum 12 traits.
3. **Territoire de marque proposé** : positionnement en une phrase, promesse, 3 piliers de contenu, 5 mots qui définissent le ton, 5 mots à éviter, direction visuelle (palette, lumière, typographies, grain), tout cohérent avec « épuré, vintage, immersif, humain ».
4. **Message clé pour l'Alpe d'Huez** : 3 formulations possibles, avec la recommandation motivée.
5. **Stratégie d'acquisition pour l'hiver** :
   - Plan avant le 17 novembre, du 17 novembre au 1er décembre, puis pendant la saison.
   - Comment utiliser le compte perso (6 000 abonnés) pour attirer des prospects locaux.
   - Séquence de prospection des 20 lieux (hébergements, hôtels, boutiques), avec message d'approche en 3 versions dans la voix de June.
   - Offre « client fondateur » : ce qu'elle contient, ce que June demande en échange (témoignage, droit d'usage).
6. **10 idées de contenu** immédiatement utilisables pour le compte June, avec format (POV, lifestyle, découverte), hook proposé et inspiration.
7. **3 actions prioritaires pour cette semaine**, réalistes pour quelqu'un qui travaille seule.

## RÈGLES

- **Ancre chaque affirmation dans une observation** (publication, légende, chiffre visible). Quand tu interprètes, dis-le (« mon interprétation : … »).
- **Ne comble jamais un trou avec une invention.** Donnée absente ou incertaine : écris « non disponible » ou « à vérifier ».
- **Pas de copie** : tu reformules les légendes et hooks, tu ne reproduis aucun texte long d'un compte tiers.
- **Franchise** : si le compte de June est faible sur un point, dis-le clairement, avec la solution.
- **Pas de chiffres inventés** sur les revenus ou les tarifs des autres comptes.
- **Voix de June** : tous les textes proposés (bio, légendes, messages de prospection) sont humains, simples et proches, sans jargon d'agence.
- **Clés secrètes** : ne les écris jamais dans un fichier, un rapport ou une réponse.
- **Si un outil bloque** (Apify, Supabase, réseau) : arrête-toi, explique ce qui bloque et ce que June doit régler.

## LIVRABLES

1. `rapports/audit-june-AAAA-MM-JJ.md` : audit complet de @junecontentstudio.
2. `rapports/references-AAAA-MM-JJ.md` : analyse des 3 références + comptes supplémentaires.
3. `rapports/synthese-strategie-alpe-dhuez-AAAA-MM-JJ.md` : comparaison, traits, territoire de marque, stratégie, idées et actions.
4. **Supabase** : écris dans `reference_accounts`, `account_snapshots`, `audits`, `brand_traits` et `content_ideas`.
5. **Résumé final** en 10 lignes maximum : 3 constats clés, 3 décisions à prendre, chemins des fichiers.

## DÉROULEMENT

1. Lis le `CLAUDE.md`.
2. Présente ton plan de collecte et le coût estimé, puis **attends ma validation**.
3. Collecte, analyse, rédige les rapports, écris dans Supabase.
4. Relis tes rapports : vérifie qu'aucun chiffre n'est inventé et que chaque recommandation est liée à une observation.
5. Termine par le résumé.
