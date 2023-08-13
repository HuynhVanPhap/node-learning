import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
import { routes } from './routes/index.js';
import * as database from './config/database.js';
import dotenv from 'dotenv';
import SortMiddleware from './app/middlewares/SortMiddleware.js';

dotenv.config();

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = create({
  extname: '.hbs', // Cấu hình thay vì handlebars -> hbs
  helpers: {
    increment: (a) => ++a,
    sortable: (field, sort) => {
      // Tránh việc các column không cần thiết bị ảnh hưởng
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'swap-vertical',
        asc: 'caret-up',
        desc: 'caret-down'
      };
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      };

      const icon = icons[sortType];
      const type = types[sortType];

      return `
        <a href="?_sort&column=${field}&type=${type}">
          <ion-icon name="${icon}"></ion-icon>
        </a>
      `;
    }
  },
});

/**
 * Override with POST having ?_method=DELETE
 */
app.use(methodOverride('_method'))

app.use(morgan('combined'))
// Thiết lập đường dẫn tới tài nguyên tĩnh
app.use('/custom', express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

/**
 * Sử dụng middleware hỗ trợ xử lý dữ liệu từ form gửi lên và gán dữ liệu đó vào req.body
 */
app.use(express.urlencoded({extended: true}))
/**
 * Sử dụng middleware hỗ trợ xử lý dữ liệu từ các thư viện như axios, ajax(Jquery), XMLHTTPRequest,... gửi lên và gán dữ liệu đó vào req.body
 */
app.use(express.json())

database.connect();

app.use(SortMiddleware);
/**
 * Template Engine
 * 
 * @param1 Đuôi file được chấp nhận ( Ở đây vì cấu hình là '.hbs' bên tham số đầu vào để thông báo cho express là 'hbs')
 * @param2 Template engine sẽ sử dụng
 */
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs') // Thông báo cho expressjs biết sẽ sử dụng handlebars là template engine
app.set('views', path.join(__dirname, 'resources', 'views')) // Chỉ định thư mục chứa views cho expressjs

// Routes init
routes(app);

app.listen(port, () => {
  console.log(`NodeJs App listening on port ${port}`)
})
