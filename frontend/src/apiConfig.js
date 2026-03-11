// Frontend API Configuration
// This file helps the app work on different devices (Phone, Tablet, etc.) 
// by using the actual IP address of the laptop instead of 'localhost'.

const getBaseUrl = () => {
    // Check if we are in production (on Render or any other hosted domain)
    const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('192.168.');

    if (isProduction) {
        return 'https://aimsbbsr-ac-in.onrender.com';
    }

    // Local Development
    return import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
};

export const API_BASE_URL = getBaseUrl();
export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads`;
export default API_BASE_URL;
