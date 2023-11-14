import { MockedThermostat } from "../server";

function getThermostatsByAPIKey(apiKey: string): Promise<MockedThermostat[]> {
  return fetch("http://localhost:3000/thermostats").then((result) => {
    return result.json();
  });
}

const sdk = {
  getThermostatsByAPIKey,
};

export type SDK = typeof sdk;

export default sdk;
