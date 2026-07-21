// ===============================
// Kingron Deriv Trader
// ===============================

// Replace with your Deriv App ID
const APP_ID = "33QBmfMXw5olmCUXY5rug";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");
const balance = document.getElementById("balance");

let ws = null;

connectBtn.addEventListener("click", () => {
    status.textContent = "Connecting...";

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
        status.textContent = "Connected";

        // Request account balance
        ws.send(JSON.stringify({
            balance: 1
        }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        if (data.error) {
            status.textContent = data.error.message;
            return;
        }

        if (data.msg_type === "balance") {
            balance.textContent = data.balance.balance + " " + data.balance.currency;
        }
    };

    ws.onerror = () => {
        status.textContent = "Connection Error";
    };

    ws.onclose = () => {
        status.textContent = "Disconnected";
    };
});
