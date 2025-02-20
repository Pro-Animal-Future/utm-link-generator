import { expect, test } from "@playwright/test";

import type { FormState } from "../src/ts/state/FormState";
import { generateLink } from "../src/ts/linkGenerator";

test.describe("generateLink()", () => {
  const DEFAULT_URL = "https://proanimal.org";

  /// A fully-formed FormState. Tests can then override individual options
  /// to be `undefined`.
  const DEFAULT: FormState = {
    url: DEFAULT_URL,
    type: "email",
    adOptions: {
      medium: "paid_social",
      source: {
        social: "meta",
        search: undefined,
        outOfHome: undefined,
      },
      campaignName: "lead_gen",
    },
    emailOptions: {
      source: "mailchimp",
    },
    fieldOptions: {
      source: "poster",
      campaignName: "lead_gen",
    },
    socialOptions: {
      source: "instagram",
      campaignName: "proanimaldc",
    },
  };

  test("URL", () => {
    expect(generateLink({ ...DEFAULT, url: undefined })).toEqual({
      success: false,
      errors: ["Missing URL"],
    });
    expect(generateLink({ ...DEFAULT, url: "proanimal.org" })).toEqual({
      success: false,
      errors: ["URL must start with https://"],
    });
    expect(
      generateLink({ ...DEFAULT, url: "https://proanimal.org a13b" }),
    ).toEqual({
      success: false,
      errors: ["Invalid URL"],
    });
  });

  test("missing communication type", () => {
    expect(generateLink({ ...DEFAULT, type: undefined })).toEqual({
      success: false,
      errors: ['Missing "Communication type"'],
    });
  });

  test("ad options", () => {
    const ad: FormState = { ...DEFAULT, type: "ad" };
    expect(generateLink(ad)).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=paid_social&utm_source=meta&utm_campaign=lead_gen`,
    });

    expect(
      generateLink({
        ...ad,
        adOptions: {
          medium: undefined,
          source: {
            search: undefined,
            social: undefined,
            outOfHome: undefined,
          },
          campaignName: undefined,
        },
      }),
    ).toEqual({
      success: false,
      // Note that we don't complain about `source` because it depends on the medium.
      errors: ['Missing "Medium"', 'Missing "Primary purpose"'],
    });

    /// Once the `medium` is set, we expect `source` to also be set.
    expect(
      generateLink({
        ...ad,
        adOptions: {
          ...ad.adOptions,
          source: {
            social: undefined,
            search: undefined,
            outOfHome: undefined,
          },
        },
      }),
    ).toEqual({
      success: false,
      errors: ['Missing "Source"'],
    });

    // Certain mediums imply the `source`.
    expect(
      generateLink({
        ...ad,
        adOptions: { ...ad.adOptions, medium: "paid_tv" },
      }),
    ).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=paid_tv&utm_source=tv&utm_campaign=lead_gen`,
    });
  });

  test("email options", () => {
    const email: FormState = { ...DEFAULT, type: "email" };
    expect(generateLink(email)).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=email&utm_source=mailchimp`,
    });

    expect(
      generateLink({
        ...email,
        emailOptions: { source: undefined },
      }),
    ).toEqual({
      success: false,
      errors: ['Missing "Source"'],
    });
  });

  test("field options", () => {
    const field: FormState = { ...DEFAULT, type: "field" };
    expect(generateLink(field)).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=field&utm_source=poster&utm_campaign=lead_gen`,
    });

    expect(
      generateLink({
        ...field,
        fieldOptions: { source: undefined, campaignName: undefined },
      }),
    ).toEqual({
      success: false,
      errors: ['Missing "Source"', 'Missing "Primary purpose"'],
    });
  });

  test("social media options", () => {
    const social: FormState = { ...DEFAULT, type: "social" };
    expect(generateLink(social)).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=organic_social&utm_source=instagram&utm_campaign=proanimaldc`,
    });

    expect(
      generateLink({
        ...social,
        socialOptions: { source: undefined, campaignName: undefined },
      }),
    ).toEqual({
      success: false,
      errors: ['Missing "Source"', 'Missing "Account name"'],
    });
  });
});
