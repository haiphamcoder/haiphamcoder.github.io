# haiphamcoder.github.io

Blog cá nhân của Hải Phạm - Backend Engineer chuyên Java/Spring Boot, chia sẻ kiến thức thực chiến về hệ thống phân tán, hiệu năng và kiến trúc.

## ✨ Tính năng

- 🌙 **Dark/Light Mode** - Tự động phát hiện theme hệ thống
- 🌍 **Đa ngôn ngữ** - Hỗ trợ tiếng Việt và tiếng Anh
- 📱 **Responsive** - Tối ưu cho desktop, tablet, mobile
- 🔍 **Tìm kiếm & Filter** - Theo tiêu đề, nội dung, tags
- 📝 **Code Highlighting** - Syntax highlighting với highlight.js
- 📋 **Copy Code** - Nút copy cho code blocks
- 🎨 **Minimalist Design** - Giao diện tối giản, dễ đọc

## 📁 Cấu trúc

```text
.
├── index.html        # Trang chủ
├── blog.html         # Trang blog (danh sách + xem bài)
├── about.html        # Trang giới thiệu
├── contact.html      # Trang liên hệ
├── posts/            # Markdown các bài viết
│   ├── index.json    # Danh mục bài viết (metadata)
│   ├── hello-world.md          # VI
│   └── hello-world.en.md       # EN
├── css/
│   └── style.css     # Style global + dark mode + responsive
├── js/
│   ├── main.js       # Logic blog (render, search, tags, paginate)
│   ├── theme.js      # Toggle theme (light/dark)
│   ├── i18n.js       # Đa ngôn ngữ (VI/EN)
│   └── nav.js        # Mobile navigation
└── assets/
    └── avatar.svg    # Ảnh đại diện (SVG fallback)
```

## 🚀 Chạy local

Sử dụng bất kỳ static server nào

## 📝 Thêm bài viết mới

### 1. Tạo file Markdown

```bash
# Tạo file tiếng Việt
touch posts/my-new-post.md

# Tạo file tiếng Anh (tùy chọn)
touch posts/my-new-post.en.md
```

### 2. Cập nhật metadata

Thêm entry vào `posts/index.json`:

```json
{
  "slug": "my-new-post",
  "date": "2025-01-15",
  "tags": ["java", "spring-boot", "performance"],
  "title": { 
    "vi": "Tối ưu Spring Boot Performance", 
    "en": "Spring Boot Performance Optimization" 
  },
  "excerpt": { 
    "vi": "Các kỹ thuật tối ưu hiệu năng Spring Boot trong production", 
    "en": "Production-ready Spring Boot performance optimization techniques" 
  },
  "files": { 
    "vi": "my-new-post.md", 
    "en": "my-new-post.en.md" 
  }
}
```

### 3. Viết nội dung

Sử dụng Markdown với syntax highlighting:

````markdown
# Tiêu đề bài viết

Nội dung bài viết...

```java
@RestController
public class ExampleController {
    @GetMapping("/api/data")
    public ResponseEntity<String> getData() {
        return ResponseEntity.ok("Hello World!");
    }
}
```
````

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Custom Properties (CSS Variables)
- **Code Highlighting**: [highlight.js](https://highlightjs.org/)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter)
- **Deployment**: GitHub Pages

## 🌍 Đa ngôn ngữ

- **Toggle**: Nút 🇻🇳/🇬🇧 ở header
- **Auto-detect**: Tự phát hiện ngôn ngữ trình duyệt
- **Persistence**: Lưu lựa chọn trong localStorage
- **Translation**: Chỉnh sửa `js/i18n.js` để thêm/bổ sung bản dịch

## 📱 Responsive Design

- **Desktop**: Layout 2 cột với sidebar
- **Tablet**: Layout 1 cột, grid 2 cột cho bài viết
- **Mobile**: Layout 1 cột, hamburger menu, full-width buttons

## 🎨 Theme System

- **Light Mode**: Màu sáng, dễ đọc ban ngày
- **Dark Mode**: Màu tối, bảo vệ mắt ban đêm
- **Auto-switch**: Theo system preference
- **Manual toggle**: Nút ☼/☾ ở header
