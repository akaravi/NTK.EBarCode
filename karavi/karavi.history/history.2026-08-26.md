# history — 2026-08-26

## 2026-08-26 (Asia/Tehran) — bootstrap karavi

- **درخواست:** اجرای قانون karavi در مخزن NTK.EBarCode.
- **تغییرات:** نصب starter-kit canonical؛ تنظیم productId؛ خالی‌سازی host، target و stackهای فاقد پشتوانه؛ تکمیل onboarding و plan.
- **تأیید:** ساختار karavi، parse فایل‌های JSON، بررسی UTF-8 و secret scan با تفکیک فایل‌های example انجام شد.
- **یادداشت:** در مخزن پیش از bootstrap فایل legacy، source محصول، host یا credential واقعی وجود نداشت؛ هیچ انتقال remote انجام نشد.

## 2026-08-26 (Asia/Tehran) — تغییر دامنه

- **درخواست:** تغییر دامنهٔ پروژه به ebarcode.ir.
- **تغییرات:** دامنهٔ canonical وب و health به https://ebarcode.ir تغییر کرد؛ staging، API و panel بدون host باقی ماندند چون consumer یا مقصد تأییدشده ندارند.
- **تصمیم:** ارجاع‌های qrcode-tiger.com در design-system حفظ شدند؛ آن‌ها reference خارجی طراحی هستند، نه domain محصول.
- **تأیید:** inventory دامنه، JSON parse، بررسی encoding و secret scan.
