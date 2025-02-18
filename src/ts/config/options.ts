export const OPTIONS = {
  communicationType: [
    { value: "ad", label: "Advertisement" },
    { value: "email", label: "Email" },
    { value: "field", label: "Field" },
    { value: "social", label: "Organic social media" },
  ],
  ad: {
    medium: [
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
};
