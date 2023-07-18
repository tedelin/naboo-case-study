type ValidationRule<T> = (value: T) => string | null;

export const emailValidation: ValidationRule<string> = (value) =>
  /^\S+@\S+$/.test(value) ? null : "Invalid email";

export const passwordValidation: ValidationRule<string> = (value) =>
  value ? null : "Password required";

export const firstNameValidation: ValidationRule<string> = (value) =>
  value ? null : "FirstName required";

export const lastNameValidation: ValidationRule<string> = (value) =>
  value ? null : "LastName required";
