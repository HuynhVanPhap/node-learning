[@] Why Chrome can't inspect nodejs code in Docker container? - (nodemon)
  [-] Nguyên nhân
    [+] Chưa trỏ đúng đến địa chỉ localhost
  [-] Cách khắc phục
    [+] Thêm flag (--inspect=127.0.0.1:9229)
    [+] Ánh xạ 9229 của port với 9229 của container
[@] MongoError: command find requires authentication
  [-] Nguyên nhân
    [+] User không có quyền hạn trên collection tương tác
[@] grantRolesToUser fails with error "Could not find role: root"
  [-] Nguyên nhân
    [+] Role root chỉ có ở database admin
  [-] Cách giải quyết
    [+] https://stackoverflow.com/questions/69780592/grantrolestouser-fails-with-error-could-not-find-role-root
[@] Authentication failed when connect to other new database (MongoDB)
  [-] Nguyên nhân
    [+] Mỗi user sẽ có phạm vị hoạt động trên một database nhất định
  [-] Tham khảo
    [+] https://bobcares.com/blog/mongodb-error-auth-failed/#:~:text=Usually%2C%20MongoDB%20shows%20auth%20failed,auth%20method%20was%20not%20proper.
[@] findDeleted in mongoose-delete retrieves all elements with deleted field: true and false
  [-] Nguyên nhân
    [+] Khi dùng restore() sẽ xóa mất filed "deleted" nên findDeleted() không xác định được
  [-] Khắc phục
    [+] Thay vì dùng findDeleted -> findWithDeleted({ deleted: true })
[@] Mongoose sequence bị treo khi thêm mới
  [-] Nguyên nhân
    [+] Không hoạt động với mongoose v7
[@] Model.find() và await Model.find()
  [-] Model.find()
    [+] return Query()
  [-] await Model.find()
    [+] return Array || Document
  [***] Áp dụng đúng cho các query khác find() 