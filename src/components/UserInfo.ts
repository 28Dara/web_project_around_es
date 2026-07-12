import type { UserInfoSelectors, UserInfoData } from "../types/types.js";

export class UserInfo {
    private nameElement: HTMLElement;
    private jobElement: HTMLElement;

    constructor({nameSelector, jobSelector}: UserInfoSelectors) {
        this.nameElement = document.querySelector(nameSelector) as HTMLElement;
        this.jobElement = document.querySelector(jobSelector) as HTMLElement;
    }

    getUserInfo(): UserInfoData {
        return {
            name: this.nameElement.textContent || "",
            job: this.jobElement.textContent || "",
        };
    }

    setUserInfo({name, job}: UserInfoData): void {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
    }
}