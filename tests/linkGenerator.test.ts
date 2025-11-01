import { expect, test } from "@playwright/test";

import type { FormState } from "../src/ts/state/FormState";
import {
  escapeUtmValue,
  generateLink,
  addUtmString,
} from "../src/ts/result/linkGenerator";
import { NONE_OPTION } from "../src/ts/form/question";

test("addUtmString ignores None option", () => {
  const input = {
    medium: "email",
    campaign: undefined,
    id: NONE_OPTION.value,
    content: "some_content",
  };
  expect(addUtmString(new URL("https://foo.com?existing=1"), input)).toEqual(
    "https://foo.com/?existing=1&utm_medium=email&utm_content=some_content",
  );
});

test("escapeUtmValue()", () => {
  const assertEscaped = (input: string, expected: string) =>
    expect(escapeUtmValue(input)).toEqual(expected);

  // If it's already in the expected format, don't mess with it
  assertEscaped("value", "value");
  assertEscaped("value123", "value123");
  assertEscaped("value_123_abc", "value_123_abc");

  assertEscaped("Value", "value");
  assertEscaped("sOME    words123", "some_words_123");
  assertEscaped(
    "abc-xyz!? 'with' \"quotes---and@ALL",
    "abc_xyz_with_quotes_and_all",
  );
});

test.describe("generateLink()", () => {
  const DEFAULT_URL = "https://proanimal.org";

  /// A fully-formed FormState. Tests can then override individual options
  /// to be `undefined`.
  const DEFAULT: FormState = {
    url: DEFAULT_URL,
    medium: "email",
    email: {
      source: "mailchimp",
      campaignName: "proanimaloregon",
      id: "some_id",
      content: "some_content",
    },
    field: {
      source: "poster",
      campaignName: "lead_gen",
      id: "some_id",
      content: "some_content",
    },
    organicSocial: {
      source: "instagram",
      campaignName: "proanimaldc",
      id: "some_id",
      content: "some_content",
    },
    paidMail: {
      source: "my_vendor",
      campaignName: "lead_gen",
      id: "some_id",
      content: "some_content",
    },
    paidSocial: {
      source: "meta",
      campaignName: "lead_gen",
      id: "some_id",
      content: "some_content",
    },
    paidSms: {
      source: "scaletowin",
      campaignName: "lead_gen",
      id: "some_id",
      content: "some_content",
    },
  };

  test("URL", () => {
    expect(generateLink({ ...DEFAULT, url: undefined })).toEqual({
      success: false,
      errors: ["Missing URL"],
    });
    expect(
      generateLink({ ...DEFAULT, url: "https://proanimal.org a13b" }),
    ).toEqual({
      success: false,
      errors: ["Invalid URL. Make sure it starts with https://"],
    });
    expect(
      generateLink({ ...DEFAULT, url: "http://another-site.org?a=1" }),
    ).toEqual({
      success: false,
      errors: [
        "URL must start with https://, but was http://",
        "Domain name must be a PAF site or Stampede, but was another-site.org",
      ],
    });

    // Ensure we don't have false positives
    expect(
      generateLink({ ...DEFAULT, url: "https://proanimalnevada.org" }),
    ).toEqual({
      success: true,
      url: "https://proanimalnevada.org/?utm_medium=email&utm_source=mailchimp&utm_campaign=proanimaloregon&utm_id=some_id&utm_content=some_content",
    });
    expect(
      generateLink({
        ...DEFAULT,
        url: "https://stampede.proanimal.org/page#some-anchor",
      }),
    ).toEqual({
      success: true,
      url: "https://stampede.proanimal.org/page?utm_medium=email&utm_source=mailchimp&utm_campaign=proanimaloregon&utm_id=some_id&utm_content=some_content#some-anchor",
    });
  });

  test("missing medium", () => {
    expect(generateLink({ ...DEFAULT, medium: undefined })).toEqual({
      success: false,
      errors: ["Missing utm_medium"],
    });
  });

  test("email options", () => {
    const email: FormState = { ...DEFAULT, medium: "email" };
    expect(generateLink(email)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=email&utm_source=mailchimp&utm_campaign=proanimaloregon&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...email,
        email: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });

  test("field options", () => {
    const field: FormState = { ...DEFAULT, medium: "field" };
    expect(generateLink(field)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=field&utm_source=poster&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...field,
        field: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });

  test("organic social media options", () => {
    const social: FormState = { ...DEFAULT, medium: "organic_social" };
    expect(generateLink(social)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=organic_social&utm_source=instagram&utm_campaign=proanimaldc&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...social,
        organicSocial: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });

  test("paid mail options", () => {
    const mail: FormState = { ...DEFAULT, medium: "paid_mail" };
    expect(generateLink(mail)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=paid_mail&utm_source=my_vendor&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...mail,
        paidMail: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });

  test("paid social media options", () => {
    const social: FormState = { ...DEFAULT, medium: "paid_social" };
    expect(generateLink(social)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=paid_social&utm_source=meta&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...social,
        paidSocial: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });

  test("paid sms options", () => {
    const sms: FormState = { ...DEFAULT, medium: "paid_sms" };
    expect(generateLink(sms)).toEqual({
      success: true,
      url: `${DEFAULT_URL}/?utm_medium=paid_sms&utm_source=scaletowin&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...sms,
        paidSms: {
          source: undefined,
          campaignName: undefined,
          id: undefined,
          content: undefined,
        },
      }),
    ).toEqual({
      success: false,
      errors: [
        "Missing utm_source",
        "Missing utm_campaign",
        "Missing utm_id",
        "Missing utm_content",
      ],
    });
  });
});
