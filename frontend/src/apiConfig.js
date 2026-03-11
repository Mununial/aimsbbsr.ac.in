// Frontend API Configuration
// This file helps the app work on different devices (Phone, Tablet, etc.) 
// by using the actual IP address of the laptop instead of 'localhost'.

const getBaseUrl = () => {
    // If you are accessing the site via an IP address (like 10.108.x.x), 
    // the app will automatically point to the same IP for the backend.
    const hostname = window.location.hostname;
    const port = 5000; // Your backend port
    return `http://${hostname}:${port}`;
};

export const API_BASE_URL = getBaseUrl();
export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads`;
export default API_BASE_URL;
