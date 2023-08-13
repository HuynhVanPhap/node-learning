import Course from "../models/Course.js";
import { mongoosesToObject, mongooseToObject } from "../../util/mongoose.js";

export default class UserController {
    index(request, response) {
        response.render('course/index');
    }

    async courses(request, response, next) {
        const courses = await Course.find()
            .then(courses => {
                if (response.locals._sort.enabled) {
                    courses = Course.find().sort({
                        [response.locals._sort.column]: response.locals._sort.type
                    });
                }

                return courses;
            })
            .catch(next);
        
        const coursesDeletedCount = await Course.countDocumentsWithDeleted({ deleted: true })
            .then(count => count)
            .catch(next);
            
        response.render('user/stored-courses', {
            courses: mongoosesToObject(courses),
            coursesDeletedCount: coursesDeletedCount,
        });
    }

    async trash(request, response, next) {
        await Course.findWithDeleted({ deleted: true })
        .then(courses => {
            response.render('user/trashed-courses', {
                courses: mongoosesToObject(courses),
            });
        })
        .catch(next);
    }
}
