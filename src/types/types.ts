export interface FormValidatorConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export interface CardData {
  name: string;
  link: string;
}

export type HandleCardClick = (name: string, link: string) => void;

export type RendererFunction<T> = (item: T) => void;

export interface SectionConfig<T> {
  items: T[];
  renderer: RendererFunction<T>;
}

export interface FormValues {
  [key: string]: string;
}

export type HandleFormSubmitFunction =( data: FormValues) => void;

export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface UserInfoData {
  name: string;
  job: string;
}