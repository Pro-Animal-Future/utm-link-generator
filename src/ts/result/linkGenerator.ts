import {
  CAMPAIGN_NAME_LABEL,
  CONTENT_LABEL,
  ID_LABEL,
  MEDIUM_LABEL,
  SOURCE_LABEL,
} from "../config/questions";
import type { FormState } from "../state/FormState";
import { NONE_OPTION } from "../form/question";

export function generateUtmString(
  paramMap: Record<string, string | undefined>,
): string {
  const params = Object.entries(paramMap)
    .filter(([, value]) => value !== undefined && value !== NONE_OPTION.value)
    .map(([key, value]) => `utm_${key}=${encodeURIComponent(value!)}`);
  return params.length > 0 ? `?${params.join("&")}` : "";
}

type Result =
  | { success: true; url: string }
  | { success: false; errors: string[] };

function validateUrl(url: string | undefined): Result {
  if (!url) {
    return { success: false, errors: ["Missing URL"] };
  }

  let parsed;
  try {
    parsed = new URL(url);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return {
      success: false,
      errors: ["Invalid URL. Make sure it starts with https://"],
    };
  }

  const errors = [];
  if (parsed.protocol !== "https:") {
    errors.push(`URL must start with https://, but was ${parsed.protocol}//`);
  }
  if (
    !parsed.hostname.includes("proanimal") ||
    !parsed.hostname.endsWith(".org")
  ) {
    errors.push(
      `Domain name must be a PAF site or Stampede, but was ${parsed.hostname}`,
    );
  }
  if (parsed.search || parsed.href.endsWith("?")) {
    errors.push(
      "URL should not already have search parameters (the text starting with '?' " +
        "at the end of the URL)",
    );
  }

  return errors.length ? { success: false, errors } : { success: true, url };
}

export function generateLink(state: FormState): Result {
  const errors: string[] = [];

  const urlResult = validateUrl(state.url);
  if (!urlResult.success) {
    errors.push(...urlResult.errors);
  }

  if (!state.medium) {
    errors.push(`Missing ${MEDIUM_LABEL}`);
    return { success: false, errors };
  }

  const options = {
    email: state.email,
    field: state.field,
    organic_social: state.organicSocial,
    paid_mail: state.paidMail,
    paid_social: state.paidSocial,
    paid_sms: state.paidSms,
  }[state.medium];

  // Check for required fields.
  if (!options.source) errors.push(`Missing ${SOURCE_LABEL}`);
  if (!options.campaignName) errors.push(`Missing ${CAMPAIGN_NAME_LABEL}`);
  if (!options.id) errors.push(`Missing ${ID_LABEL}`);
  if (!options.content) errors.push(`Missing ${CONTENT_LABEL}`);

  const queryParam = generateUtmString({
    medium: state.medium,
    source: options.source,
    campaign: options.campaignName,
    id: options.id,
    content: options.content,
  });
  return errors.length
    ? { success: false, errors }
    : { success: true, url: `${state.url}${queryParam}` };
}
