// =============================
// Deriv Trading Website Script
// =============================

// Replace this with your Deriv App ID
const APP_ID = "33QBmfMXw5olmCUXY5rug";

// Connect to Deriv WebSocket
const api = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

api.onopen = () => {
    console.log("✅ Connected to Deriv API");
};

api.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received:", data);
};

api.onerror = (error) => {
    console.error("Connection error:", error);
};

api.onclose = () => {
    console.log("❌ Disconnected from Deriv API");
};

// Login button
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        alert("Login feature will be added in the next step.");
    });
}hover {
    b
