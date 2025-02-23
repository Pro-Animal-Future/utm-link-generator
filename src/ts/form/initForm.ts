import { OPTIONS } from "../config/options";
import { Medium, FormState } from "../state/FormState";
import Observable from "../state/Observable";
import {
  FreeformQuestion,
  generateFreeformQuestion,
  generateRadioQuestion,
  RadioQuestion,
} from "./question";

// ------------------------------------------------------------
// Generic helpers
// ------------------------------------------------------------

type UpdateFormStateFunction = (
  value: string | undefined,
  priorState: FormState,
) => Partial<FormState>;

const updateFormState =
  (formState: Observable<FormState>) =>
  (updateFn: UpdateFormStateFunction) =>
  (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    // Normally, we update with the direct value of the input field.
    //
    // However, radio buttons with text input are tricky that we
    // need to instead always use the text input. For example, if you
    // click a radio button with a text input, we should use
    // the value from its text input rather than from the radio button itself.
    let value = e.target.value || undefined;
    if (e.target.type === "radio" && e.target.checked) {
      const textInput =
        e.target.parentElement?.querySelector(".radio-text-input");
      if (textInput instanceof HTMLInputElement) {
        value = textInput.value || undefined;
      }
    }

    const priorState = formState.getValue();
    formState.setValue({
      ...priorState,
      ...updateFn(value, priorState),
    });
  };

function initRadioQuestion(
  parent: HTMLElement,
  formState: Observable<FormState>,
  request: RadioQuestion,
  updateFn: UpdateFormStateFunction,
): void {
  const group = generateRadioQuestion(request);
  parent.appendChild(group);

  // We use 'input' rather than 'change' for better responsiveness with
  // radio options with text input.
  group.addEventListener("input", updateFormState(formState)(updateFn));
}

function initFreeformQuestion(
  parent: HTMLElement,
  formState: Observable<FormState>,
  request: FreeformQuestion,
  updateFn: UpdateFormStateFunction,
): void {
  const div = generateFreeformQuestion(request);
  parent.appendChild(div);
  div.addEventListener("input", updateFormState(formState)(updateFn));
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

// ------------------------------------------------------------
// Specific questions
// ------------------------------------------------------------

function initUrl(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initFreeformQuestion(form, formState, OPTIONS.url, (value) => ({
    url: value?.trim(),
  }));
}

function initMediumQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initRadioQuestion(form, formState, OPTIONS.medium, (value) => ({
    medium: value as Medium,
  }));
}

function initEmailOptions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "email");

  initRadioQuestion(
    container,
    formState,
    OPTIONS.email.source,
    (value, priorState) => ({
      email: { ...priorState.email, source: value },
    }),
  );

  initRadioQuestion(
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

  initRadioQuestion(
    container,
    formState,
    OPTIONS.field.source,
    (value, priorState) => ({
      field: { ...priorState.field, source: value },
    }),
  );

  initRadioQuestion(
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

  initRadioQuestion(
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

  initRadioQuestion(
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

  initRadioQuestion(
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

  initRadioQuestion(
    container,
    formState,
    OPTIONS.paidSearch.source,
    (value, priorState) => ({
      paidSearch: { ...priorState.paidSearch, source: value },
    }),
  );

  initRadioQuestion(
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

  initRadioQuestion(
    container,
    formState,
    OPTIONS.paidSocial.source,
    (value, priorState) => ({
      paidSocial: { ...priorState.paidSocial, source: value },
    }),
  );

  initRadioQuestion(
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

  initRadioQuestion(
    container,
    formState,
    OPTIONS.paidSms.source,
    (value, priorState) => ({
      paidSms: { ...priorState.paidSms, source: value },
    }),
  );

  initRadioQuestion(
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
