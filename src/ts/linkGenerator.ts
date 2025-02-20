import { OPTIONS } from "./config/options";
import { AdOptions, FormState } from "./state/FormState";
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

function determineAdSource(adOptions: AdOptions): string | undefined {
  switch (adOptions.medium) {
    case undefined:
      return undefined;
    case "paid_mail":
      return "mailer";
    case "paid_sms":
      return "scaletowin";
    case "paid_tv":
      return "tv";
    case "paid_social":
      return adOptions.source.social;
    case "paid_search":
      return adOptions.source.search;
    case "paid_ooh":
      return adOptions.source.outOfHome;
    default:
      throw new Error(`Unexpected medium "${adOptions.medium}"`);
  }
}

export function generateLink(state: FormState): Result {
  const errors: string[] = [];

  const urlResult = validateUrl(state.url);
  if (!urlResult.success) {
    errors.push(...urlResult.errors);
  }

  let medium: string | undefined;
  let source: string | undefined;
  let campaignName: string | undefined;
  switch (state.type) {
    case "ad":
      medium = state.adOptions.medium;
      if (!medium) {
        errors.push(`Missing "${OPTIONS.ad.medium.label}"`);
      }
      source = determineAdSource(state.adOptions);
      if (medium && !source) {
        errors.push(`Missing "${OPTIONS.ad.source.search.label}"`);
      }
      campaignName = state.adOptions.campaignName;
      if (!campaignName) {
        errors.push(`Missing "${OPTIONS.ad.campaignName.label}"`);
      }
      break;
    case "email":
      medium = "email";
      source = state.emailOptions.source;
      if (!source) {
        errors.push(`Missing "${OPTIONS.email.source.label}"`);
      }
      break;
    case "field":
      medium = "field";
      source = state.fieldOptions.source;
      if (!source) {
        errors.push(`Missing "${OPTIONS.field.source.label}"`);
      }
      campaignName = state.fieldOptions.campaignName;
      if (!campaignName) {
        errors.push(`Missing "${OPTIONS.field.campaignName.label}"`);
      }
      break;
    case "social":
      medium = "organic_social";
      source = state.socialOptions.source;
      if (!source) {
        errors.push(`Missing "${OPTIONS.social.source.label}"`);
      }
      campaignName = state.socialOptions.campaignName;
      if (!campaignName) {
        errors.push(`Missing "${OPTIONS.social.campaignName.label}"`);
      }
      break;
    default:
      errors.push(`Missing "${OPTIONS.communicationType.label}"`);
  }

  const queryParam = generateUtmString({
    medium,
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
