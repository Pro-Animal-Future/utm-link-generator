import { OPTIONS } from "../config/options";
import { Medium, FormState } from "../state/FormState";
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
  label.textContent = "PAF URL";
  label.htmlFor = "url-input";
  container.appendChild(label);

  const input = document.createElement("input");
  input.type = "url";
  input.id = "url-input";
  input.required = true;
  container.appendChild(input);

  input.addEventListener(
    "input",
    updateFormState(formState)((value) => ({ url: value.trim() })),
  );
}

function initMediumQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initRadioGroup(form, formState, OPTIONS.medium, (value) => ({
    medium: value as Medium,
  }));
}

function initMediumQuestionsDiv(
  form: HTMLFormElement,
  formState: Observable<FormState>,
  medium: Medium,
): HTMLDivElement {
  const container = document.createElement("div");
  container.id = `${medium}-options`;
  container.hidden = true;
  form.appendChild(container);

  formState.subscribe(({ medium: type }) => {
    container.hidden = type !== medium;
  });
  return container;
}

function initEmailOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "email");

  initRadioGroup(
    container,
    formState,
    OPTIONS.email.source,
    (value, priorState) => ({
      email: { ...priorState.email, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.email.campaignName,
    (value, priorState) => ({
      email: { ...priorState.email, campaignName: value },
    }),
  );
}

function initFieldOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "field");

  initRadioGroup(
    container,
    formState,
    OPTIONS.field.source,
    (value, priorState) => ({
      field: { ...priorState.field, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.field.campaignName,
    (value, priorState) => ({
      field: { ...priorState.field, campaignName: value },
    }),
  );
}

function initOrganicSocialOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "organic_social");

  initRadioGroup(
    container,
    formState,
    OPTIONS.organicSocial.source,
    (value, priorState) => ({
      organicSocial: {
        ...priorState.organicSocial,
        source: value,
      },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.organicSocial.campaignName,
    (value, priorState) => ({
      organicSocial: {
        ...priorState.organicSocial,
        campaignName: value,
      },
    }),
  );
}

function initPaidMailOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_mail");

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidMail.campaignName,
    (value, priorState) => ({
      paidMail: { ...priorState.paidMail, campaignName: value },
    }),
  );
}

function initPaidSearchOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_search");

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSearch.source,
    (value, priorState) => ({
      paidSearch: { ...priorState.paidSearch, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSearch.campaignName,
    (value, priorState) => ({
      paidSearch: { ...priorState.paidSearch, campaignName: value },
    }),
  );
}

function initPaidSocialOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_social");

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSocial.source,
    (value, priorState) => ({
      paidSocial: { ...priorState.paidSocial, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSocial.campaignName,
    (value, priorState) => ({
      paidSocial: { ...priorState.paidSocial, campaignName: value },
    }),
  );
}

function initPaidSmsOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_sms");

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSms.source,
    (value, priorState) => ({
      paidSms: { ...priorState.paidSms, source: value },
    }),
  );

  initRadioGroup(
    container,
    formState,
    OPTIONS.paidSms.campaignName,
    (value, priorState) => ({
      paidSms: { ...priorState.paidSms, campaignName: value },
    }),
  );
}

export function initForm(formState: Observable<FormState>): void {
  const form = document.getElementById("utm-form") as HTMLFormElement;
  initUrl(form, formState);
  initMediumQuestion(form, formState);
  initEmailOptions(form, formState);
  initFieldOptions(form, formState);
  initOrganicSocialOptions(form, formState);
  initPaidMailOptions(form, formState);
  initPaidSearchOptions(form, formState);
  initPaidSocialOptions(form, formState);
  initPaidSmsOptions(form, formState);
}
