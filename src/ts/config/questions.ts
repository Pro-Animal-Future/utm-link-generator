export const MEDIUM_LABEL = "utm_medium";
export const SOURCE_LABEL = "utm_source";
export const CAMPAIGN_NAME_LABEL = "utm_campaign";
export const ID_LABEL = "utm_id";
export const CONTENT_LABEL = "utm_content";

const LOCATION_OPTIONS = [
  { value: "clackamas" },
  { value: "dc" },
  { value: "denver" },
  { value: "portland" },
  {
    value: "Other municipality/county:",
    description: "e.g. vancouver or ft_collins",
    textInput: true,
  },
] as const;

const OTHER_OPTION = { value: "Other:", textInput: true };

export const QUESTIONS = {
  url: {
    type: "freeform",
    id: "url",
    label: "PAF URL",
    description: "Tip: copy and paste the URL to avoid typos",
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
      { value: "paid_social" },
      { value: "paid_sms" },
    ],
  },
  // NB: We use the HTML ID `eml` rather than `email` to avoid Safari
  // thinking the text inputs are email addresses.
  email: {
    source: {
      type: "radio",
      id: "eml-source",
      label: SOURCE_LABEL,
      options: [
        { value: "substack" },
        { value: "mailchimp" },
        { value: "sendgrid" },
        {
          value: "Influencer/organization name:",
          description: "E.g. 350_colorado or farm_sanctuary",
          textInput: true,
        },
      ],
    },
    campaignName: {
      type: "freeform",
      id: "eml-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      description:
        "Copy and paste the subject line, e.g. Imagine " +
        "If Politicians Had to Listen to Animal Advocates",
    },
    id: {
      type: "radio",
      id: "eml-id",
      label: ID_LABEL,
      optional: true,
      options: [
        { value: "colorado_activist_drip" },
        { value: "donor_drip" },
        { value: "oregon_activist_drip" },
      ],
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
        { ...OTHER_OPTION, description: "e.g. restaurant_qr" },
      ],
    },
    campaignName: {
      type: "radio",
      id: "field-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: LOCATION_OPTIONS,
    },
    id: {
      type: "radio",
      id: "field-id",
      label: ID_LABEL,
      optional: true,
      options: [
        { value: "fundraising" },
        { value: "lead_gen" },
        { value: "recruitment" },
        { value: "voter_persuasion" },
      ],
    },
    content: {
      type: "radio",
      id: "field-content",
      label: CONTENT_LABEL,
      optional: true,
      options: [
        {
          value: "Location:",
          description: "e.g. wellness_sushi",
          textInput: true,
        },
        { value: "Design:", description: "e.g. red_fox1", textInput: true },
      ],
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
        { value: "proanimalcolorado" },
        { value: "proanimaldc" },
        { value: "proanimalfuture" },
        { value: "proanimaloregon" },
        { value: "nattiefulton" },
        {
          value: "Influencer/organization name:",
          description: "E.g. 350_colorado or farm_sanctuary",
          textInput: true,
        },
        {
          value: "FB/Nextdoor group name:",
          description: "E.g. denver_vegans or hawthorne",
          textInput: true,
        },
      ],
    },
    id: {
      type: "radio",
      id: "organic-social-id",
      label: ID_LABEL,
      options: [
        {
          value: "bio",
          description: "The link will be added to a bio/profile",
        },
        {
          value: "post",
          description: "The link will be added to a post/story/video",
        },
      ],
    },
    content: {
      type: "radio",
      id: "organic-social-content",
      label: CONTENT_LABEL,
      optional: true,
      options: [
        {
          value: "Description of the post, video, or story:",
          description: "E.g. campaign kickoff recruitment Feb 13",
          textInput: true,
        },
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
      options: LOCATION_OPTIONS,
    },
    id: {
      type: "radio",
      id: "paid-mailer-id",
      label: ID_LABEL,
      optional: true,
      options: [
        {
          value: "Specific audience segment:",
          description: "e.g. denver_voters_under_25",
          textInput: true,
        },
      ],
    },
    content: {
      type: "radio",
      id: "paid-mailer-content",
      label: CONTENT_LABEL,
      optional: true,
      options: [
        {
          value: "Mailer description:",
          description: "e.g. fur_farming_cruelty",
          textInput: true,
        },
      ],
    },
  },
  paidSocial: {
    source: {
      type: "radio",
      id: "paid-social-source",
      label: SOURCE_LABEL,
      options: [
        { value: "meta" },
        { value: "youtube" },
        { ...OTHER_OPTION, description: "e.g. reddit" },
      ],
    },
    campaignName: {
      type: "freeform",
      id: "paid-social-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      description: "Campaign name, e.g. denver_voter_persuasion",
    },
    id: {
      type: "radio",
      id: "paid-social-id",
      label: ID_LABEL,
      optional: true,
      options: [
        {
          value: "Ad set or ad group:",
          description: "e.g. vote_pro_animal",
          textInput: true,
        },
      ],
    },
    content: {
      type: "radio",
      id: "paid-social-content",
      label: CONTENT_LABEL,
      optional: true,
      options: [
        {
          value: "Ad name:",
          description: "e.g. activist_testimonials",
          textInput: true,
        },
      ],
    },
  },
  paidSms: {
    source: {
      type: "radio",
      id: "paid-sms-source",
      label: SOURCE_LABEL,
      options: [
        { value: "scaletowin" },
        { ...OTHER_OPTION, description: "e.g. callhub" },
      ],
    },
    campaignName: {
      type: "radio",
      id: "paid-sms-campaign-name",
      label: CAMPAIGN_NAME_LABEL,
      options: LOCATION_OPTIONS,
    },
    id: {
      type: "radio",
      id: "paid-sms-id",
      label: ID_LABEL,
      optional: true,
      options: [
        {
          value: "Specific audience segment:",
          description: "e.g. denver_voters_over_50",
          textInput: true,
        },
      ],
    },
    content: {
      type: "radio",
      id: "paid-sms-content",
      label: CONTENT_LABEL,
      optional: true,
      options: [
        {
          value: "Text blast's name:",
          description: "e.g. end_fur_farming",
          textInput: true,
        },
      ],
    },
  },
} as const;
