import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import sendGMTOffset from "./sendGMTOffset";

const createWSS = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");
    sendGMTOffset(ws);

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });
  });

  return wss;
};

export default createWSS;
