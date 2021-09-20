import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();
import { application } from './Microservice';
// Change this if you're using different ports for each environment
const port = process.env.PORT || 8080;

application.listen(port, () => {
    console.log(`Application running on port ${port}`);
});

application.on('error', (e) => {
    console.log(`Application crashed: ${e}`);
    process.exit(0);
});
