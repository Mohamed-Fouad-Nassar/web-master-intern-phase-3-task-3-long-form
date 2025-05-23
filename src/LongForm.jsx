import { useState } from "react";

export default function LongForm() {
  const [errors, setErrors] = useState({});

  const fields = [
    {
      id: "firstName",
      name: "firstName",
      label: "First Name",
      required: true,
      placeholder: "From 3 - 20 characters",
      minLength: 3,
      maxLength: 20,
    },
    {
      id: "lastName",
      name: "lastName",
      label: "Last Name",
      required: true,
      placeholder: "From 3 - 20 characters",
      minLength: 3,
      maxLength: 20,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "test@example.com",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "From 6 - 18 characters",
      minLength: 6,
      maxLength: 18,
    },
    {
      id: "country",
      name: "country",
      label: "Country",
      required: true,
      placeholder: "e.g: Egypt",
      minLength: 3,
      maxLength: 20,
    },
    {
      id: "city",
      name: "city",
      label: "City",
      required: true,
      placeholder: "e.g: Cairo",
      minLength: 3,
      maxLength: 20,
    },
    {
      id: "street",
      name: "street",
      label: "Street",
      minLength: 3,
      maxLength: 100,
    },
    {
      id: "buildingNum",
      name: "buildingNum",
      label: "Building Number",
      minLength: 3,
      maxLength: 40,
    },
    {
      id: "zipCode",
      name: "zipCode",
      label: "Zip Code",
      required: false,
    },
    {
      id: "age",
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      placeholder: "18+",
      min: 18,
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      placeholder: "01XXXXXXXXX",
      pattern: {
        value: /^(010|011|012|015)[0-9]{8}$/,
        message: "Invalid Egyptian Phone Number",
      },
    },
    {
      id: "altPhone",
      name: "altPhone",
      label: "Alt Phone",
      type: "tel",
      required: false,
      placeholder: "01XXXXXXXXX",
      pattern: {
        value: /^(010|011|012|015)[0-9]{8}$/,
        message: "Invalid Egyptian Phone Number",
      },
    },
    {
      id: "bio",
      name: "bio",
      label: "Bio",
      minLength: 20,
      maxLength: 400,
    },
    {
      id: "avatar",
      name: "avatar",
      label: "Avatar",
      type: "file",
      required: false,
    },

    // you can add more fields with this structure...
  ];

  function validateField(value, rules) {
    // skip all non required fields validation if no value provided
    if (!rules?.required && value.length === 0) return null;

    if (rules?.required && value.length === 0)
      return `${rules.label} is required`;

    if (rules?.minLength && value.length < rules?.minLength)
      return `${rules.label} must be at least ${rules.minLength} characters`;

    if (rules?.maxLength && value.length > rules?.maxLength)
      return `${rules.label} must be at most ${rules.maxLength} characters`;

    if (rules?.pattern && !rules?.pattern?.value.test(value))
      return rules?.pattern?.message;

    if (rules?.type === "number") {
      const num = Number(value);

      if (rules?.min && num < rules.min)
        return `${rules.label} must be more than ${rules.min}`;

      if (rules?.max && num > rules.max)
        return `${rules.label} must be less than ${rules.max}`;
    }

    // no validation errors
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const newErrors = fields.reduce((acc, field) => {
      const error = validateField(data[field?.name], field);
      if (error !== null) acc[field?.name] = error;
      return acc;
    }, {});
    setErrors(newErrors);

    if (!Object.keys(newErrors)?.length) {
      alert("Form submitted successfully!");
      console.log("Form Submitted: ", data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-row" key={field?.id}>
          <label htmlFor={field?.id}>
            {field?.label}
            {field?.required && <span className="required">*</span>}
          </label>

          <input
            id={field?.id}
            name={field?.name}
            type={field?.type || "text"}
            placeholder={field?.placeholder}
          />
          <span className="error">{errors[field?.name]}</span>
        </div>
      ))}

      <div className="buttons">
        <button type="reset" onClick={() => setErrors({})}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
