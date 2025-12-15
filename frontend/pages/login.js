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
                    --text-muted: #e0e0e0;
                    --accent: #64ffda;
                    --highlight: #ff6b6b;
                    --dark-panel: rgba(0, 0, 0, 0.6);
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
                
                .form-container {
                    width: 100%;
                    max-width: 400px;
                    margin: 0;
                    padding: 40px;
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .form-container h1 {
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 2rem;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: var(--text-muted);
                }

                .form-group input, .form-group select {
                    width: 100%;
                    padding: 12px;
                    border-radius: 5px;
                    border: 1px solid var(--glass-border);
                    background: rgba(0, 0, 0, 0.3);
                    color: var(--text-main);
                    font-size: 1rem;
                }

                .form-group input:focus, .form-group select:focus {
                    outline: none;
                    border-color: var(--accent);
                }

                .submit-btn {
                    width: 100%;
                    padding: 15px;
                    border-radius: 5px;
                    border: none;
                    background: var(--accent);
                    color: var(--primary-color);
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .submit-btn:hover {
                    background: #ffffff;
                    box-shadow: 0 0 15px rgba(100, 255, 218, 0.8);
                }
                
                .auth-link {
                    margin-top: 20px;
                    font-size: 0.9rem;
                    text-align: center;
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

            <div className="form-container">
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" name="role" required>
                            <option value="seeker">Seeker</option>
                            <option value="learner">Learner</option>
                            <option value="practitioner">Practitioner</option>
                            <option value="architect">Architect</option>
                            <option value="curator">Curator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
                <p className="auth-link" style={{ marginTop: '10px' }}>
                    <a href="/">Go back to landing page</a>
                </p>
            </div>
        </>
    );
}
