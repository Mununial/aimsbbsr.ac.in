// Frontend API Configuration
// This file helps the app work on different devices (Phone, Tablet, etc.) 
// by using the actual IP address of the laptop instead of 'localhost'.

const getBaseUrl = () => {
    // If we are on Render (Production), use the secure backend URL
    if (window.location.hostname !== 'localhost') {
        return 'https://aimsbbsr-ac-in.onrender.com';
    }

    // Otherwise, use local development defaults
    const hostname = window.location.hostname;
    const port = 5000;
    return `http://${hostname}:${port}`;
};

export const API_BASE_URL = getBaseUrl();
export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads`;
export default API_BASE_URL;
