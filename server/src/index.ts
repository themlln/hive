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
  "database": process.env.database
}).then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.email = "cody@email.com";
    user.password = "123";
    user.salt = "123";
    user.sessionId = '1';
    user.googleId = '1';
    await connection.manager.save(user);
    const user2 = new User();
    user2.email = "ming@email.com";
    user2.password = "123";
    user2.salt = "123";
    user2.sessionId = '1';
    user2.googleId = '1';
    await connection.manager.save(user2)
    // const user3 = new User();
    // user3.email = "nuri@email.com";
    // user3.password = "123";
    // user3.salt = "123";
    // user3.sessionId = '1';
    // user3.googleId = '1';
    // await connection.manager.save(user3)

    console.log("Saved a new user with id: " + user.id + user2.id);

    console.log("Inserting a new canvas into the database...");
    const canvas = new Canvas()
    canvas.canvasObj = 'This is a canvas!'
    canvas.owner = user
    canvas.collaborator = [user2]
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
