import { expect, test } from "@playwright/test";

import type { FormState } from "../src/ts/state/FormState";
import { generateLink, generateUtmString } from "../src/ts/linkGenerator";
import { NONE_OPTION } from "../src/ts/form/question";

test("generateUtmString ignores None option", () => {
  const input = {
    medium: "email",
    campaign: undefined,
    id: NONE_OPTION.value,
    content: "some_content",
  };
  expect(generateUtmString(input)).toEqual(
    "?utm_medium=email&utm_content=some_content",
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
    paidSearch: {
      source: "google",
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
      url: `${DEFAULT_URL}?utm_medium=email&utm_source=mailchimp&utm_campaign=proanimaloregon&utm_id=some_id&utm_content=some_content`,
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
      url: `${DEFAULT_URL}?utm_medium=field&utm_source=poster&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
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
      url: `${DEFAULT_URL}?utm_medium=organic_social&utm_source=instagram&utm_campaign=proanimaldc&utm_id=some_id&utm_content=some_content`,
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
      url: `${DEFAULT_URL}?utm_medium=paid_mail&utm_source=my_vendor&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
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

  test("paid search options", () => {
    const search: FormState = { ...DEFAULT, medium: "paid_search" };
    expect(generateLink(search)).toEqual({
      success: true,
      url: `${DEFAULT_URL}?utm_medium=paid_search&utm_source=google&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
    });

    expect(
      generateLink({
        ...search,
        paidSearch: {
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
      url: `${DEFAULT_URL}?utm_medium=paid_social&utm_source=meta&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
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
      url: `${DEFAULT_URL}?utm_medium=paid_sms&utm_source=scaletowin&utm_campaign=lead_gen&utm_id=some_id&utm_content=some_content`,
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
