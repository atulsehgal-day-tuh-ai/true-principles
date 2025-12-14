import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
    // State for dynamic stats
    const [stats, setStats] = useState({
        totalUsers: 5420,
        liveDebates: 86,
        principlesApplied: 1024,
        p1Reading: 142,
        p1Debating: 18,
        p2Reading: 98,
        p2Debating: 42,
        p3Reading: 310,
        p3Debating: 67,
    });

    // State for tickers and quotes
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [tickerIndex, setTickerIndex] = useState(0);

    const quotes = [
        '"The best way to predict the future is to create it." - Gary D Kennedy',
        '"The only true wisdom is in knowing you know nothing." - Gary D Kennedy',
        '"The journey of a thousand miles begins with a single step." - Gary D Kennedy',
    ];

    const tickerItems = [
        '🔥 HOT TOPIC: User @DaveJ is challenging the definition of "Integrity"...',
        '💡 NEW SUBMISSION: "Compound Effect" proposed by @Sarah88...',
        '📈 TRENDING: "Leverage" has seen a 40% increase in adoption this week...',
    ];

    // Effect for randomizing stats
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => {
                const newStats = { ...prevStats };
                if (Math.random() > 0.5) {
                    newStats.totalUsers += 1;
                }
                
                const statKeys = ['p1Reading', 'p1Debating', 'p2Reading', 'p2Debating', 'p3Reading', 'p3Debating'];
                const randomKey = statKeys[Math.floor(Math.random() * statKeys.length)];
                
                if (Math.random() > 0.5) {
                    newStats[randomKey] += 1;
                } else {
                    newStats[randomKey] = Math.max(0, newStats[randomKey] - 1);
                }

                return newStats;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Effect for quote rotation
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(quoteInterval);
    }, [quotes.length]);

    // Effect for ticker rotation
    useEffect(() => {
        const tickerInterval = setInterval(() => {
            setTickerIndex(prevIndex => (prevIndex + 1) % tickerItems.length);
        }, 4000);
        return () => clearInterval(tickerInterval);
    }, [tickerItems.length]);

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
                    padding-bottom: 120px;
                }

                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 0;
                }

                .header {
                    width: 100%;
                    border-bottom: 1px solid var(--glass-border);
                    padding: 0;
                    background: rgba(0, 0, 0, 0.6);
                }

                .header .container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    padding: 15px 0;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    border: 1px solid var(--text-main);
                    padding: 5px 10px;
                    white-space: nowrap;
                }

                .nav {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .nav a {
                    text-decoration: none;
                    color: var(--text-main);
                    transition: color 0.3s;
                    font-size: 1rem;
                }

                .nav a:hover { color: var(--accent); }
                
                .cta-button {
                    border: 1px solid var(--accent);
                    padding: 8px 15px;
                    border-radius: 5px;
                    color: var(--accent);
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .cta-button:hover {
                    background: var(--accent);
                    color: var(--primary-color);
                }

                .neon-glass-btn {
                    background: rgba(0, 20, 40, 0.6);
                    backdrop-filter: blur(10px);
                    border: 2px solid var(--accent);
                    color: #ffffff;
                    font-weight: bold;
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
                    transition: all 0.3s ease;
                }

                .neon-glass-btn:hover {
                    background: var(--accent);
                    color: var(--primary-color);
                    box-shadow: 0 0 25px rgba(100, 255, 218, 0.8);
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .header .container { flex-direction: column; justify-content: center; }
                    .nav { margin-top: 15px; justify-content: center; }
                }

                .hero { text-align: center; padding: 80px 0; }
                .hero h1 { font-size: 3rem; margin-bottom: 20px; font-weight: 300; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
                .hero p { font-size: 1.2rem; margin-bottom: 30px; color: var(--text-muted); }
                
                .how-it-works { padding: 60px 0; text-align: center; }
                .how-it-works h2 { font-size: 2.5rem; margin-bottom: 40px; font-weight: 300; }
                .roles { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
                .role { flex: 1 1 300px; padding: 20px; background: var(--glass-bg); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .role h3 { color: var(--accent); }

                .featured-principles { padding: 60px 0; width: 100%; }
                .featured-principles h2 { text-align: center; font-size: 2.5rem; margin-bottom: 30px; font-weight: 300; }

                .dashboard-container {
                    background: var(--dark-panel);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 15px;
                }

                .stat-box h4 { font-size: 2rem; color: var(--accent); margin-bottom: 5px; font-weight: bold; }
                .stat-box p { font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

                .ticker-row {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 8px 15px;
                    border-radius: 5px;
                }
                .ticker-label {
                    background: var(--highlight); color: white;
                    padding: 2px 8px; border-radius: 3px; font-size: 0.8rem; font-weight: bold; margin-right: 15px;
                    white-space: nowrap;
                }
                .ticker-content {
                    font-style: italic; color: var(--text-main); width: 100%;
                    height: 20px; position: relative; overflow: hidden;
                }
                .ticker-item { position: absolute; width: 100%; opacity: 0; transition: opacity 0.5s ease-in-out; }
                .ticker-item.active { opacity: 1; }

                .principle-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

                .principle-card {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    padding: 0;
                    border-radius: 10px;
                    border: 1px solid var(--glass-border);
                    display: flex; flex-direction: column; overflow: hidden;
                }

                .card-header {
                    padding: 20px; background: rgba(0,0,0,0.2);
                    display: flex; justify-content: space-between; align-items: center;
                }
                .card-header h3 { margin: 0; font-size: 1.4rem; }
                
                .live-badge {
                    background: rgba(255, 107, 107, 0.2); color: var(--highlight);
                    border: 1px solid var(--highlight); padding: 2px 8px; border-radius: 12px;
                    font-size: 0.75rem; font-weight: bold; display: flex; align-items: center; gap: 6px;
                }
                .pulse-dot { width: 8px; height: 8px; background-color: var(--highlight); border-radius: 50%; display: inline-block; animation: pulse 1.5s infinite; }
                .card-body { padding: 20px; flex-grow: 1; }
                .card-footer {
                    padding: 15px 20px; background: rgba(0,0,0,0.2);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);
                }
                .stat-val { color: var(--accent); font-weight: bold; }

                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 107, 107, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
                }

                .neon-glass-banner {
                    background: rgba(0, 20, 40, 0.75);
                    backdrop-filter: blur(15px);
                    border-top: 2px solid var(--accent);
                    border-bottom: 2px solid var(--accent);
                    padding: 60px 0;
                    text-align: center;
                    width: 100%;
                    box-shadow: 0 0 30px rgba(100, 255, 218, 0.1);
                }
                
                .neon-glass-banner h2 {
                    color: #ffffff;
                    font-size: 2.5rem;
                    margin-bottom: 15px;
                }
                
                .neon-glass-banner p {
                    color: #ffffff;
                    font-size: 1.2rem;
                }

                .footer { text-align: center; padding: 20px 0; border-top: 1px solid var(--glass-border); font-size: 0.9rem; width: 100%; }

                .quote-banner {
                    width: 100%; overflow: hidden; position: fixed; bottom: 0; left: 0; height: 90px;
                    background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);
                    border-top: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center;
                }
                .quote-slide { position: absolute; width: 100%; opacity: 0; transition: opacity 1s; padding: 0 2rem; text-align: center; }
                .quote-slide.active { opacity: 1; }
                .quote-slide p { font-size: 1.4rem; font-style: italic; color: var(--text-muted); }
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

            <header className="header">
                <div className="container">
                    <div className="logo">Same Thing Only Different</div>
                    <nav className="nav">
                        <a href="#how-it-works">How It Works</a>
                        <a href="#featured">Principles</a>
                        <a href="#contribute">Contribute</a>
                        <a href="#">Login</a>
                        <a href="#" className="cta-button">Sign Up</a>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <h1>Find Your Guiding Principles</h1>
                    <p>From passive observation to active mastery. Become tangibly more proficient in life.</p>
                    <a href="#featured" className="neon-glass-btn">Discover a Principle</a>
                </div>
            </section>

            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2>The Path to Mastery</h2>
                    <div className="roles">
                        <div className="role">
                            <h3>The Seeker</h3>
                            <p>Read-only access to "Featured" or "Introductory" Principles and the "Principle of the Day."</p>
                        </div>
                        <div className="role">
                            <h3>The Learner</h3>
                            <p>Full read access, ability to save principles, rate content, and receive newsletters.</p>
                        </div>
                        <div className="role">
                            <h3>The Practitioner</h3>
                            <p>Access to application tools, worksheets, reflection journals, and challenge trackers.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="featured" className="featured-principles">
                <div className="container">
                    <h2>Featured Principles</h2>
                    
                    <div className="dashboard-container">
                        <div className="stats-row">
                            <div className="stat-box">
                                <h4>{stats.totalUsers.toLocaleString()}</h4>
                                <p>Active Architects</p>
                            </div>
                            <div className="stat-box">
                                <h4>{stats.liveDebates}</h4>
                                <p>Live Debates</p>
                            </div>
                            <div className="stat-box">
                                <h4>{stats.principlesApplied.toLocaleString()}</h4>
                                <p>Principles Applied Today</p>
                            </div>
                        </div>
                        
                        <div className="ticker-row">
                            <span className="ticker-label">LIVE FEED</span>
                            <div className="ticker-content">
                                {tickerItems.map((item, index) => (
                                    <div key={index} className={`ticker-item ${index === tickerIndex ? 'active' : ''}`}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="principle-grid">
                        <div className="principle-card">
                            <div className="card-header">
                                <h3>Integrity</h3>
                                <div className="live-badge"><span className="pulse-dot"></span> LIVE</div>
                            </div>
                            <div className="card-body">
                                <p>The quality of being honest and having strong moral principles.</p>
                            </div>
                            <div className="card-footer">
                                <span>Reading: <span className="stat-val">{stats.p1Reading}</span></span>
                                <span>Debating: <span className="stat-val">{stats.p1Debating}</span></span>
                            </div>
                        </div>
                        <div className="principle-card">
                            <div className="card-header">
                                <h3>Clarity</h3>
                                <div className="live-badge"><span className="pulse-dot"></span> LIVE</div>
                            </div>
                            <div className="card-body">
                                <p>The removal of ambiguity to reveal the true nature of a situation.</p>
                            </div>
                            <div className="card-footer">
                                <span>Reading: <span className="stat-val">{stats.p2Reading}</span></span>
                                <span>Debating: <span className="stat-val">{stats.p2Debating}</span></span>
                            </div>
                        </div>
                        <div className="principle-card">
                            <div className="card-header">
                                <h3>Leverage</h3>
                                <div className="live-badge"><span className="pulse-dot"></span> LIVE</div>
                            </div>
                            <div className="card-body">
                                <p>Using a small initial effort to achieve a much larger result.</p>
                            </div>
                            <div className="card-footer">
                                <span>Reading: <span className="stat-val">{stats.p3Reading}</span></span>
                                <span>Debating: <span className="stat-val">{stats.p3Debating}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="contribute" className="neon-glass-banner">
                <div className="container">
                    <h2>Become an Architect of Truth</h2>
                    <p>Don't just consume; synthesize. Submit new principles, refine definitions, or provide evidence.</p>
                    <br />
                    <a href="#" className="neon-glass-btn">Apply to be an Architect</a>
                </div>
            </section>

            <div className="quote-banner">
                {quotes.map((quote, index) => (
                    <div key={index} className={`quote-slide ${index === quoteIndex ? 'active' : ''}`}>{quote}</div>
                ))}
            </div>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2023 Same Thing Only Different. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}