import { createConnection } from "@shared/infra/database/data-source";
import { app } from './app';

createConnection('database');

app.listen(3333, () => console.log('Server is running on port 3333'));