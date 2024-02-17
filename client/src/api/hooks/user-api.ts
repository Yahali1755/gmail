import { UserViewModel, TypeName } from "@mail/common";

import { useApi } from "./base-api";

export const useUserApi = () => useApi<UserViewModel>(TypeName.User)