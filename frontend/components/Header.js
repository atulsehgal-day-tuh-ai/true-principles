
import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header style={headerStyle}>
            <div style={logoStyle}>
                <Link href="/" style={linkStyle}>
                    Same Thing Only Different
                </Link>
            </div>
            <nav>
                <ul style={navListStyle}>
                    <li style={navItemStyle}>
                        <Link href="/login" style={linkStyle}>
                            Login
                        </Link>
                    </li>
                    <li style={navItemStyle}>
                        <Link href="/signup" style={linkStyle}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
};

const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
};

const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
};

const navItemStyle = {};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
};
