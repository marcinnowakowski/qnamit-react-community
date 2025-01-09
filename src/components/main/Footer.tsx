import React from 'react';
import './Footer.css'; // Import CSS for styling

interface FooterProps {
    text: string; // Text to display in the footer
}

const Footer: React.FC<FooterProps> = ({ text }) => {
    return (
        <footer className="footer">
            <p>{text}</p>
        </footer>
    );
};

export default Footer;
