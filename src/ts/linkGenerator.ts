import { OPTIONS } from "./config/options";
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

export function generateLink(state: FormState): Result {
  const errors: string[] = [];
  if (!state.url) {
    errors.push("Missing URL");
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

export function subscribeLinkGenerator(formState: Observable<FormState>): void {
  const element = document.getElementById(
    "generated-link",
  ) as HTMLParagraphElement;
  formState.subscribe((state) => {
    const result = generateLink(state);
    element.textContent = result.success ? result.url : "Cannot generate link";
  });
}
