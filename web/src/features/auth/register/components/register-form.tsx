import { Button, Card, PasswordInput, Select, Text, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import paths from '../../../../config/paths';
import { RegisterRequest } from '../type';
import { useRegister } from '../api';

type RegisterFormProps = {
    onSuccess: () => void;
};
const roles = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
];
const registerSchema = yup
    .object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        role: yup
            .string()
            .required()
            .oneOf(roles.map((e) => e.value)),
        password: yup.string().required(),
    })
    .required();
function RegisterForm({ onSuccess }: RegisterFormProps) {
    const register = useRegister(onSuccess);
    const { control, handleSubmit } = useForm({ resolver: yupResolver(registerSchema) });
    const onSubmit: SubmitHandler<RegisterRequest> = (data) => register.mutate(data);
    return (
        <div className="mt-3 flex justify-center p-3">
            <Card withBorder shadow="sm" radius="md" className="w-full md:w-1/2 xl:w-1/3">
                <Card.Section withBorder py="xs" inheritPadding>
                    <Title order={5}>Register</Title>
                    <Text c="dimmed">Enter your details to register</Text>
                </Card.Section>
                <Card.Section inheritPadding pt="xs" pb="sm" className="space-y-2">
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: true }}
                        render={(props) => (
                            <Select
                                {...props.field}
                                error={props.fieldState.error?.message}
                                label="Role"
                                placeholder="Pick Role"
                                data={roles}
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={(props) => (
                            <TextInput
                                {...props.field}
                                error={props.fieldState.error?.message}
                                label="Name"
                                placeholder="Enter your Name"
                            />
                        )}
                    />
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
                        Already have an account?{' '}
                        <Text span c="blue">
                            <Link to={paths.auth.login.getHref()}>Login Here</Link>
                        </Text>
                    </Text>
                </Card.Section>
                <Card.Section inheritPadding py="sm" className="text-end">
                    <Button onClick={handleSubmit(onSubmit)}>Register</Button>
                </Card.Section>
            </Card>
        </div>
    );
}

export default RegisterForm;
