/**
 * Contenu FAQ — liens optionnels vers les fiches services.
 */

import {
  INTERVENTION_AREA_LABEL,
  INTERVENTION_BASE_CITY,
  INTERVENTION_OUT_OF_ZONE_NOTE,
} from "@/lib/intervention-area";

export type FaqQuestion = {
  q: string;
  a: string;
  serviceHref?: string;
  serviceLabel?: string;
};

export type FaqCategory = {
  category: string;
  questions: FaqQuestion[];
};

export const FAQS: FaqCategory[] = [
  {
    category: "Devis & tarifs",
    questions: [
      {
        q: "Quelles informations fournir pour un devis de nettoyage de bureaux ?",
        a: "Indiquez la surface approximative (m²), le nombre de postes ou pièces, la fréquence souhaitée (ponctuel, hebdo, mensuel) et les horaires d'accès aux locaux. Une photo ou plan simplifié accélère l'estimation. Nous vous répondons avec une proposition claire sous 24 h ouvrées.",
        serviceHref: "/services/nettoyage-bureaux",
        serviceLabel: "Nettoyage de bureaux",
      },
      {
        q: "Le devis est-il vraiment gratuit et sans engagement ?",
        a: "Oui : l'établissement du devis est gratuit et ne vous engage pas. Vous décidez ensuite si la date et le périmètre proposés vous conviennent. Aucun frais caché n'est ajouté après coup sans validation écrite de votre part.",
      },
      {
        q: "Comment est calculé le prix d'un nettoyage fin de bail ?",
        a: "Le tarif tient compte de la superficie du logement, du nombre de pièces, de l'état général (graisse, calcaire, traces) et du niveau d'exigence pour l'état des lieux. Un logement très encrassé demande plus de temps qu'un entretien courant : nous précisons tout cela ligne par ligne sur le devis.",
        serviceHref: "/services/nettoyage-fin-bail",
        serviceLabel: "Nettoyage fin de bail",
      },
      {
        q: "Peut-on combiner plusieurs prestations sur un seul devis ?",
        a: "Oui : par exemple vitres et parties communes, ou fin de chantier avec passage vitres en fin de journée. Nous regroupons les interventions pour optimiser le déplacement, avec un seul interlocuteur et une seule facturation.",
      },
    ],
  },
  {
    category: "Bureaux & locaux professionnels",
    questions: [
      {
        q: "À quelle fréquence faut-il entretenir des bureaux ?",
        a: "Une petite structure peut se contenter d'un passage hebdomadaire ; les espaces à fort passage profitent souvent de deux passages par semaine. Nous ajustons la fréquence après une première visite selon le niveau de salissure observé.",
        serviceHref: "/services/nettoyage-bureaux",
        serviceLabel: "Nettoyage de bureaux",
      },
      {
        q: "Intervenez-vous en dehors des heures de bureau ?",
        a: "Oui : nous pouvons intervenir tôt le matin, en soirée ou le week-end pour limiter la gêne pour vos équipes et vos clients. Les créneaux se planifient lors de la commande et figurent sur votre bon d'intervention.",
        serviceHref: "/services/nettoyage-bureaux",
        serviceLabel: "Nettoyage de bureaux",
      },
    ],
  },
  {
    category: "Vitres & surfaces vitrées",
    questions: [
      {
        q: "Nettoyez-vous les vitres en hauteur et les vitrines de magasin ?",
        a: "Nous utilisons perches télescopiques, raclettes professionnelles et produits adaptés au type de vitrage. Les vitrines, baies et façades vitrées sont traitées méthodiquement pour éviter traces et micro-rayures. La hauteur et l'accessibilité sont évaluées avant l'intervention pour la sécurité.",
        serviceHref: "/services/nettoyage-vitres",
        serviceLabel: "Nettoyage de vitres",
      },
      {
        q: "Quelle différence entre un lavage ponctuel et un contrat vitres ?",
        a: "Le ponctuel convient avant une visite, une photo ou une ouverture ; le contrat régulier (mensuel ou trimestriel) maintient une luminosité stable et évite l'encrassement tenace. Nous vous proposons la formule qui correspond à votre fréquentation.",
        serviceHref: "/services/nettoyage-vitres",
        serviceLabel: "Nettoyage de vitres",
      },
    ],
  },
  {
    category: "Fin de chantier & après travaux",
    questions: [
      {
        q: "Que comprend exactement un nettoyage après travaux ?",
        a: "Évacuation des gravats et protections, dépoussiérage des murs et plinthes, lavage des sols et vitres, retrait des traces de colle ou peinture selon les surfaces. L'objectif est un espace sain et présentable pour remise des clés ou emménagement.",
        serviceHref: "/services/fin-chantier",
        serviceLabel: "Fin de chantier",
      },
      {
        q: "Faut-il que le chantier soit totalement terminé avant votre passage ?",
        a: "Idéalement oui : les corps de métier doivent avoir quitté les lieux pour éviter de salir derrière nous. Si un petit ajustement reste, nous pouvons planifier un passage après la dernière retouche, parfois en deux temps.",
        serviceHref: "/services/fin-chantier",
        serviceLabel: "Fin de chantier",
      },
    ],
  },
  {
    category: "Immeubles & parties communes",
    questions: [
      {
        q: "Comment s'organise l'entretien des cages d'escalier et halls d'immeuble ?",
        a: "Nous définissons avec le syndic ou le gestionnaire une checklist : fréquence des sols, désinfection des rampes et boîtes aux lettres, gestion des locaux poubelles. Les horaires respectent le règlement de copropriété.",
        serviceHref: "/services/entretien-immeuble",
        serviceLabel: "Entretien d'immeuble",
      },
      {
        q: "Proposez-vous des interventions pour syndics et gestionnaires ?",
        a: "Oui : nous pouvons établir un planning annuel avec rapport simple après passage, utile pour les assemblées et le suivi budgétaire. Le périmètre (parties communes, parking, local vélo) s'adapte à votre cahier des charges.",
        serviceHref: "/services/entretien-immeuble",
        serviceLabel: "Entretien d'immeuble",
      },
    ],
  },
  {
    category: "Particuliers & nettoyage à domicile",
    questions: [
      {
        q: "Quand faire appel à un nettoyage professionnel pour un logement ?",
        a: "Lors d'un déménagement, d'un grand ménage saisonnier ou lorsque le temps ou le matériel maison ne suffit pas pour un résultat homogène. Nous intervenons pièce par pièce avec du matériel adapté aux sols et sanitaires.",
        serviceHref: "/services/nettoyage-particulier",
        serviceLabel: "Nettoyage particulier",
      },
      {
        q: "Dois-je être présent pendant le nettoyage ?",
        a: "Ce n'est pas obligatoire si nous avons les accès convenus. Beaucoup de clients confient une clé ou un badge le jour J ; d'autres préfèrent être là pour les premières minutes. Indiquez-nous vos contraintes à la réservation.",
        serviceHref: "/services/nettoyage-particulier",
        serviceLabel: "Nettoyage particulier",
      },
    ],
  },
  {
    category: "Fin de bail & état des lieux",
    questions: [
      {
        q: "Le nettoyage fin de bail couvre-t-il four, frigo et placards ?",
        a: "Oui, ces zones sont souvent contrôlées à l'état des lieux : dégraissage four et hotte, désinfection frigo vide, dépoussiérage placards. Nous pouvons caler la prestation la veille ou le matin même du rendez-vous avec le bailleur.",
        serviceHref: "/services/nettoyage-fin-bail",
        serviceLabel: "Nettoyage fin de bail",
      },
      {
        q: "Que se passe-t-il si le propriétaire exige un repassage après votre passage ?",
        a: "Notre prestation vise un logement propre et conforme aux usages. En cas de litige mineur sur le ménage, restons joignables pour une retouche ciblée dans la mesure du possible.",
        serviceHref: "/services/nettoyage-fin-bail",
        serviceLabel: "Nettoyage fin de bail",
      },
    ],
  },
  {
    category: "Terrasses & extérieurs",
    questions: [
      {
        q: "Comment entretenir une terrasse ou un dallage extérieur durablement ?",
        a: "Le nettoyage haute pression élimine mousse et salissures ; un traitement anti-mousse peut prolonger le résultat selon l'exposition. Indiquez la surface et le type de revêtement pour un devis précis.",
        serviceHref: "/services/nettoyage-terrasse",
        serviceLabel: "Nettoyage de terrasse",
      },
    ],
  },
  {
    category: "Locaux industriels & ateliers",
    questions: [
      {
        q: "Intervenez-vous dans des ateliers ou zones de production ?",
        a: "Oui, selon la nature du site : sols, zones de passage, sanitaires et locaux sociaux. Nous évaluons les risques avant d'intervenir et adaptons le matériel. Décrivez votre activité pour une proposition sur mesure.",
      },
      {
        q: "Quelle est la différence avec un simple entretien de bureaux ?",
        a: "Un atelier ou un entrepôt impose souvent des fréquences plus élevées sur les sols et parfois des créneaux hors production. Le cahier des charges est plus technique qu'un open space classique.",
        serviceHref: "/services/nettoyage-bureaux",
        serviceLabel: "Nettoyage de bureaux",
      },
    ],
  },
  {
    category: "Délais & planification",
    questions: [
      {
        q: "En combien de temps pouvez-vous intervenir pour une urgence ?",
        a: "Selon le planning, un fin de bail ou une fin de chantier urgent peut souvent être placé sous 24 à 48 h. Les fins de mois sont chargées : contactez-nous dès que vous avez une date d'état des lieux ou de livraison.",
      },
      {
        q: "Comment se déroule la première visite ou le premier rendez-vous ?",
        a: "Pour les gros volumes ou copropriétés, une courte visite permet d'affiner le devis. Pour des prestations standard, un échange téléphonique ou par formulaire suffit souvent. Vous recevez ensuite confirmation écrite des dates et du périmètre.",
      },
    ],
  },
  {
    category: "Confiance, assurance & environnement",
    questions: [
      {
        q: "Êtes-vous assurés pour les dommages éventuels ?",
        a: "Makclean dispose d'une assurance responsabilité civile professionnelle couvrant nos interventions chez les clients. En cas d'incident rare, la procédure est claire : déclaration, constat et prise en charge selon les termes du contrat.",
      },
      {
        q: "Quels produits utilisez-vous au quotidien ?",
        a: "Nous sélectionnons des produits professionnels efficaces sur chaque support. Sur demande, nous pouvons privilégier des références éco-certifiées compatibles avec vos contraintes.",
      },
      {
        q: "Vos équipes sont-elles formées et identifiables ?",
        a: "Les intervenants appliquent des protocoles d'hygiène cohérents d'un chantier à l'autre. L'important est la traçabilité du passage et le respect des consignes d'accès que vous nous transmettez.",
      },
    ],
  },
  {
    category: "Zone d'intervention",
    questions: [
      {
        q: "Intervenez-vous en région de Tournai et dans le Hainaut ?",
        a: `Oui : basés à ${INTERVENTION_BASE_CITY}, nous intervenons dans la ${INTERVENTION_AREA_LABEL}. Carte et communes sur notre page dédiée.`,
        serviceHref: "/zones",
        serviceLabel: "Zones d'intervention",
      },
      {
        q: "Ma commune n'apparaît pas sur votre liste : puis-je quand même demander un devis ?",
        a: `${INTERVENTION_OUT_OF_ZONE_NOTE} Un léger supplément de déplacement peut s'appliquer hors zone, indiqué dès le devis.`,
        serviceHref: "/zones",
        serviceLabel: "Zones d'intervention",
      },
    ],
  },
];

export function getFaqFlat(): { q: string; a: string }[] {
  return FAQS.flatMap((cat) => cat.questions.map((item) => ({ q: item.q, a: item.a })));
}

export function getFaqQuestionCount(): number {
  return FAQS.reduce((n, cat) => n + cat.questions.length, 0);
}

export function slugifyFaqCategory(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
