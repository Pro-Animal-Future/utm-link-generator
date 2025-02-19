export const OPTIONS = {
  communicationType: {
    id: "communication-type",
    label: "Communication type",
    options: [
      { value: "ad", label: "Advertisement" },
      { value: "email", label: "Email" },
      { value: "field", label: "Field" },
      { value: "social", label: "Organic social media" },
    ],
  },
  ad: {
    medium: {
      id: "ad-medium",
      label: "Medium",
      options: [
        {
          value: "paid_social",
          label: "Social media ads",
          description: "Meta, Reddit, etc.",
        },
        {
          value: "paid_search",
          label: "Search ads",
          description: "Google, Bing, etc.",
        },
        {
          value: "paid_ooh",
          label: "Out-of-home ads",
          description: "Billboards, transit ads, bus shelters",
        },
        {
          value: "paid_sms",
          label: "Text blasts",
          description: "E.g. Scale to Win",
        },
        { value: "paid_mail", label: "Mass-mailed voter mailers" },
        { value: "paid_tv", label: "TV commercials" },
      ],
    },
    campaignName: {
      id: "ad-campaign-name",
      label: "Primary purpose",
      options: [
        { value: "lead_gen", label: "Lead generation" },
        { value: "fundraising", label: "Fundraising" },
        { value: "recruitment", label: "Recruitment" },
        { value: "voter_persuasion", label: "Voter Persuasion" },
      ],
    },
  },
  email: {
    source: {
      id: "email-source",
      label: "Source",
      options: [
        { value: "substack", label: "Substack" },
        { value: "mailchimp", label: "Mailchimp" },
        { value: "sendgrid", label: "SendGrid" },
      ],
    },
  },
  field: {
    source: {
      id: "field-source",
      label: "Source",
      options: [
        { value: "poster", label: "Poster" },
        { value: "sticker", label: "Sticker" },
        { value: "aframe", label: "Aframe" },
        { value: "postcard", label: "Postcard" },
        { value: "handout", label: "Handout" },
        { value: "tablecloth", label: "Table cloth" },
      ],
    },
    campaignName: {
      id: "field-campaign-name",
      label: "Primary purpose",
      options: [
        { value: "lead_gen", label: "Lead generation" },
        { value: "fundraising", label: "Fundraising" },
        { value: "recruitment", label: "Recruitment" },
        { value: "voter_persuasion", label: "Voter Persuasion" },
      ],
    },
  },
  social: {
    source: {
      id: "social-source",
      label: "Source",
      options: [
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
        { value: "x", label: "X" },
        { value: "nextdoor", label: "Nextdoor" },
        { value: "bluesky", label: "Bluesky" },
      ],
    },
    campaignName: {
      id: "social-campaign-name",
      label: "Account name",
      options: [
        { value: "proanimaloregon", label: "Pro-Animal Oregon" },
        { value: "proanimaldc", label: "Pro-Animal DC" },
        { value: "proanimalcolorado", label: "Pro-Animal Colorado" },
        { value: "proanimalfuture", label: "Pro-Animal Future" },
        { value: "nattiefulton", label: "Natalie Fulton" },
      ],
    },
  },
};
