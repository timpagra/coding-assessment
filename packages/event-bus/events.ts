export enum Events {
  connectionCreated = "connection.created",
  deviceDetected = "device.detected",
  deviceUpdated = "device.updated",
}

export interface ConnectionCreatedEvent {
  id: string;
}
