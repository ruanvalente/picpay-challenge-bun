import { App } from "./server";

const app = new App();
const PORT = process.env.PORT || 3001;

app.startServer(PORT);
