import { AxiosResponseTransformer } from "axios";

export const transformResponse: AxiosResponseTransformer = (response, responseHeaders) => {
    const contentType = responseHeaders.getContentType();

    if (contentType && contentType.includes('application/json')) {
        return JSON.parse(response);
    }

    return JSON.parse(response);
}