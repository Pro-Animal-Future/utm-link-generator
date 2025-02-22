import {
  CAMPAIGN_NAME_LABEL,
  MEDIUM_LABEL,
  SOURCE_LABEL,
} from "./config/options";
import { FormState } from "./state/FormState";
import Observable from "./state/Observable";

function generateUtmString(
  paramMap: Record<string, string | undefined>,
): string {
  const params = Object.entries(paramMap)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `utm_${key}=${encodeURIComponent(value!)}`);
  return params.length > 0 ? `?${params.join("&")}` : "";
}

type Result =
  | { success: true; url: string }
  | { success: false; errors: string[] };

function validateUrl(url: string | undefined): Result {
  if (!url) {
    return { success: false, errors: ["Missing URL"] };
  } else {
    if (!url.startsWith("https://")) {
      return { success: false, errors: ["URL must start with https://"] };
    }
    try {
      new URL(url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return { success: false, errors: ["Invalid URL"] };
    }
  }
  return { success: true, url: url };
}

export function generateLink(state: FormState): Result {
  const errors: string[] = [];

  const urlResult = validateUrl(state.url);
  if (!urlResult.success) {
    errors.push(...urlResult.errors);
  }

  let source: string | undefined;
  let campaignName: string | undefined;
  switch (state.medium) {
    case undefined:
      errors.push(`Missing "${MEDIUM_LABEL}"`);
      break;
    case "email":
      source = state.email.source;
      campaignName = state.email.campaignName;
      break;
    case "field":
      source = state.field.source;
      campaignName = state.field.campaignName;
      break;
    case "organic_social":
      source = state.organicSocial.source;
      campaignName = state.organicSocial.campaignName;
      break;
    case "paid_mail":
      source = state.paidMail.source;
      campaignName = state.paidMail.campaignName;
      break;
    case "paid_search":
      source = state.paidSearch.source;
      campaignName = state.paidSearch.campaignName;
      break;
    case "paid_social":
      source = state.paidSocial.source;
      campaignName = state.paidSocial.campaignName;
      break;
    case "paid_sms":
      source = state.paidSms.source;
      campaignName = state.paidSms.campaignName;
      break;
    default:
      errors.push(
        `Unrecognized "${MEDIUM_LABEL}", meaning a programming bug: ${state.medium}`,
      );
  }

  // Check for required fields.
  if (state.medium) {
    if (!source && state.medium !== "paid_mail") {
      errors.push(`Missing "${SOURCE_LABEL}"`);
    }
    if (!campaignName) errors.push(`Missing "${CAMPAIGN_NAME_LABEL}"`);
  }

  const queryParam = generateUtmString({
    medium: state.medium,
    source,
    campaign: campaignName,
  });
  return errors.length
    ? { success: false, errors }
    : { success: true, url: `${state.url}${queryParam}` };
}

function generateSuccess(url: string): HTMLElement[] {
  const p = document.createElement("p");
  p.textContent = url;
  return [p];
}

function generateErrors(errors: string[]): HTMLElement[] {
  const p = document.createElement("p");
  p.textContent = "Cannot generate link:";

  const ul = document.createElement("ul");
  errors.forEach((err) => {
    const li = document.createElement("li");
    li.textContent = err;
    ul.appendChild(li);
  });
  return [p, ul];
}

export function subscribeLinkGenerator(formState: Observable<FormState>): void {
  const container = document.getElementById(
    "result-container",
  ) as HTMLDivElement;
  formState.subscribe((state) => {
    const result = generateLink(state);
    if (result.success) {
      container.replaceChildren(...generateSuccess(result.url));
    } else {
      container.replaceChildren(...generateErrors(result.errors));
    }
  });
}
