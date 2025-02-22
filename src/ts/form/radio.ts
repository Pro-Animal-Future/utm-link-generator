export interface RadioOption {
  value: string;
  description?: string;
}

export interface RadioGroup {
  id: string;
  label: string;
  options: readonly RadioOption[];
}

export function generateRadioGroup(request: RadioGroup): HTMLFieldSetElement {
  const fieldSet = document.createElement("fieldset");
  fieldSet.id = request.id;
  fieldSet.classList.add("radio-fieldset");

  const legend = document.createElement("legend");
  legend.textContent = request.label;
  legend.classList.add("radio-legend");
  fieldSet.appendChild(legend);

  request.options.forEach((option) => {
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("radio-option-container");
    fieldSet.appendChild(radioDiv);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = request.id;
    input.value = option.value;
    input.id = `${request.id}-${option.value}`;
    input.classList.add("radio-input");
    radioDiv.appendChild(input);

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.classList.add("radio-label");
    const labelText = document.createTextNode(option.value);
    label.appendChild(labelText);
    if (option.description) {
      const description = document.createElement("span");
      description.textContent = option.description;
      description.classList.add("radio-description");
      label.appendChild(description);
    }

    radioDiv.appendChild(label);
  });

  return fieldSet;
}
