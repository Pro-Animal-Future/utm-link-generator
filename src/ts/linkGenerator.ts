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

export function generateLink(state: FormState): string | null {
  if (!state.url || !state.type) return null;
  let medium: string | undefined;
  let source: string | undefined;
  let campaignName: string | undefined;
  switch (state.type) {
    case "ad":
      medium = state.adOptions.medium;
      campaignName = state.adOptions.campaignName;
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
      throw new Error(`Unexpected type: ${state.type}`);
  }

  if (!medium) return null;
  const queryParam = generateUtmString({
    medium,
    source,
    campaign: campaignName,
  });
  return `${state.url}${queryParam}`;
}

export function subscribeLinkGenerator(formState: Observable<FormState>): void {
  const element = document.getElementById(
    "generated-link",
  ) as HTMLParagraphElement;
  formState.subscribe((state) => {
    const link = generateLink(state) ?? "Cannot generate link";
    element.textContent = link;
  });
}
