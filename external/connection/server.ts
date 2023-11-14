import eventBus, { Events } from "../../packages/event-bus";
import express from "express";
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/connection-created", ({ res }) => {
  eventBus.publish(Events.connectionCreated, { id: "id" });
  return res?.json({ message: "Published connection created" });
});

app.get("/connection/:id", ({ res, params }) => {
  return res?.json({ id: "id", manufacturer: "manufacturer" });
});
app.listen(PORT, () => {
  console.log(
    `⚡️[connection]: Service is running at https://localhost:${PORT}`,
  );
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully.");
  handleCleanup();
  process.exit(0);
});

// Graceful shutdown on SIGTERM (sent by process managers like Kubernetes)
process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully.");
  handleCleanup();
  process.exit(0);
});

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  handleCleanup();
  process.exit(1); // Exit with error code
});

function handleCleanup() {}
