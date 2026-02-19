---
title: "Chương 6: Hosting & Authentication"
date: 2025-09-16
tags: ["git", "tutorial", "version-control"]
lang: "vi"
series: "Learning Git"
seriesOrder: 6
excerpt: "Bài 6 trong series Learning Git: Chương 6: Hosting & Authentication"
---

|                                                                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ở chương trước, bạn đã học về merging (hợp nhất) và cách tính năng này của Git cho phép tích hợp các thay đổi từ nhánh này sang nhánh khác.                                             |
| Cho đến thời điểm này, bạn chỉ mới làm việc với các **local repository** (kho chứa cục bộ) nằm ngay trên máy tính của mình.                                                             |
| Chương này đánh dấu sự khởi đầu của Phần 2, nơi chúng ta sẽ làm việc với các **dịch vụ hosting** và **remote repository** (kho chứa từ xa).                                             |
| Mục tiêu của chương này là giúp bạn chọn một dịch vụ hosting và thiết lập cơ chế xác thực (authentication) để kết nối an toàn đến remote repository thông qua giao thức HTTPS hoặc SSH. |

## Hosting Services và Remote Repositories

Trong [Chương 2](/vi/blog/git-02-local-repositories), tôi đã đề cập đến hai loại repository:

- **Local Repository**: Nằm trên máy tính cá nhân của bạn.
- **Remote Repository**: Được lưu trữ trên một dịch vụ hosting "trên mây" (cloud).

**Hosting Service** là các nền tảng cung cấp dịch vụ lưu trữ cho các dự án Git. Ba dịch vụ phổ biến nhất hiện nay là:

1. **GitHub** (Phổ biến nhất, sở hữu bởi Microsoft).
2. **GitLab** (Mạnh về DevOps/CI/CD).
3. **Bitbucket** (Sở hữu bởi Atlassian, tích hợp tốt với Jira).

Để chuyển dữ liệu giữa Local và Remote repository, bạn cần kết nối và xác thực danh tính. Từ [Chương 7](/vi/blog/git-07-remote-repos) trở đi, bạn sẽ sử dụng các lệnh như `git push`, `git clone`, `git fetch`, và `git pull` để tải lên và tải xuống dữ liệu. Để làm được điều đó, bạn cần thiết lập xác thực ngay bây giờ.

## Thiết lập tài khoản Hosting Service

Nếu bạn chưa có tài khoản, hãy chọn một dịch vụ và đăng ký.
Trong loạt bài này, chúng ta sẽ sử dụng **GitHub** làm ví dụ chính vì đây là nền tảng phổ biến nhất trong cộng đồng mã nguồn mở.

