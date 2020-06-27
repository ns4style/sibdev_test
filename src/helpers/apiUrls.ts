const loginUrl = "/auth/login";
const schemasListUrl = "/form";

class ApiUrls {
    constructor(private baseUrl) {}

    public get loginUrl(): string {
        return this.baseUrl + loginUrl;
    }

    public get schemasListUrl(): string {
        return this.baseUrl + schemasListUrl;
    }
}

const apiUrls = new ApiUrls("http://localhost:8010/proxy");

export { apiUrls };
