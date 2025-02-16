export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroup {
  id: string;
  label: string;
  options: Array<RadioOption>;
}

export function generateRadioGroup(request: RadioGroup): HTMLFieldSetElement {
  const fieldSet = document.createElement("fieldset");
  fieldSet.id = request.id;

  request.options.forEach((option) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = request.id;
    input.value = option.value;
    input.id = `${request.id}-${option.value}`;

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = option.label;

    fieldSet.appendChild(input);
    fieldSet.appendChild(label);
  });

  return fieldSet;
}
