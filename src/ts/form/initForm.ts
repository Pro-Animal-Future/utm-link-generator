import { OPTIONS } from "../config/options";
import { CommunicationType, FormState } from "../state/FormState";
import Observable from "../state/Observable";
import { generateRadioGroup, RadioGroup } from "./radio";

type UpdateFormStateFunction = (
  value: string,
  priorState: FormState,
) => Partial<FormState>;

const updateFormState =
  (formState: Observable<FormState>) =>
  (updateFn: UpdateFormStateFunction) =>
  (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const priorState = formState.getValue();
    formState.setValue({
      ...priorState,
      ...updateFn(e.target.value, priorState),
    });
  };

function initRadioGroup(
  parent: HTMLElement,
  formState: Observable<FormState>,
  request: RadioGroup,
  updateFn: UpdateFormStateFunction,
  hideFn?: (state: FormState) => boolean,
): void {
  const group = generateRadioGroup(request);
  group.addEventListener("change", updateFormState(formState)(updateFn));
  parent.appendChild(group);

  if (hideFn) {
    formState.subscribe((state) => {
      const isHidden = hideFn(state);
      group.hidden = isHidden;
    });
  }
}

function initUrl(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = document.createElement("div");
  container.classList.add("url-container");
  form.appendChild(container);

  const label = document.createElement("label");
  label.textContent = "Your URL";
  label.htmlFor = "url-input";
  container.appendChild(label);

  const input = document.createElement("input");
  input.type = "url";
  input.id = "url-input";
  input.required = true;
  container.appendChild(input);

  input.addEventListener(
    "change",
    updateFormState(formState)((value) => ({ url: value.trim() })),
  );
}

function initCommunicationTypeQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initRadioGroup(form, formState, OPTIONS.communicationType, (value) => ({
    type: value as CommunicationType,
  }));
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

  initRadioGroup(
    container,
    formState,
    OPTIONS.ad.medium,
    (value, priorState) => ({
      adOptions: { ...priorState.adOptions, medium: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.ad.source.search,
    (value, priorState) => ({
      adOptions: {
        ...priorState.adOptions,
        source: { ...priorState.adOptions.source, search: value },
      },
    }),
    (state) => state.adOptions.medium !== "paid_search",
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.ad.source.social,
    (value, priorState) => ({
      adOptions: {
        ...priorState.adOptions,
        source: { ...priorState.adOptions.source, social: value },
      },
    }),
    (state) => state.adOptions.medium !== "paid_social",
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.ad.source.outOfHome,
    (value, priorState) => ({
      adOptions: {
        ...priorState.adOptions,
        source: { ...priorState.adOptions.source, outOfHome: value },
      },
    }),
    (state) => state.adOptions.medium !== "paid_ooh",
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.ad.campaignName,
    (value, priorState) => ({
      adOptions: { ...priorState.adOptions, campaignName: value },
    }),
  );
}

function initEmailOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initCommunicationTypeDiv(form, formState, "email");

  initRadioGroup(
    container,
    formState,

    OPTIONS.email.source,
    (value, priorState) => ({
      emailOptions: { ...priorState.emailOptions, source: value },
    }),
  );
}

function initFieldOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initCommunicationTypeDiv(form, formState, "field");

  initRadioGroup(
    container,
    formState,

    OPTIONS.field.source,
    (value, priorState) => ({
      fieldOptions: { ...priorState.fieldOptions, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,

    OPTIONS.field.campaignName,
    (value, priorState) => ({
      fieldOptions: { ...priorState.fieldOptions, campaignName: value },
    }),
  );
}

function initSocialOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initCommunicationTypeDiv(form, formState, "social");

  initRadioGroup(
    container,
    formState,

    OPTIONS.social.source,
    (value, priorState) => ({
      socialOptions: { ...priorState.socialOptions, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,

    OPTIONS.social.campaignName,
    (value, priorState) => ({
      socialOptions: { ...priorState.socialOptions, campaignName: value },
    }),
  );
}

export function initForm(formState: Observable<FormState>): void {
  const form = document.getElementById("utm-form") as HTMLFormElement;
  initUrl(form, formState);
  initCommunicationTypeQuestion(form, formState);
  initAdOptions(form, formState);
  initEmailOptions(form, formState);
  initFieldOptions(form, formState);
  initSocialOptions(form, formState);
}
