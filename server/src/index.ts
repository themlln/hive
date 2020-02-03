import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Canvas} from "./entity/Canvas"
import {SharedCanvas} from "./entity/SharedCanvas"
import '../../secrets'

createConnection({
  "type": "postgres",
  "host": process.env.host,
  "username": process.env.username,
  "password": process.env.password,
  "database": "collabo",
  "synchronize": true,
}).then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.email = "cody@email.com";
    user.password = "123";
    user.salt = "123";
    user.sessionId = '1';
    user.googleId = '1';
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Inserting a new canvas into the database...");
    const canvas = new Canvas()
    canvas.canvasObj = 'This is a canvas!'
    canvas.owner = user
    await connection.manager.save(canvas);
    console.log("Saved a new canvas with id: " + canvas.id);

    console.log("Inserting a new shared canvas into the database...");
    const sharedCanvas = new SharedCanvas()
    sharedCanvas.canvas = canvas
    sharedCanvas.user = user
    await connection.manager.save(sharedCanvas);
    console.log("Saved a new shared canvas with id: " + sharedCanvas.userToCanvasId);

    console.log("Loading users and canvas from the database...");
    const users = await connection.manager.find(User);
    const canvases = await connection.manager.find(Canvas);
    console.log("Loaded users: ", users);
    console.log("Loaded canvases: ", canvases);

    console.log("Connection has been established gloriously.");

}).catch(error => console.log("Unable to connect to the database:", error));
