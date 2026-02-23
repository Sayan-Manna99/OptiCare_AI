declare global {
  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;

  };


  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };
  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };
  type User = {
    id: string;
    email: string;
    name: string;
  };
  type SignUpFormData = {
    name: string;
    email: string;
    password: string;
  };
  type SignInFormData = {
    email: string;
    password: string;
  };
  type NavItem = {
    href: string;
    label: string;
  };
}
export { };
