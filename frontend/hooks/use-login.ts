import { loginApi } from "@/api/auth.api"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
    return useMutation({
        mutationFn: loginApi,
    });
};