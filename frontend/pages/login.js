
import React from 'react';
import Image from 'next/image';

export default function Login() {
    return (
        <>
            <style jsx global>{`
                :root {
                    --glass-bg: rgba(255, 255, 255, 0.15);
                    --glass-border: rgba(255, 255, 255, 0.3);
                    --text-main: #ffffff;
                    --accent: #64ffda;
                    --primary-color: #2c3e50;
                }

                * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }

                body {
                    color: var(--text-main);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .auth-container {
                    width: 90%;
                    max-width: 400px;
                    padding: 40px;
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .auth-container h1 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                    font-weight: 300;
                }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    text-align: left;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 0.9rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 10px;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--glass-border);
                    border-radius: 5px;
                    color: var(--text-main);
                    font-size: 1rem;
                }

                .auth-button {
                    background: var(--accent);
                    color: var(--primary-color);
                    border: none;
                    padding: 15px;
                    border-radius: 5px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .auth-button:hover {
                    box-shadow: 0 0 15px rgba(100, 255, 218, 0.8);
                }

                .auth-link {
                    margin-top: 20px;
                    font-size: 0.9rem;
                }

                .auth-link a {
                    color: var(--accent);
                    text-decoration: none;
                }
            `}</style>
            
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', zIndex: -1 }}>
                <Image
                    alt="Background Image"
                    src="/index.png"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>

            <div className="auth-container">
                <h1>Login</h1>
                <form className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-link">
                    <a href="#">Forgot Password?</a>
                </p>
                <p className="auth-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </>
    );
}
