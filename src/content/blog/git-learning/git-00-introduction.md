---
title: "Giới thiệu: Hành trình làm chủ Git"
slug: "git-00-introduction"
date: 2025-09-10
tags: ["git", "tutorial", "version-control"]
lang: "vi"
series: "Learning Git"
seriesOrder: 0
excerpt: "Bài 0 trong series Learning Git: Giới thiệu: Hành trình làm chủ Git"
---

Chào mừng các bạn đến với loạt bài viết **"Learning Git"** — được biên soạn dựa trên cuốn sách "Learning Git A Hands-On and Visual Guide to the Basics of Git" của tác giả **Anna Skoulikari**.

Mục tiêu của series là cung cấp một tài liệu kỹ thuật chất lượng cao (technical deep dive) giúp bạn hiểu rõ bản chất của Git, từ những khái niệm cốt lõi đến các kỹ thuật nâng cao.

## Tại sao lại là Git?

Git không chỉ là một công cụ; nó là tiêu chuẩn công nghiệp cho version control (quản lý phiên bản). Dù bạn là lập trình viên, DevOps engineer, hay technical writer, việc nắm vững Git là kỹ năng bắt buộc.

Trong loạt bài này, chúng ta sẽ không đi theo lối mòn "học vẹt" các câu lệnh. Thay vào đó, chúng ta sẽ xây dựng **mô hình tư duy (mental model)** về cách Git hoạt động bên dưới, giúp bạn tự tin xử lý mọi tình huống—kể cả những "thảm họa" merge conflict hay rebase phức tạp nhất.

## Lộ trình học tập

Series này bao gồm 12 chương chính và các phụ lục, dẫn dắt bạn từ con số 0 đến khi thành thạo:

### Phần 1: Nền tảng (Foundations)

- **[Chương 1: Git và Command Line](/blog/git-01-command-line)**: Làm quen với giao diện dòng lệnh, cài đặt Git và các thao tác cơ bản.
- **[Chương 2: Local Repositories](/blog/git-02-local-repositories)**: Khởi tạo kho chứa, hiểu về Working Directory và Staging Area.
- **[Chương 3: Making a Commit](/blog/git-03-making-commit)**: Quy trình tạo commit và lưu trữ phiên bản.

### Phần 2: Phân nhánh và Hợp nhất (Branching & Merging)

- **[Chương 4: Branches](/blog/git-04-branches)**: Tạo, chuyển đổi và quản lý các nhánh phát triển song song.
- **[Chương 5: Merging](/blog/git-05-merging)**: Hợp nhất các nhánh và xử lý Fast-forward merge.

### Phần 3: Remote & Collaboration

- **[Chương 6: Hosting Services & Authentication](/blog/git-06-hosting-auth)**: Làm việc với GitHub/GitLab và cơ chế xác thực.
- **[Chương 7: Remote Repositories](/blog/git-07-remote-repos)**: Đẩy code lên kho chứa từ xa.
- **[Chương 8: Cloning & Fetching](/blog/git-08-cloning)**: Sao chép kho chứa và đồng bộ dữ liệu.

### Phần 4: Kỹ thuật nâng cao (Advanced Techniques)

- **[Chương 9: Three-Way Merges](/blog/git-09-three-way-merge)**: Hợp nhất phức tạp khi lịch sử không tuyến tính.
- **[Chương 10: Merge Conflicts](/blog/git-10-merge-conflicts)**: Xử lý xung đột mã nguồn—kỹ năng quan trọng nhất của developer.
- **[Chương 11: Rebasing](/blog/git-11-rebasing)**: Viết lại lịch sử commit để có một timeline sạch đẹp.
- **[Chương 12: Pull Requests](/blog/git-12-pull-requests)**: Quy trình review code và hợp tác trong nhóm lớn.

## Công cụ cần thiết

Để theo dõi series này hiệu quả nhất, bạn cần chuẩn bị:

1. Máy tính chạy **Linux (Ubuntu)** (khuyến nghị), macOS hoặc Windows.
2. **Terminal**: Công cụ dòng lệnh (Terminal trên Linux/macOS, Git Bash trên Windows).
3. **Text Editor**: Khuyến nghị sử dụng **Visual Studio Code (VS Code)**.
4. **Git**: Phiên bản mới nhất (chúng ta sẽ cài đặt trong Chương 1).

Hãy bắt đầu hành trình chinh phục Git ngay bây giờ!
