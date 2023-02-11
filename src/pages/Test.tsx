import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

function Test() {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      errors.name = "Name is required";
    }

    if (!formData.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Submit form data
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p>{formErrors.email}</p>}
      </div>
      <button type="submit">test</button>
    </form>
  );
}

export default Test;
