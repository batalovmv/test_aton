import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        dispatch(login({ login: username, password }));
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default Login;