type EventCallback<T = any> = (data: T) => void;

export * from "./events";

const registeredEvents: Map<string, EventCallback[]> = new Map();
class EventBus {
  subscribe(eventName: string, callback: EventCallback): void {
    if (registeredEvents.has(eventName)) {
      registeredEvents.get(eventName)!.push(callback);
    }
    registeredEvents.set(eventName, [callback]);
  }

  unSubscribe(eventName: string, callback: EventCallback): void {
    const callbacks = registeredEvents.get(eventName);
    if (callbacks) {
      registeredEvents.set(
        eventName,
        callbacks.filter((cb) => cb !== callback),
      );
    }
  }

  publish(eventName: string, data: any): void {
    const callbacks = registeredEvents.get(eventName);
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(data);
      });
    }
  }
}

export default new EventBus();
