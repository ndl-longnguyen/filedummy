# Hướng Dẫn Tích Hợp NDL Ecosystem Bar Cho Các Website Khác

Tài liệu này hướng dẫn cách đưa thanh điều hướng liên kết hệ sinh thái **NDL Ecosystem Bar** vào các dự án khác trong mạng lưới `*.ndlong.site` (ví dụ: `clicker2top`, `cong-cu-tinh-lai-ngan-hang`, `tygia-hub`, `image-compression`).

---

## 1. Mục Tiêu

- Đồng bộ nhận diện thương hiệu mạng lưới **NDL Network** (`ndlong.site`).
- Tự động luân chuyển người dùng (traffic circulation) giữa các dự án mà không tốn chi phí quảng cáo.
- Xây dựng mạng lưới liên kết nội bộ chéo (Cross-Domain Internal Backlinks) giúp tăng độ uy tín SEO (Domain Authority) cho toàn bộ tên miền con `*.ndlong.site`.

---

## 2. Các File Cần Copy Vào Dự Án Mới

Chỉ cần copy 2 file sau từ `sample-files` sang dự án đích (ví dụ `clicker2top`):

1. **`lib/ecosystem.ts`** -> Đặt tại `src/lib/ecosystem.ts` hoặc `lib/ecosystem.ts`
2. **`components/NdlEcosystemBar.tsx`** -> Đặt tại `src/components/NdlEcosystemBar.tsx` hoặc `components/NdlEcosystemBar.tsx`

---

## 3. Cách Tích Hợp Vào `Navbar.tsx` (Gọn Gàng, Không Chiếm Diện Tích Header)

Chỉ cần đặt component `<NdlAppLauncher />` vào cụm nút chức năng bên phải của thanh Navbar:

```tsx
import { NdlAppLauncher } from "@/components/NdlEcosystemBar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand của site */}
        <Logo />

        {/* Menu điều hướng chính của site */}
        <NavLinks />

        {/* Cụm Action: NDL Apps Switcher + Nút chức năng chính */}
        <div className="flex items-center gap-2">
          <NdlAppLauncher />
          <PrimaryButton />
        </div>
      </div>
    </header>
  );
}
```

> [!TIP]
> Nút `<NdlAppLauncher />` được thiết kế theo phong cách App Launcher 9-dot quen thuộc (như của Google/Microsoft), không chiếm bất kỳ dòng header phụ nào của website gốc, giữ cho người dùng tập trung hoàn toàn vào nội dung chính của site.

### Đánh Dấu Sản Phẩm Hiện Tại
Trong file `lib/ecosystem.ts` của từng dự án, bạn chỉ cần chỉnh cờ `isCurrent: true` cho đúng sản phẩm đó:
- Nếu đang ở `clicker2top`: đặt `isCurrent: true` cho `clicker2top`.
- Nếu đang ở `tygia-hub`: đặt `isCurrent: true` cho `tygia`.
- Khi đó, thanh bar sẽ tự động làm nổi bật nhãn `(Here)` cho đúng website mà người dùng đang truy cập.

---

## 4. Thư Viện Icon Yêu Cầu
Component sử dụng các icon từ thư viện `lucide-react`:
```bash
npm install lucide-react
```
Icons sử dụng: `Globe`, `ChevronDown`, `ExternalLink`, `X`, `Wrench`, `Coins`, `Gamepad2`, `Share2`, `Image`, `TrendingUp`, `Dices`, `Tv`, `Sparkles`.

---

## 5. Danh Sách Tên Miền Chính Trong Hệ Sinh Thái NDL

| Subdomain | Dự Án | Mục Đích |
|---|---|---|
| `filedummy.ndlong.site` | `sample-files` | Tải file mẫu dummy, tester tools |
| `click.ndlong.site` | `clicker2top` | Game clicker arcade, Nations Cup |
| `laisuat.ndlong.site` | `cong-cu-tinh-lai-ngan-hang` | Bảng tính lãi suất vay & tiết kiệm |
| `tygia.ndlong.site` | `tygia-hub` | Tỷ giá ngoại tệ, vàng trực tiếp |
| `image.ndlong.site` | `image-compression` | Nén & tối ưu hóa ảnh |
| `s.ndlong.site` | `short-link` | Rút gọn link |
| `fb.ndlong.site` | `fb-download` | Tải video mạng xã hội |
| `ndlong.site` | `my-profile` / Hub | Portal trung tâm hệ sinh thái |
