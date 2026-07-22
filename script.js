// ===============================
// Kingron Deriv Trader
// ===============================

const APP_ID = "33RdEbgPWTpp5a6mSF5uz";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");
const balance = document.getElementById("balance");

let ws = null;

connectBtn.addEventListener("click", () => {

    const token = prompt("Enter your Deriv API Token:");

    if (!token) {
        status.textContent = "No API token entered.";
        return;
    }

    status.textContent = "Connecting...";

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
        ws.send(JSON.stringify({
            authorize: token
        }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        if (data.error) {
            status.textContent = data.error.message;
            return;
        }

        if (data.msg_type === "authorize") {
            status.textContent = "Authorized";
            ws.send(JSON.stringify({
                balance: 1
            }));
        }

        if (data.msg_type === "balance") {
            balance.textContent =
                data.balance.balance + " " + data.balance.currency;
        }
    };

    ws.onerror = () => {
        status.textContent = "Connection Error";
    };

    ws.onclose = () => {
        status.textContent = "Disconnected";
    };
});
