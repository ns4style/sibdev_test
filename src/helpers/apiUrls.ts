const loginUrl = "/auth/login";

class ApiUrls {
    constructor(private baseUrl) {}

    public get loginUrl(): string {
        return this.baseUrl + loginUrl;
    }
}

const apiUrls = new ApiUrls("http://localhost:8010/proxy");

export { apiUrls };
