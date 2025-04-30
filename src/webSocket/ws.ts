import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import type { Express } from "express";
import http from "http";
import sendGMTOffset from "./sendGMTOffset";
import sendAlarms from "./sendAlarms";
import { z } from "zod";
import { writePoint } from "../influx/writePoint";

class WSS {
  private wss: WebSocketServer | undefined;
  private frontSockets: Record<string, WebSocket>;
  private esp32Socket: WebSocket | undefined;
  public server: Server | undefined;
  private frontSocketsCounter: Record<string, number>;

  constructor() {
    this.frontSockets = {};
    this.server = undefined;
    this.wss = undefined;
    this.esp32Socket = undefined;
    this.frontSocketsCounter = {};
  }

  public setup(app: Express): void {
    this.server = http.createServer(app);
    this.wss = new WebSocketServer({ server: this.server });

    this.wss.on("connection", (ws, req) => {
      if (req.url === undefined || req.headers.host === undefined) return;
      const url = new URL(req.url, `http://${req.headers.host}`);
      const clientType = url.searchParams.get("client");
      const validUsers = new Set<string>(["ESP32", "FRONT"]);

      if (clientType === null || !validUsers.has(clientType)) {
        ws.close();
        return;
      }

      if (clientType === "ESP32") {
        this.esp32Socket = ws;
        this.setupEsp32Socket();
        return;
      }

      const { remoteAddress } = req.socket;
      if (remoteAddress === undefined) {
        ws.close();
        return;
      }

      const frontString = `${clientType}@${remoteAddress}`;
      if (!(frontString in this.frontSocketsCounter)) {
        this.frontSocketsCounter[frontString] = 1;
      } else {
        this.frontSocketsCounter[frontString] += 1;
      }
      const counter = this.frontSocketsCounter[frontString];
      this.frontSockets[`${frontString}-${counter}`] = ws;
      this.setupFrontSocket(ws);
    });
  }

  public sendAlarms() {
    if (this.esp32Socket === undefined) {
      return;
    }

    sendAlarms(this.esp32Socket);
  }

  private setupFrontSocket(socket: WebSocket) {
    socket.on("message", (data) => {
      const stringData = data.toString();
      const parsedData = JSON.parse(stringData);
      if (typeof parsedData !== "object") {
        console.log(`Recieved ${typeof parsedData}: ${parsedData}`);
        return;
      }

      this.handleObjectData(parsedData);
    });
  }

  private setupEsp32Socket() {
    if (this.esp32Socket === undefined) {
      return;
    }

    sendGMTOffset(this.esp32Socket);
    this.sendAlarms();

    this.esp32Socket.on("message", (data) => {
      const stringData = data.toString();
      const parsedData = JSON.parse(stringData);
      if (typeof parsedData !== "object") {
        console.log(`Recieved ${typeof parsedData}: ${parsedData}`);
        return;
      }

      this.handleObjectData(parsedData);
    });
  }

  private handleObjectData(jsonParsedData: object) {
    const baseMessageSchema = z.object({
      event: z.union([
        z.literal("GmtOffsetUpdated"),
        z.literal("AlarmsUpdated"),
        z.literal("SendRead"),
        z.literal("BEEP"),
      ]),
    });

    const { event } = baseMessageSchema.parse(jsonParsedData);
    switch (event) {
      case "GmtOffsetUpdated":
      case "AlarmsUpdated":
        this.handleVoidEvent(event);
        break;
      case "SendRead":
        this.handleSendRead(jsonParsedData);
        break;
      case "BEEP":
        this.handleBeep(jsonParsedData);
    }
  }

  private handleVoidEvent(event: string) {
    Object.values(this.frontSockets).forEach((frontWS) => {
      frontWS.send(JSON.stringify({ event }));
    });
  }

  private handleSendRead(jsonParsedData: object) {
    const sendReadSchema = z.object({
      event: z.literal("SendRead"),
      data: z.object({
        read: z.number(),
        millisEpochTime: z.number(),
      }),
    });

    const { data } = sendReadSchema.parse(jsonParsedData);
    const { read, millisEpochTime } = data;
    const date = new Date(millisEpochTime);
    writePoint(read, date);
  }

  private handleBeep(jsonParsedData: object) {
    const sendReadSchema = z.object({
      event: z.literal("BEEP"),
      data: z.boolean(),
    });

    const { data: value } = sendReadSchema.parse(jsonParsedData);
    this.sendBeep(value);
  }

  private sendBeep(value: boolean) {
    if (this.esp32Socket === undefined) return;
    this.esp32Socket.send(JSON.stringify({ event: "BEEP", value }));
  }
}

const wss = new WSS();

export default wss;
