export interface FormValidatorConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
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

export type HandleFormSubmitFunction = (data: FormValues) => void;

export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

export interface UserInfoData {
  name: string;
  job: string;
  avatar: string;
}

export interface ApiConfig {
  baseUrl: string;
  headers: {
    authorization: string;
    'Content-Type': string;
  };
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface UserProfileFormData {
  name: string;
  about: string;
}

export interface CardFormData {
  name: string;
  link: string;
}

export type CardPreview = CardFormData;

export type HandleCardDelete = (
  cardId: string,
  cardElement: HTMLElement
) => void;

export type HandleCardLike = (
  cardId: string,
  isLiked: boolean
) => Promise<boolean>;

export interface AvatarFormData {
  avatar: string;
}
