import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { login } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector(state => state.auth.error);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (error) {
            message.error(error); 
        }
    }, [error]);
    const handleLogin = () => {
        dispatch(login({ login: username, password }));
    };

    return (
        
            <Card title="Вход в систему" style={{ width: 300 }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
   
    );
};

export default Login;