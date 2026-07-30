import type { UserInfoSelectors, UserInfoData } from '../types/types.js';

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;
  private avatarElement: HTMLImageElement;

  constructor({
    nameSelector,
    jobSelector,
    avatarSelector,
  }: UserInfoSelectors) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.jobElement = document.querySelector(jobSelector) as HTMLElement;
    this.avatarElement = document.querySelector(
      avatarSelector
    ) as HTMLImageElement;
  }

  getUserInfo(): UserInfoData {
    return {
      name: this.nameElement.textContent || '',
      job: this.jobElement.textContent || '',
      avatar: this.avatarElement.src,
    };
  }

  setUserInfo({ name, job, avatar }: UserInfoData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
    this.avatarElement.src = avatar;
  }
}
