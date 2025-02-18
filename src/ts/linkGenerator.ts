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
      campaignName = state.adOptions.campaignName;
      if (!medium) {
        // TODO: dry the question name in config
        errors.push(`Missing "Medium"`);
      }
      break;
    case "email":
      medium = "email";
      source = state.emailOptions.source;
      break;
    case "field":
      medium = "field";
      source = state.fieldOptions.source;
      campaignName = state.fieldOptions.campaignName;
      break;
    case "social":
      medium = "organic_social";
      source = state.socialOptions.source;
      campaignName = state.socialOptions.campaignName;
      break;
    default:
      errors.push("Missing communication type");
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
