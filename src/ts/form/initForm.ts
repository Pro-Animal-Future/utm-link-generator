import { QUESTIONS } from "../config/questions";
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

function initUrlQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initFreeformQuestion(form, formState, QUESTIONS.url, (value) => ({
    url: value?.trim(),
  }));
}

function initMediumQuestion(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  initRadioQuestion(form, formState, QUESTIONS.medium, (value) => ({
    medium: value as Medium,
  }));
}

function initEmailQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "email");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.email.source,
    (value, priorState) => ({
      email: { ...priorState.email, source: value },
    }),
  );

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.email.campaignName,
    (value, priorState) => ({
      email: { ...priorState.email, campaignName: value },
    }),
  );
}

function initFieldQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "field");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.field.source,
    (value, priorState) => ({
      field: { ...priorState.field, source: value },
    }),
  );

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.field.campaignName,
    (value, priorState) => ({
      field: { ...priorState.field, campaignName: value },
    }),
  );
}

function initOrganicSocialQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "organic_social");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.organicSocial.source,
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
    QUESTIONS.organicSocial.campaignName,
    (value, priorState) => ({
      organicSocial: {
        ...priorState.organicSocial,
        campaignName: value,
      },
    }),
  );
}

function initPaidMailQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_mail");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidMail.campaignName,
    (value, priorState) => ({
      paidMail: { ...priorState.paidMail, campaignName: value },
    }),
  );
}

function initPaidSearchQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_search");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSearch.source,
    (value, priorState) => ({
      paidSearch: { ...priorState.paidSearch, source: value },
    }),
  );

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSearch.campaignName,
    (value, priorState) => ({
      paidSearch: { ...priorState.paidSearch, campaignName: value },
    }),
  );
}

function initPaidSocialQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_social");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSocial.source,
    (value, priorState) => ({
      paidSocial: { ...priorState.paidSocial, source: value },
    }),
  );

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSocial.campaignName,
    (value, priorState) => ({
      paidSocial: { ...priorState.paidSocial, campaignName: value },
    }),
  );
}

function initPaidSmsQuestions(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const container = initMediumQuestionsDiv(form, formState, "paid_sms");

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSms.source,
    (value, priorState) => ({
      paidSms: { ...priorState.paidSms, source: value },
    }),
  );

  initRadioQuestion(
    container,
    formState,
    QUESTIONS.paidSms.campaignName,
    (value, priorState) => ({
      paidSms: { ...priorState.paidSms, campaignName: value },
    }),
  );
}

export function initForm(formState: Observable<FormState>): void {
  const form = document.getElementById("utm-form") as HTMLFormElement;
  initUrlQuestion(form, formState);
  initMediumQuestion(form, formState);
  initEmailQuestions(form, formState);
  initFieldQuestions(form, formState);
  initOrganicSocialQuestions(form, formState);
  initPaidMailQuestions(form, formState);
  initPaidSearchQuestions(form, formState);
  initPaidSocialQuestions(form, formState);
  initPaidSmsQuestions(form, formState);
}
