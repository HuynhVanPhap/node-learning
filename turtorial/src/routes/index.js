import {default as homeRouter} from "./home.js";
import {default as courseRouter} from "./course.js";
import {default as userRouter} from "./user.js";

export  const routes = (app) => {
    app.use('/courses', courseRouter);
    app.use('/user', userRouter);
    app.use('/', homeRouter);
}