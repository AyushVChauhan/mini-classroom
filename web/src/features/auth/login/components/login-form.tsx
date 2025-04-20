import { Button, Card, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router';
import paths from '../../../../config/paths';
import { useLogin } from '../api';
import { LoginRequest, LoginResponse } from '../type';

type LoginFormProps = {
    onSuccess: (data: LoginResponse['data']) => void;
};
const loginSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();
function LoginForm({ onSuccess }: LoginFormProps) {
    const loginMutation = useLogin(onSuccess);
    const { control, handleSubmit } = useForm({ resolver: yupResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginRequest> = (data) => loginMutation.mutate(data);
    return (
        <div className="mt-3 flex justify-center p-3">
            <Card withBorder shadow="sm" radius="md" className="w-full md:w-1/2 xl:w-1/3">
                <Card.Section withBorder py="xs" inheritPadding>
                    <Title order={5}>Sign In</Title>
                    <Text c="dimmed">Enter your details to sign in</Text>
                </Card.Section>
                <Card.Section inheritPadding pt="xs" pb="sm" className="space-y-2">
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={(props) => (
                            <TextInput
                                {...props.field}
                                error={props.fieldState.error?.message}
                                label="Email"
                                placeholder="Enter your Email"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={(props) => (
                            <PasswordInput
                                {...props.field}
                                error={props.fieldState.error?.message}
                                label="Password"
                                placeholder="Enter your Password"
                            />
                        )}
                    />
                </Card.Section>
                <Card.Section inheritPadding>
                    <Text className="text-center">
                        Dont have an account?{' '}
                        <Text span c="blue">
                            <Link to={paths.auth.register.getHref()}>Register Here</Link>
                        </Text>
                    </Text>
                </Card.Section>
                <Card.Section inheritPadding py="sm" className="text-end">
                    <Button onClick={handleSubmit(onSubmit)}>Sign In</Button>
                </Card.Section>
            </Card>
        </div>
    );
}

export default LoginForm;
