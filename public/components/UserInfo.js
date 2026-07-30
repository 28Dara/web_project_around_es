export class UserInfo {
    nameElement;
    jobElement;
    avatarElement;
    constructor({ nameSelector, jobSelector, avatarSelector, }) {
        this.nameElement = document.querySelector(nameSelector);
        this.jobElement = document.querySelector(jobSelector);
        this.avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || '',
            job: this.jobElement.textContent || '',
            avatar: this.avatarElement.src,
        };
    }
    setUserInfo({ name, job, avatar }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
        this.avatarElement.src = avatar;
    }
}