> **[ Thực Hành 6-1 ]**
>
> 1. Truy cập [github.com](https://github.com).
> 2. Đăng ký một tài khoản miễn phí (hoặc đăng nhập nếu bạn đã có).

## Thiết lập Xác thực (Authentication Credentials)

Khi làm việc với Remote Repository, có hai cách để bạn tương tác:

1. Thao tác trực tiếp trên website của hosting service.
2. Thao tác từ dòng lệnh (terminal) trên máy tính của bạn và đồng bộ lên server.

Trường hợp 2 đòi hỏi "Xác thực" (Authentication) để server biết bạn là ai và bạn có quyền ghi dữ liệu vào repository đó hay không.
Có hai giao thức chính để kết nối: **HTTPS** và **SSH**.

| Giao thức | Ưu điểm                                                                                                                                       | Nhược điểm                                                                                                                                                        |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTPS** | Dễ hiểu, hoạt động qua tường lửa dễ dàng.                                                                                                     | Cần nhập mật khẩu (hoặc Personal Access Token) thường xuyên nếu không dùng Credential Helper. Không còn hỗ trợ mật khẩu đăng nhập thông thường (phải dùng Token). |
| **SSH**   | Bảo mật cao, không cần nhập mật khẩu mỗi lần push (nếu dùng SSH key không passphrase hoặc có ssh-agent). Chuẩn mực cho môi trường Linux/Unix. | Cần thiết lập ban đầu phức tạp hơn một chút.                                                                                                                      |

**Lời khuyên cho người dùng Linux:** Hãy sử dụng **SSH**. Đây là phương pháp "chuẩn bài" (native) cho môi trường Unix/Linux, giúp bạn quản lý khóa bảo mật tốt hơn và không phải lo lắng về việc quản lý Personal Access Token hết hạn sau mỗi 30-90 ngày như HTTPS.

### 1. Sử dụng HTTPS (Tùy chọn)

Nếu bạn chọn HTTPS, bạn **không thể** sử dụng mật khẩu đăng nhập GitHub của mình để push code. Thay vào đó, bạn phải tạo một **Personal Access Token (PAT)**.

- Trên GitHub: Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token.
- Khi Git hỏi mật khẩu ở terminal, hãy dán chuỗi Token này vào.

_(Phần này chúng ta sẽ lướt qua để tập trung vào SSH)._

### 2. Sử dụng SSH (Khuyên dùng cho Linux)

Giao thức SSH (Secure Shell) sử dụng một cặp khóa (key pair):

- **Public Key (Khóa công khai):** Bạn đưa cho GitHub (khóa này công khai, không cần giấu kỹ).
- **Private Key (Khóa bí mật):** Bạn giữ trên máy tính của mình (tuyệt đối không chia sẻ cho ai).

Khi kết nối, GitHub sẽ dùng Public Key để mã hóa một thông điệp và thách thức máy tính của bạn giải mã nó bằng Private Key. Nếu giải mã thành công, bạn được xác thực.

#### Hướng dẫn thiết lập SSH trên Ubuntu/Linux

Hãy làm theo từng bước sau để tạo và thêm SSH key vào GitHub.

**Bước 1: Kiểm tra SSH key hiện có**

Mở terminal và chạy:

```bash
ls -al ~/.ssh
```

Nếu bạn thấy các file như `id_rsa.pub`, `id_ecdsa.pub` hoặc `id_ed25519.pub`, nghĩa là bạn đã có key. Bạn có thể dùng lại hoặc tạo mới. Hôm nay chúng ta sẽ tạo mới loại key hiện đại nhất là **Ed25519**.

**Bước 2: Tạo SSH key mới**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

_(Thay `your_email@example.com` bằng email bạn dùng đăng ký GitHub)_

Khi được hỏi:

1. `Enter file in which to save the key`: Nhấn **Enter** để chọn mặc định.
2. `Enter passphrase`:
   - Nhập mật khẩu để bảo vệ key (khi dùng key sẽ phải nhập pass này).
   - Hoặc nhấn **Enter** để để trống (không khuyến khích về mặt bảo mật, nhưng tiện lợi hơn).

**Bước 3: Thêm key vào SSH Agent**

SSH Agent là chương trình chạy ngầm giúp quản lý các key và nhớ passphrase cho bạn.

1. Khởi động agent:

```bash
eval "$(ssh-agent -s)"
# Output: Agent pid 1234
```

1. Thêm Private Key vào agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

**Bước 4: Copy Public Key**

Dùng lệnh `cat` để hiển thị nội dung khóa công khai:

```bash
cat ~/.ssh/id_ed25519.pub
```

Kết quả sẽ là một chuỗi bắt đầu bằng `ssh-ed25519 ...`. Hãy copy toàn bộ chuỗi này.

**Bước 5: Thêm key vào GitHub**

1. Truy cập [GitHub SSH Keys Settings](https://github.com/settings/keys).
2. Nhấn nút **New SSH key**.
3. **Title**: Đặt tên gợi nhớ (ví dụ: `My Ubuntu Laptop`).
4. **Key type**: Để mặc định (Authentication Key).
5. **Key**: Paste chuỗi public key bạn vừa copy vào đây.
6. Nhấn **Add SSH key**.

**Bước 6: Kiểm tra kết nối**

Quay lại terminal, chạy lệnh test:

```bash
ssh -T git@github.com
```

- Bạn có thể thấy cảnh báo: `The authenticity of host 'github.com ...' can't be established... Are you sure you want to continue connecting (yes/no/[fingerprint])?` -> Gõ **yes** rồi Enter.
- Nếu thành công, bạn sẽ thấy:
  > Hi username! You've successfully authenticated, but GitHub does not provide shell access.

## Tổng Kết

Trong chương này, bạn đã thực hiện hai bước chuẩn bị quan trọng:

1. Chọn và tạo tài khoản trên dịch vụ hosting (GitHub).
2. Thiết lập xác thực an toàn bằng SSH (hoặc HTTPS).

Giờ đây, bạn đã có "giấy thông hành" để kết nối máy tính của mình với thế giới mã nguồn mở.
Trong [Chương 7](/vi/blog/git-07-remote-repos), chúng ta sẽ bắt tay vào tạo Remote Repository đầu tiên và đẩy code của dự án `rainbow` lên đó.
