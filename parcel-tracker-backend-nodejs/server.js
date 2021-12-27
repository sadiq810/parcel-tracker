import app, {portNumber} from "./src/index";

app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});