export interface RadioOption {
  value: string;
  description?: string;
  textInput?: boolean;
}

interface BaseQuestion {
  id: string;
  label: string;
  description?: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio";
  options: readonly RadioOption[];
  optional?: boolean;
}

export interface FreeformQuestion extends BaseQuestion {
  type: "freeform";
  isUrl?: boolean;
}

export type Question = RadioQuestion | FreeformQuestion;

export const NONE_OPTION: RadioOption = { value: "Skip this parameter" };

function setLabelAndDescription(
  element: HTMLLegendElement | HTMLLabelElement,
  label: string,
  descriptionHtmlId: string,
  description: string | undefined,
): void {
  const textNode = document.createTextNode(label);
  element.appendChild(textNode);

  if (!description) return;
  const span = document.createElement("span");
  span.textContent = description;
  span.classList.add(descriptionHtmlId);
  element.appendChild(span);
}

function setToTextInput(input: HTMLInputElement): void {
  input.type = "text";
  input.setAttribute("autocapitalize", "none");
  input.autocomplete = "off";
  input.spellcheck = false;
}

function generateRadioTextInput(
  radioInput: HTMLInputElement,
): HTMLInputElement {
  const textInput = document.createElement("input");
  setToTextInput(textInput);
  textInput.classList.add("radio-text-input");
  textInput.id = `${radioInput.id}-text`;
  textInput.name = textInput.id;
  textInput.setAttribute("aria-labelledby", radioInput.id);

  textInput.addEventListener("input", () => {
    radioInput.checked = true;
  });

  radioInput.addEventListener("change", () => {
    if (radioInput.checked) {
      textInput.focus();
    }
  });

  return textInput;
}

function generateRadioOption(
  outerId: string,
  option: RadioOption,
): HTMLDivElement {
  const radioDiv = document.createElement("div");
  radioDiv.classList.add("radio-option-container");

  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = outerId;
  radioInput.value = option.value;
  radioInput.id = `${outerId}-${option.value}`;
  radioInput.classList.add("radio-input");
  radioDiv.appendChild(radioInput);

  const label = document.createElement("label");
  label.htmlFor = radioInput.id;
  label.classList.add("radio-label");
  setLabelAndDescription(
    label,
    option.value,
    "radio-option-description",
    option.description,
  );
  radioDiv.appendChild(label);

  if (option.textInput) {
    const textInput = generateRadioTextInput(radioInput);
    radioDiv.appendChild(textInput);
  }

  return radioDiv;
}

export function generateRadioQuestion(
  request: RadioQuestion,
): HTMLFieldSetElement {
  const fieldSet = document.createElement("fieldset");
  fieldSet.id = request.id;
  fieldSet.classList.add("radio-fieldset");

  const legend = document.createElement("legend");
  legend.classList.add("radio-legend");
  setLabelAndDescription(
    legend,
    request.label,
    "radio-legend-description",
    request.description,
  );
  fieldSet.appendChild(legend);

  const allOptions = request.optional
    ? [NONE_OPTION, ...request.options]
    : request.options;
  allOptions.forEach((option) => {
    const radioDiv = generateRadioOption(request.id, option);
    fieldSet.appendChild(radioDiv);
  });

  return fieldSet;
}

export function generateFreeformQuestion(
  request: FreeformQuestion,
): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("freeform-container");

  const label = document.createElement("label");
  label.htmlFor = request.id;
  label.classList.add("freeform-label");
  setLabelAndDescription(
    label,
    request.label,
    "freeform-description",
    request.description,
  );
  container.appendChild(label);

  const input = document.createElement("input");
  if (request.isUrl) {
    input.type = "url";
  } else {
    setToTextInput(input);
  }
  input.id = request.id;
  input.required = true;
  container.appendChild(input);

  return container;
}
