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
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #0d1117;
    color: #ffffff;
    text-align: center;
}

header {
    background: #161b22;
    padding: 20px;
}

header h1 {
    color: #00d084;
}

main {
    padding: 40px 20px;
}

.card {
    background: #1c2128;
    max-width: 500px;
    margin: auto;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 208, 132, 0.3);
}

button {
    background: #00d084;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
}

button:hover {
    background: #00b36b;
}

footer {
    margin-top: 50px;
    padding: 20px;
    background: #161b22;
}
