export const MEDIUM_LABEL = "utm_medium";
export const SOURCE_LABEL = "utm_source";
export const CAMPAIGN_NAME_LABEL = "utm_campaign";

const CAMPAIGN_PURPOSE_OPTIONS = [
  { value: "fundraising" },
  { value: "lead_gen" },
  { value: "recruitment" },
  { value: "voter_persuasion" },
] as const;

const ACCOUNT_NAME_OPTIONS = [
  { value: "proanimalcolorado" },
  { value: "proanimalfuture" },
  { value: "proanimaloregon" },
  { value: "nattiefulton" },
];

const OTHER_OPTION = { value: "Other:", textInput: true };

export const QUESTIONS = {
  url: {
    type: "freeform",
    id: "url",
    label: "PAF URL",
    isUrl: true,
  },
  medium: {
    type: "radio",
    id: "medium",
    label: MEDIUM_LABEL,
    options: [
      { value: "email" },
      { value: "field" },
      { value: "organic_social" },
      { value: "paid_mail" },
      { value: "paid_search" },
      { value: "paid_social" },
      { value: "paid_sms" },
    ],
  },
  email: {
    source: {
      type: "radio",
      id: "email-source",
      label: SOURCE_LABEL,
      options: [
        { value: "substack" },
        { value: "mailchimp" },
        { value: "sendgrid" },
        {
          value: "Influencer/organization name:",
          description: "E.g. 350colorado",
          textInput: true,
        },
      ],
    },
    campaignName: {
      type: "radio",
      id: "email-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: ACCOUNT_NAME_OPTIONS,
    },
  },
  field: {
    source: {
      type: "radio",
      id: "field-source",
      label: SOURCE_LABEL,
      options: [
        { value: "aframe" },
        { value: "handout" },
        { value: "postcard" },
        { value: "poster" },
        { value: "sticker" },
        { value: "tablecloth" },
        OTHER_OPTION,
      ],
    },
    campaignName: {
      type: "radio",
      id: "field-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: CAMPAIGN_PURPOSE_OPTIONS,
    },
  },
  organicSocial: {
    source: {
      type: "radio",
      id: "organic-social-source",
      label: SOURCE_LABEL,
      options: [
        { value: "facebook" },
        { value: "instagram" },
        { value: "nextdoor" },
        { value: "slack" },
        { value: "tiktok" },
        { value: "x" },
        { value: "youtube" },
      ],
    },
    campaignName: {
      type: "radio",
      id: "organic-social-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: [
        ...ACCOUNT_NAME_OPTIONS,
        { value: "Partner handle:", textInput: true },
        { value: "FB/Nextdoor group name:", textInput: true },
      ],
    },
  },
  // NB: We use the HTML ID `paid-mailer` rather than `paid-mail` to avoid Safari
  // thinking the text inputs are email addresses.
  paidMail: {
    source: {
      type: "freeform",
      id: "paid-mailer-source",
      label: SOURCE_LABEL,
      description: "The direct mail vendor name, e.g. some_vendor",
    },
    campaignName: {
      type: "radio",
      id: "paid-mailer-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: CAMPAIGN_PURPOSE_OPTIONS,
    },
  },
  paidSearch: {
    source: {
      type: "radio",
      id: "paid-search-source",
      label: SOURCE_LABEL,
      options: [{ value: "google" }, OTHER_OPTION],
    },
    campaignName: {
      type: "radio",
      id: "paid-search-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: CAMPAIGN_PURPOSE_OPTIONS,
    },
  },
  paidSocial: {
    source: {
      type: "radio",
      id: "paid-social-source",
      label: SOURCE_LABEL,
      options: [{ value: "meta" }, { value: "youtube" }, OTHER_OPTION],
    },
    campaignName: {
      type: "radio",
      id: "paid-social-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: CAMPAIGN_PURPOSE_OPTIONS,
    },
  },
  paidSms: {
    source: {
      type: "radio",
      id: "paid-sms-source",
      label: SOURCE_LABEL,
      options: [{ value: "scaletowin" }, OTHER_OPTION],
    },
    campaignName: {
      type: "radio",
      id: "paid-sms-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: CAMPAIGN_PURPOSE_OPTIONS,
    },
  },
} as const;
