import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import MongooseDelete from 'mongoose-delete';
import AutoIncrement from 'mongoose-sequence';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
    name: { type: String },
    slug: { type: String, slug: 'name' },
    description: { type: String },
    image: { type: String },
}, {
    timestamps: true,
});

mongoose.plugin(slug);
/**
 * Tích hợp Soft delete
 * 
 * @param <mongoose-delete> MongooseDelete
 * @param options
 */
CourseSchema.plugin(MongooseDelete, {
    overrideMethods: true, // Override lại các phương thức mongoose mặc định để lấy dữ liệu
    deletedAt: true
});

// CourseSchema.plugin(AutoIncrement(mongoose), {inc_field: '_id'});

export default mongoose.model('Course', CourseSchema);