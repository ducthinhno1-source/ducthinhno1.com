# ducthinhno1 — Website cá nhân

Website tĩnh responsive gồm HTML, CSS và JavaScript thuần. Không cần cài framework.

## Chạy thử
1. Giải nén thư mục.
2. Mở `index.html` trong trình duyệt.
3. Để thử gần giống môi trường xuất bản, bạn có thể dùng extension Live Server trong VS Code.

## Trước khi xuất bản
- Mở `script.js` và đổi `CONTACT_EMAIL = "your-email@example.com"` thành email bạn muốn nhận thư.
- Sửa phần giới thiệu, tuổi, kỹ năng, liên kết mạng xã hội trong `index.html` thành thông tin của bạn.
- Các liên kết mạng xã hội hiện là liên kết mẫu.
- Nhạc nền là giai điệu ambient được tạo bằng Web Audio API sau khi bấm nút; không có file nhạc ngoài.
- Đăng nhập hiện chỉ là giao diện demo. Không nhập mật khẩu thật. Muốn có tài khoản thật cần backend, xác thực an toàn và cơ sở dữ liệu (ví dụ Firebase Authentication hoặc Supabase Auth).

## Xuất bản miễn phí bằng GitHub Pages
1. Tạo tài khoản tại https://github.com/ nếu chưa có.
2. Tạo repository mới, ví dụ `ducthinhno1`.
3. Upload `index.html`, `styles.css`, `script.js` và `README.md` lên repository.
4. Vào **Settings → Pages**.
5. Ở phần **Build and deployment**, chọn **Deploy from a branch**, branch `main`, folder `/ (root)`, rồi bấm **Save**.
6. Chờ GitHub Pages triển khai xong. Địa chỉ thường có dạng `https://TEN-TAI-KHOAN.github.io/ducthinhno1/`.

## Lưu ý về biểu mẫu liên hệ
Bản tĩnh mở ứng dụng email mặc định bằng `mailto:` sau khi bạn điền email vào `script.js`. Nó không lưu tin nhắn trên máy chủ. Để nhận tin nhắn ngay trong website mà không cần người dùng mở ứng dụng email, hãy kết nối dịch vụ biểu mẫu hoặc tự triển khai backend.
