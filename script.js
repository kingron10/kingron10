// ===============================
// Kingron Deriv Trader (OAuth)
// ===============================

const APP_ID = "33RdEbgPWTpp5a6mSF5uz";
const REDIRECT_URI = "https://kingron10.github.io/kingron10/";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");
const balance = document.getElementById("balance");

const params = new URLSearchParams(window.location.search);
const token = params.get("token1");

if (token) {
    status.textContent = "Connecting...";

    const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

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
            status.textContent = "Connected";
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
}

connectBtn.addEventListener("click", () => {
    window.location.href =
        `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=EN&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
});
