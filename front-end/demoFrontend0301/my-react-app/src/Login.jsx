import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 建議把樣式分離寫這個檔案

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:9060/member/loginCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/home");
        } else {
            alert("登入失敗，請檢查帳號或密碼");
        }
    };

    const generate = () => {
        fetch("http://localhost:9060/member/generate")
            .then(response => {
                if (response.ok) {
                    alert("資料已產生！");
                } else {
                    alert("產生失敗！");
                }
            })
            .catch(error => {
                console.error("發生錯誤：", error);
                alert("伺服器錯誤");
            });
    };


    return (
        <div id="login-container">
            <div id="title">
                <h3><i className="fa-solid fa-piggy-bank" onClick={generate}></i>登入</h3>
            </div>

            <div className="container">
                <span>*帳號</span>
                <input type="text" placeholder="輸入帳號" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="container">
                <span>*密碼</span>
                <input type="password" placeholder="輸入密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="container">
                <button className="login-button" onClick={handleLogin}>
                    <i className="fas fa-sign-in-alt"></i> 登入
                </button>
            </div>
        </div>
    );
};

export default Login;
