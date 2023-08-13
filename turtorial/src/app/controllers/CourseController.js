import Course from "../models/Course.js";
import { mongoosesToObject, mongooseToObject } from "../../util/mongoose.js";

export default class CourseController {
    index(request, response) {
        response.render('course/index');
    }
    
    async detail(request, response, next) {
        await Course.findOne({ slug: request.params.slug })
        .then(course => {
            response.render('course/detail', {
                course: mongooseToObject(course),
            });
        })
        .catch(next);
    }

    create(request, response, next) {
        response.render('course/create');
    }

    async store(request, response, next) {
        const course = new Course(request.body);

        await course.save()
                    .then(() => {
                        response.redirect('/')
                    })
                    .catch();
    }

    async edit(request, response, next) {
        await Course.findOne({ slug: request.params.slug })
        .then(course => {
            response.render('course/edit', {
                course: mongooseToObject(course),
            });
        })
        .catch(next);
    }

    async update(request, response, next) {
        await Course.updateOne({_id: request.params.id}, request.body)
        .then(() => {
            response.redirect('/user/stored/courses');
        })
        .catch(next);
    }

    async delete(request, response, next) {
        await Course.deleteById({_id: request.params.id})
        .then(() => {
            response.redirect('back');
        })
        .catch(next);
    }

    async deleteMultiple(request, response, next) {
        await Course.delete()
        .where('_id').in(request.body.courseIds)
        .then(() => {
            response.redirect('back');
        })
        .catch(next);
    }

    async destroy(request, response, next) {
        await Course.deleteOne({_id: request.params.id})
        .then(() => {
            response.redirect('back');
        })
        .catch(next);
    }

    async restore(request, response, next) {
        await Course.restore({_id: request.params.id})
        .then(() => {
            response.redirect('/user/stored/courses');
        })
        .catch(next); 
    }
}
