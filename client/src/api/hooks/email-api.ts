import { EmailViewModel, TypeName } from "@mail/common";

import { useApi } from "./base-api";

export const useEmailApi = () => useApi<EmailViewModel>(TypeName.Email);