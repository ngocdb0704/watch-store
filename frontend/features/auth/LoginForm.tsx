import { useDispatch } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormValues, loginSchema } from "@/schemas/login.schema";
import { Controller, useForm } from "react-hook-form";
import { LoginPayload } from "@/types/auth.type";
import { useLogin } from "@/hooks/use-login";
import { setCredential } from "@/store/authSlice";
import { Button, Form, Input, notification } from "antd";
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const loginMutation = useLogin();
    const [notificationApi, contextHolder] = notification.useNotification();
    const { control, handleSubmit } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (payload: LoginPayload) => {
        try {
            const response = await loginMutation.mutateAsync(payload);
            dispatch(setCredential({
                accessToken: response.data!.accessToken,
                userInfo: response.data!.userInfo,
            }));
            const role = response.data?.userInfo.role.code;
            notificationApi.success({
                title: 'Login success!',
                duration: 1,
                placement: 'topRight',
            });

            if (role === 'ADMIN') {
                navigate.push("/administrator");
            } else {
                navigate.push("user");
            }
        } catch (error: any) {
            notificationApi.error({
                title: 'Login failed!',
                description: `${error}`,
                duration: 1,
                placement: 'topRight',
            });
        }
    }

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={fieldState.error ? 'error' : ''}
                            help={fieldState.error?.message}>
                            <Input {...field} placeholder="Username" />
                        </Form.Item>
                    )} />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={fieldState.error ? 'error' : ''}
                            help={fieldState.error?.message}>
                            <Input {...field} placeholder="Password" />
                        </Form.Item>
                    )} />
                <Button type="primary" htmlType="submit">Login</Button>
            </Form>
        </>
    );
};