# onboarding — NTK.EBarCode

این مخزن در زمان bootstrap فاقد source، solution، package manifest، سرویس اجراشدنی و فایل legacy است. ساختار karavi از starter-kit canonical ایجاد شده و هیچ فایل یا مقدار پروژهٔ دیگری وارد نشده است.

## شناسه محصول

- productId: NTK.EBarCode
- consumer نسخه یا host فعال فعلاً وجود ندارد؛ manifest عمداً hosts: {} دارد.

## host و stack

دامنهٔ canonical وب production: https://ebarcode.ir است. Staging، API و panel تا زمان وجود consumer و مالکیت تأییدشده تعریف نمی‌شوند. enabledStacks نیز فعلاً [] است.

## FTP و تست

فایل‌های Deploy_FTP.info و Deploy_TestUsers.info ساخته نشده‌اند. نمونه‌ها فقط برای پیکربندی محلی آینده هستند و هرگز نباید commit شوند. هیچ Deploy یا انتقال remote در این bootstrap انجام نشده است.

## migration پلن‌ها

در bootstrap فعلی legacy داخل این مخزن وجود نداشت؛ بنابراین migration انجام نشد.

## verify

    .\karavi\karavi.scripts.tools\verify.karavi-structure.ps1

## اولین پلن

karavi/karavi.plans.prompt/cursor/Karavi.001.plan.md
