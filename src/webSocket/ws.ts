import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import type { Express } from "express";
import http from "http";
import sendGMTOffset from "./sendGMTOffset";
import sendAlarms from "./sendAlarms";
import { writePoint } from "../influx/writePoint";

class WSS {
  private wss: WebSocketServer | undefined;
  private frontSockets: Record<string, WebSocket>;
  private esp32Socket: WebSocket | undefined;
  public server: Server | undefined;

  constructor() {
    this.frontSockets = {};
    this.server = undefined;
    this.wss = undefined;
    this.esp32Socket = undefined;
  }

  public setup(app: Express): void {
    this.server = http.createServer(app);
    this.wss = new WebSocketServer({ server: this.server });

    this.wss.on("connection", (ws, req) => {
      const xUser = req.headers["x-user"];
      const validUsers = new Set<string>(["ESP32", "FRONT"]);

      if (
        Array.isArray(xUser) ||
        xUser === undefined ||
        !validUsers.has(xUser)
      ) {
        ws.close();
        return;
      }

      if (xUser === "ESP32") {
        this.esp32Socket = ws;
        this.setupEsp32Socket();
        return;
      }

      const { remoteAddress } = req.socket;
      if (remoteAddress === undefined) {
        ws.close();
        return;
      }

      this.frontSockets[`${xUser}@${remoteAddress}`] = ws;
    });
  }

  private setupEsp32Socket() {
    if (this.esp32Socket === undefined) {
      return;
    }

    sendGMTOffset(this.esp32Socket);
    sendAlarms(this.esp32Socket);

    this.esp32Socket.on("message", (data) => {
      console.log(data.toString());
    });
  }
}

const wss = new WSS();

export default wss;
