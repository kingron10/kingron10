const APP_ID = "33UDceAhNGEaf4PXGDRrv";
const API_TOKEN = "pat_98c089c3c2722abd6a0e39c7a1b4aa01fc06926b6becb23d007632c10c0a85f0";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");
const balance = document.getElementById("balance");

let ws = null;

connectBtn.onclick = () => {
    status.textContent = "Connecting...";

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
        status.textContent = "Connected. Authorizing...";

        ws.send(JSON.stringify({
            authorize: API_TOKEN
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.error) {
            status.textContent = "Error: " + data.error.message;
            return;
        }

        if (data.msg_type === "authorize") {
            status.textContent = "Logged in: " + data.authorize.loginid;

            ws.send(JSON.stringify({
                balance: 1
            }));
        }

        if (data.msg_type === "balance") {
            balance.textContent =
                data.balance.currency + " " + data.balance.balance;
        }
    };

    ws.onerror = () => {
        status.textContent = "Connection error";
    };

    ws.onclose = () => {
        console.log("Connection closed");
    };
};
