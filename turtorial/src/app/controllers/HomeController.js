import Course from "../models/Course.js";
import { mongoosesToObject } from "../../util/mongoose.js";

export default class HomeController {
    async index(request, response, next) {
        await Course.find({})
        .then(courses => {
            response.render('home', {
                courses: mongoosesToObject(courses),
            });
        })
        .catch(next);
    }
}

// module.exports = new NewsController;