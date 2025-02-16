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
    },
    emailOptions: {},
    fieldOptions: {},
    socialOptions: {},
  };

  test("missing URL and type", () => {
    expect(generateLink({ ...DEFAULT, url: undefined })).toBeNull();
    expect(generateLink({ ...DEFAULT, type: undefined })).toBeNull();
  });

  test("ad options", () => {
    const ad: FormState = { ...DEFAULT, type: "ad" };
    expect(generateLink(ad)).toEqual(`${DEFAULT_URL}?utm_medium=paid_social`);
    expect(
      generateLink({ ...ad, adOptions: { medium: undefined } }),
    ).toBeNull();
  });

  test("email options", () => {
    const email: FormState = { ...DEFAULT, type: "email" };
    expect(generateLink(email)).toEqual(`${DEFAULT_URL}?utm_medium=email`);
  });

  test("field options", () => {
    const field: FormState = { ...DEFAULT, type: "field" };
    expect(generateLink(field)).toEqual(`${DEFAULT_URL}?utm_medium=field`);
  });

  test("social media options", () => {
    const social: FormState = { ...DEFAULT, type: "social" };
    expect(generateLink(social)).toEqual(
      `${DEFAULT_URL}?utm_medium=organic_social`,
    );
  });
});
