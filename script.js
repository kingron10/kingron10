// ===============================
// Kingron Deriv Trader
// ===============================

// Your Deriv App ID
const APP_ID = "33RdEbgPWTpp5a6mSF5uz";

// Your NEW Personal Access Token
const API_TOKEN = "pat_249b0cc7ccbc6d29505425508db2214d0eb2d929a73b58d7ff430e8caf8c7749";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");
const balance = document.getElementById("balance");

let ws;

// Connect to Deriv
connectBtn.addEventListener("click", () => {
    status.textContent = "Connecting...";

ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}&l=EN`);  

    ws.onopen = () => {
    status.textContent = "✅ WebSocket Connected";
};

        ws.send(JSON.stringify({
            authorize: API_TOKEN
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log(data);

        if (data.error) {
            status.textContent = "❌ " + data.error.message;
            return;
        }

        if (data.msg_type === "authorize") {
            status.textContent = "✅ Logged in as " + data.authorize.loginid;

            ws.send(JSON.stringify({
                balance: 1,
                subscribe: 1
            }));
        }

        if (data.msg_type === "balance") {
            balance.textContent =
                "Balance: " +
                data.balance.currency +
                " " +
                data.balance.balance;
        }
    };

    ws.onerror = () => {
        status.textContent = "Connection error.";
    };

    ws.onclose = () => {
        console.log("Connection closed");
    };
});
