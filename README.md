# Web Master Intern Phase 3 Task 3 (Long Dynamic Form | Evil Manager)

Building a Dynamic Form contains more than 10 inputs and also you can add more to render dynamically with some validations like (minLength, maxLength, minValue, maxValue, required, pattern to handle a regex).

## How Code Works

- From the `fields` array that is contains all inputs with validations as an object, react renders the inputs with `map()` function applied over it.

- The `validateFields` function takes `value` of field, and `rules` which is field object and check the rules of each one, and return validation results as text based on the conditions also return `null` if the validation is `true`.

- The `handleSubmit` function extract `formData` from the form and pass it to `validateFields` function to get validation results and store it with `errors` object.

- in `handleSubmit` function, i am using `newErrors` object and pass it to `errors` state because the state will not applied in `handleSubmit` function for this render, so `newErrors` will prevent the form to submit in this render.

- If no validation errors, form submitted successfully and print the `formData`.

## Check out the preview

You Can Check out the [demo ↗️](https://typescript-eslint.io).
