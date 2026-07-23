const APP_ID = "33UDceAhNGEaf4PXGDRrv";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("status");

connectBtn.onclick = () => {
    status.textContent = "Connecting...";

    const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
        status.textContent = "✅ WebSocket Connected";
    };

    ws.onerror = (e) => {
        console.log(e);
        status.textContent = "❌ Connection Error";
    };
};
