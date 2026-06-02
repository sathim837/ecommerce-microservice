import app from './app';
import {env} from "./config/env";

app.listen(Number(env.PORT), () => {
    console.log(`User Service is running on port ${env.PORT}`);
});