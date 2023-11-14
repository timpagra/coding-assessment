
We want to create a service that acts as an adapter layer between our platform and the manufacturer's API.

The scope of this task is to create adapter with other related parts that are missing from the current architecture.
We can imagine that authentication with the manufacturer has been handled and we have an API key to use.
The `GET thermostats` endpoint is returning user thermostat data from the manufacturer's API.

The `connection service` will emit connection created event for specific manufacturer once the user successfully connects his
account with our platform. In order to react when new manufacturer connection is created. Listen to `connection created` 
from event bus package. For testing purposes you can trigger connection created event with `npm run publish:connection`.

Task: Develop a basic Node.js (TypeScript) service that acts as an adapter layer for a hypothetical device manufacturer.
This service should:

1. Listen for connection created event. And retrieve the user's thermostat data from the manufacturer's API. 
2. Map the retrieved data to a standard schema. Here is the schema as typescript interface:
   ```ts
   interface Thermostat {
     deviceId: string;
     deviceModel: string;
     roomLocation: string;
     state: ThermostatState;
     powerSource: "battery" | "wired";
     lastUpdated: Date;
   }
   
   interface ThermostatState {
     currentTemperature: number; // Temperature in Celsius
     currentHumidity: number; // Relative humidity in percentage
     status: "online" | "offline";
   }
   ```
3. Integration with an event bus from packages/event-bus to handle events. Currently, we want to support `device detected` and `device updated` events.
4. Setting up an endpoint to receive updates via `webhook` from manufacturer.

## Scripts

There's a script for simulating webhook updates from the manufacturer's API. You can run it with ` npm run call:webhook http://localhost:3004/webhook`.

## Packages

- `packages/event-bus` - a simple event bus implementation. There is an enum of supported events in `packages/event-bus/src/events.ts`.
