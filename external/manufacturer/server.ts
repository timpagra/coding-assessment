import express from "express";
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export interface MockedThermostat {
  id: string;
  model: string;
  location: string;
  temperature: number; // Temperature in Fahrenheit
  humidity: number; // Relative humidity in percentage
  isOnline: boolean;
  batteryLevel: number; // Battery level in percentage (0 to 100)
  lastSyncTime: string; // ISO 8601 format
}

const mockedThermostats: MockedThermostat[] = [
  {
    id: "thermo123",
    model: "EcoTempX1",
    location: "Living Room",
    temperature: 72,
    humidity: 40,
    isOnline: true,
    batteryLevel: 100,
    lastSyncTime: "2023-11-14T12:00:00Z",
  },
  {
    id: "thermo456",
    model: "EcoTempX2",
    location: "Bedroom",
    temperature: 68, // Random value in certain interval
    humidity: 45, // Random value in certain interval
    isOnline: false,
    batteryLevel: 60, // Increment/decrement by certain value
    lastSyncTime: "2023-11-14T11:00:00Z",
  },
  {
    id: "thermo789",
    model: "EcoTempX3",
    location: "Office",
    temperature: 70,
    humidity: 50,
    isOnline: true,
    batteryLevel: 80,
    lastSyncTime: "2023-11-14T10:30:00Z",
  },
];

const TEMPERATURE_RANGE = { min: 60, max: 80 }; // Fahrenheit
const HUMIDITY_RANGE = { min: 30, max: 60 }; // Percentage
const BATTERY_LEVEL_RANGE = { min: 0, max: 100 }; // Percentage

function updateThermostatData(thermostat: MockedThermostat) {
  // Random temperature change within a range
  thermostat.temperature += (Math.random() - 0.5) * 4; // Change between -2 and +2 degrees
  thermostat.temperature = Math.min(
    Math.max(thermostat.temperature, TEMPERATURE_RANGE.min),
    TEMPERATURE_RANGE.max,
  );

  // Random humidity change within a range
  thermostat.humidity += (Math.random() - 0.5) * 10; // Change between -5% and +5%
  thermostat.humidity = Math.min(
    Math.max(thermostat.humidity, HUMIDITY_RANGE.min),
    HUMIDITY_RANGE.max,
  );

  // Decrease battery level over time, within range
  thermostat.batteryLevel = Math.max(
    thermostat.batteryLevel - Math.random() * 5,
    BATTERY_LEVEL_RANGE.min,
  );

  return thermostat
}

setInterval(() => {
  mockedThermostats.forEach(updateThermostatData);
}, 5000);

app.get("/thermostats", ({ res: response }) => {
  return response?.json(mockedThermostats);
});

app.get("/publish-updates", ({ query, res }) => {
  return fetch((query as any).url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateThermostatData(mockedThermostats[0])),
  })
    .then((response) => {
      return res?.json(response);
    })
    .catch((error) => {
      return res?.json({ message: error.message });
    });
});
app.listen(PORT, () => {
  console.log(
    `⚡️[manufacturer]: Service is running at https://localhost:${PORT}`,
  );
});
