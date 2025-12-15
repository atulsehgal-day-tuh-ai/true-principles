import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// --- 1. SAFE SUPABASE SETUP ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey) 
    ? createClient(supabaseUrl, supabaseKey) 
    : null;

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    // State for showing messages on screen
    const [message, setMessage] = useState(null); 
    const [messageType, setMessageType] = useState('info'); 

    useEffect(() => setMounted(true), []);

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => setMessage(null), 8000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- 2. STANDARD EMAIL SIGNUP ---
    const handleSignUp = async (e, role) => {
        e.preventDefault(); 
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const fullName = formData.get('fullName');
        const phone = formData.get('phone'); // Capture phone number

        if (!supabase) {
            showMessage("System Error: Database connection missing.", 'error');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        role: role,
                        full_name: fullName,
                        phone_number: phone
                    }
                }
            });

            if (error) throw error;

            if (data.user && data.user.identities && data.user.identities.length === 0) {
                showMessage("⚠️ This email is already registered. Please Login instead.", 'error');
            } else {
                showMessage(`✅ Success! Verification email sent to ${email}.`, 'success');
            }
            
        } catch (error) {
            if (error.message.includes("already registered") || error.message.includes("unique constraint")) {
                showMessage("⚠️ Account Exists: This email is already being used. Please Log In.", 'error');
            } else if (error.message.includes("Password")) {
                showMessage("🔒 Security: Password is too weak. Please use at least 6 characters.", 'error');
            } else {
                showMessage(`❌ Error: ${error.message}`, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    // --- 3. GOOGLE SIGNUP HANDLER ---
    const handleGoogleSignUp = async (role) => {
        if (!supabase) return;
        setLoading(true);
        
        // Save the intended role so we can assign it after they return from Google
        localStorage.setItem('intended_role', role);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`, // Or just window.location.origin
                    queryParams: {
                        role_preference: role 
                    }
                }
            });
            if (error) throw error;
        } catch (error) {
            showMessage(`❌ Google Login Error: ${error.message}`, 'error');
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Background Image */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
                <Image alt="Background" src="/mountain.png" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
            </div>

            <style jsx global>{`
                :root { 
                    --glass-bg: rgba(255, 255, 255, 0.15); 
                    --glass-border: rgba(255, 255, 255, 0.3); 
                    --text-main: #ffffff; 
                    --accent: #64ffda; 
                    --error: #ff6b6b; 
                    --success: #2ecc71; 
                    --card-bg: rgba(0, 0, 0, 0.6); 
                }
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
                body { color: var(--text-main); min-height: 100vh; display: flex; flex-direction: column; padding: 40px 0; }
            `}</style>
            
            <style jsx>{`
                .container { width: 95%; max-width: 1600px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
                h1 { font-size: 2.8rem; font-weight: 300; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
                
                /* NOTIFICATION BANNER */
                .notification {
                    padding: 15px;
                    border-radius: 8px;
                    margin: 0 auto 30px auto;
                    max-width: 600px;
                    font-weight: bold;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                }
                .notification.success { background: rgba(46, 204, 113, 0.2); border: 1px solid var(--success); color: var(--success); }
                .notification.error { background: rgba(255, 107, 107, 0.2); border: 1px solid var(--error); color: var(--error); }

                /* GRID LAYOUT */
                .paths-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                @media (min-width: 768px) { .paths-grid { grid-template-columns: 1fr 1fr; } }
                @media (min-width: 1200px) { .paths-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }

                .role-card { 
                    background: var(--card-bg); 
                    backdrop-filter: blur(15px); 
                    border: 1px solid var(--glass-border); 
                    border-radius: 12px; 
                    padding: 30px; 
                    display: flex; 
                    flex-direction: column; 
                    text-align: center; 
                    height: 100%; 
                    transition: transform 0.3s ease; 
                }
                .role-card:hover { transform: translateY(-5px); border-color: var(--accent); }
                
                h2 { color: var(--accent); font-size: 1.6rem; margin-bottom: 5px; }
                .user-intent { font-style: italic; color: #e0e0e0; margin-bottom: 20px; font-size: 0.9rem; min-height: 30px; }
                .features { margin-bottom: 25px; text-align: left; flex-grow: 1; font-size: 0.9rem; }
                .features ul { padding-left: 20px; }
                
                .role-input { width: 100%; padding: 10px; margin-bottom: 10px; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--glass-border); border-radius: 5px; color: white; }
                .role-input:focus { border-color: var(--accent); outline: none; }
                
                /* BUTTONS */
                .role-button { background: var(--accent); color: #000000; border: none; padding: 12px; border-radius: 5px; font-size: 1rem; font-weight: 800; cursor: pointer; width: 100%; margin-top: 10px; transition: all 0.2s; }
                .role-button:hover { box-shadow: 0 0 15px rgba(100, 255, 218, 0.5); transform: scale(1.02); }
                .role-button:disabled { opacity: 0.7; cursor: wait; }
                
                /* GOOGLE BUTTON STYLES */
                .google-btn {
                    margin-top: 10px;
                    background: white;
                    color: #333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-weight: 600;
                    border: none;
                }
                .google-btn:hover { background: #f1f1f1; transform: scale(1.02); }
                
                .divider { margin: 15px 0; font-size: 0.8rem; color: #aaa; display: flex; align-items: center; justify-content: center; gap: 10px; }
                .divider::before, .divider::after { content: ""; height: 1px; background: rgba(255,255,255,0.2); flex-grow: 1; }

                /* FOOTER GLASS BOX */
                .footer-glass {
                    margin-top: 40px;
                    display: inline-block;
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    padding: 20px 40px;
                    border-radius: 50px;
                    border: 1px solid var(--glass-border);
                }
                .auth-link { margin: 5px 0; font-size: 1rem; }
                .auth-link a { color: var(--accent); text-decoration: none; font-weight: bold; }
                .auth-link a:hover { text-decoration: underline; }
            `}</style>

            <div className="container">
                <h1>Choose Your Path</h1>

                {/* MESSAGE BANNER */}
                {message && (
                    <div className={`notification ${messageType}`}>
                        {message}
                    </div>
                )}

                <div className="paths-grid">
                    {/* 1. SEEKER */}
                    <div className="role-card">
                        <h2>The Seeker</h2>
                        <p className="user-intent">"I want to explore."</p>
                        <div className="features"><p><strong>Incentive:</strong> Get 50 Fast Start Credits.</p></div>
                        <form onSubmit={(e) => handleSignUp(e, 'seeker')}>
                            <input name="fullName" className="role-input" type="text" placeholder="Full Name" required />
                            <input name="email" className="role-input" type="email" placeholder="Email Address" required />
                            <input name="password" className="role-input" type="password" placeholder="Create Password" required />
                            <input name="phone" className="role-input" type="tel" placeholder="Phone Number" />
                            <button type="submit" className="role-button" disabled={loading}>Sign Up (Free)</button>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={() => handleGoogleSignUp('seeker')} className="role-button google-btn" type="button">
                            <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="G" />
                            Sign up with Google
                        </button>
                    </div>

                    {/* 2. LEARNER */}
                    <div className="role-card">
                        <h2>The Learner</h2>
                        <p className="user-intent">"I want to track patterns."</p>
                        <div className="features"><ul><li>Save principles</li><li>Intelligent Search</li></ul></div>
                        <form onSubmit={(e) => handleSignUp(e, 'learner')}>
                            <input name="fullName" className="role-input" type="text" placeholder="Full Name" required />
                            <input name="email" className="role-input" type="email" placeholder="Email" required />
                            <input name="password" className="role-input" type="password" placeholder="Password" required />
                            <input name="phone" className="role-input" type="tel" placeholder="Phone Number" />
                            <button type="submit" className="role-button" disabled={loading}>Sign Up (Tier 1)</button>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={() => handleGoogleSignUp('learner')} className="role-button google-btn" type="button">
                            <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="G" />
                            Sign up with Google
                        </button>
                    </div>

                    {/* 3. PRACTITIONER */}
                    <div className="role-card">
                        <h2>The Practitioner</h2>
                        <p className="user-intent">"I want to apply truths."</p>
                        <div className="features"><ul><li>Unlock Tools</li><li>Create Forums</li></ul></div>
                        <form onSubmit={(e) => handleSignUp(e, 'practitioner')}>
                            <input name="fullName" className="role-input" type="text" placeholder="Full Name" required />
                            <input name="email" className="role-input" type="email" placeholder="Email" required />
                            <input name="password" className="role-input" type="password" placeholder="Password" required />
                            <input name="phone" className="role-input" type="tel" placeholder="Phone Number" />
                            <button type="submit" className="role-button" disabled={loading}>Sign Up (Tier 2)</button>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={() => handleGoogleSignUp('practitioner')} className="role-button google-btn" type="button">
                            <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="G" />
                            Sign up with Google
                        </button>
                    </div>

                    {/* 4. ARCHITECT */}
                    <div className="role-card">
                        <h2>The Architect</h2>
                        <p className="user-intent">"I want to build the library."</p>
                        <div className="features"><p>Submit principles and earn royalties.</p></div>
                        <form onSubmit={(e) => handleSignUp(e, 'architect')}>
                            <input name="fullName" className="role-input" type="text" placeholder="Full Name" required />
                            <input name="email" className="role-input" type="email" placeholder="Email" required />
                            <input name="password" className="role-input" type="password" placeholder="Password" required />
                            <input name="phone" className="role-input" type="tel" placeholder="Phone Number" />
                            <button type="submit" className="role-button" disabled={loading}>Apply to Contribute</button>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={() => handleGoogleSignUp('architect')} className="role-button google-btn" type="button">
                            <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="G" />
                            Sign up with Google
                        </button>
                    </div>
                </div>

                {/* FOOTER GLASS PILL */}
                <div className="footer-glass">
                    <p className="auth-link">Already have an account? <Link href="/login" legacyBehavior><a>Login Here</a></Link></p>
                    <p className="auth-link"><Link href="/" legacyBehavior><a>Back to Home</a></Link></p>
                </div>

            </div>
        </>
    );
}