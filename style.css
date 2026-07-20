const app_id = "33QBmfMXw5olmCUXY5rug";
const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

ws.onopen = () => {
    console.log("Connected to Deriv API");
};

ws.onmessage = (event) => {
    console.log(JSON.parse(event.data));
};

ws.onerror = (error) => {
    console.error(error);
};

ws.onclose = () => {
    console.log("Connection closed");
};
