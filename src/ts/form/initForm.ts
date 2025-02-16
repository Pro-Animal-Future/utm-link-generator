import { CommunicationType, FormState } from "../state/FormState";
import Observable from "../state/Observable";
import { generateRadioGroup } from "./radio";

function initCommunicationTypeQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const fieldSet = generateRadioGroup({
    id: "communication-type",
    label: "Communication type",
    options: [
      { value: "ad", label: "Advertisement" },
      { value: "email", label: "Email" },
      { value: "field", label: "Field" },
      { value: "social", label: "Organic social media" },
    ],
  });
  form.appendChild(fieldSet);
  fieldSet.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    formState.setValue({
      ...formState.getValue(),
      type: e.target.value as CommunicationType,
    });
  });
}

function initCommunicationTypeDiv(
  form: HTMLFormElement,
  formState: Observable<FormState>,
  communicationType: CommunicationType,
): HTMLDivElement {
  const container = document.createElement("div");
  container.id = `${communicationType}-options`;
  container.hidden = true;
  form.appendChild(container);

  formState.subscribe(({ type }) => {
    container.hidden = type !== communicationType;
  });
  return container;
}

function initAdOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initCommunicationTypeDiv(form, formState, "ad");

  const medium = generateRadioGroup({
    id: "ad-medium",
    label: "Medium",
    options: [
      { value: "paid_social", label: "Social media ads (Meta, Reddit, etc)" },
      { value: "paid_search", label: "Search ads (Google, Bing, etc)" },
      {
        value: "paid_ooh",
        label: "Out-of-home ads (billboards, transit ads, bus shelters",
      },
      { value: "paid_sms", label: "Text blasts (Scale to Win)" },
      { value: "paid_mail", label: "Mass-mailed voter mailers" },
      { value: "paid_tv", label: "TV commercials" },
    ],
  });
  container.appendChild(medium);
  medium.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const priorState = formState.getValue();
    formState.setValue({
      ...priorState,
      adOptions: { ...priorState.adOptions, medium: e.target.value },
    });
  });
}

function initEmailOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initCommunicationTypeDiv(form, formState, "email");
}

function initFieldOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initCommunicationTypeDiv(form, formState, "field");
}

function initSocialOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initCommunicationTypeDiv(form, formState, "social");
}

export function initForm(formState: Observable<FormState>): void {
  const form = document.getElementById("utm-form") as HTMLFormElement;
  initCommunicationTypeQuestion(form, formState);
  initAdOptions(form, formState);
  initEmailOptions(form, formState);
  initFieldOptions(form, formState);
  initSocialOptions(form, formState);
}
