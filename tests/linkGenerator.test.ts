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

  test("missing URL and type", () => {
    expect(generateLink({ ...DEFAULT, url: undefined })).toBeNull();
    expect(generateLink({ ...DEFAULT, type: undefined })).toBeNull();
  });

  test("ad options", () => {
    const ad: FormState = { ...DEFAULT, type: "ad" };
    expect(generateLink(ad)).toEqual(
      `${DEFAULT_URL}?utm_medium=paid_social&utm_campaign=lead_gen`,
    );
    expect(
      generateLink({
        ...ad,
        adOptions: { ...DEFAULT.adOptions, medium: undefined },
      }),
    ).toBeNull();
  });

  test("email options", () => {
    const email: FormState = { ...DEFAULT, type: "email" };
    expect(generateLink(email)).toEqual(
      `${DEFAULT_URL}?utm_medium=email&utm_source=mailchimp`,
    );
  });

  test("field options", () => {
    const field: FormState = { ...DEFAULT, type: "field" };
    expect(generateLink(field)).toEqual(
      `${DEFAULT_URL}?utm_medium=field&utm_source=poster&utm_campaign=lead_gen`,
    );
  });

  test("social media options", () => {
    const social: FormState = { ...DEFAULT, type: "social" };
    expect(generateLink(social)).toEqual(
      `${DEFAULT_URL}?utm_medium=organic_social&utm_source=instagram&utm_campaign=proanimaldc`,
    );
  });
});
