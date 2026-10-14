import { Injectable, signal } from '@angular/core';

export type Locale = 'fa-IR' | 'en-US';

const translations: Record<Locale, Record<string, string>> = {
  'fa-IR': {
    'meta.title': 'NTK.EBarCode | ساخت و اعتبارسنجی QR',
    'nav.products': 'محصولات', 'nav.solutions': 'راهکارها', 'nav.learn': 'راهنما', 'nav.pricing': 'قیمت‌ها', 'nav.faq': 'پرسش‌های رایج',
    'nav.login': 'ورود', 'nav.register': 'ثبت‌نام', 'nav.language': 'فارسی', 'nav.switchLanguage': 'تغییر زبان به انگلیسی',
    'footer.tagline': 'ساخت و اعتبارسنجی QR code به‌صورت محلی.',
    'hero.eyebrow': 'مولد NTK.EBarCode', 'hero.title': 'کد QR بسازید که همه‌جا کار کند.',
    'hero.copy': 'برای لینک، مخاطب، وای‌فای، منو، فایل و بیشتر، کد QR بسازید، اعتبارسنجی و شخصی‌سازی کنید و دانلود بگیرید.',
    'hero.create': 'ساخت QR رایگان', 'hero.validate': 'اعتبارسنجی QR',
    'workspace.generate': 'ساخت QR', 'workspace.validate': 'اعتبارسنجی QR',
    'step.one': 'گام ۱', 'step.two': 'گام ۲', 'step.check': 'بررسی',
    'generator.chooseTitle': 'محتوای QR را انتخاب کنید', 'generator.chooseCopy': 'نوع QR را انتخاب کرده و محتوای موردنظر را وارد کنید.',
    'generator.static': 'QR ثابت', 'generator.staticCopy': 'دادهٔ دائمیِ رمزگذاری‌شده', 'generator.dynamic': 'QR پویا', 'generator.dynamicCopy': 'رهگیری نیازمند سرویس حساب است',
    'generator.data': 'دادهٔ {type}', 'generator.width': 'عرض', 'generator.height': 'ارتفاع',
    'generator.required': 'برای ساخت کد QR، محتوا را وارد کنید (حداکثر ۲٬۰۰۰ نویسه).',
    'generator.generate': 'ساخت کد QR', 'generator.generating': 'در حال ساخت…',
    'generator.offline': 'کد ثابت آفلاین کار می‌کند؛ رهگیری QR پویا به سرویس حساب نیاز دارد.',
    'generator.staticSelected': 'حالت ثابت انتخاب شد؛ داده مستقیماً در QR ذخیره می‌شود.',
    'generator.dynamicSelected': 'حالت پویا انتخاب شد؛ رهگیری اسکن به سرویس حساب متصل نیاز دارد.',
    'generator.typeSelected': 'QR نوع {type} انتخاب شد.', 'generator.generatingMessage': 'کد QR شما در حال ساخت است…',
    'generator.ready': 'کد QR برای دانلود آماده است.', 'generator.unavailable': 'ساخت QR در دسترس نیست. API محلی را اجرا کرده و دوباره تلاش کنید.',
    'customize.title': 'QR خود را شخصی‌سازی کنید', 'customize.copy': 'پیش از ساخت، ظاهر کد را انتخاب کنید.',
    'customize.pattern': 'الگو', 'customize.eyes': 'چشم‌ها', 'customize.colors': 'رنگ‌ها', 'customize.frame': 'قاب', 'customize.templates': 'قالب‌ها',
    'customize.foreground': 'رنگ پیش‌زمینه', 'customize.background': 'رنگ پس‌زمینه', 'customize.frameLabel': 'متن قاب',
    'customize.prepares': 'گزینهٔ {name} یک preset ظاهری آماده می‌کند. تصویر API برای اسکن مطمئن، پرکنتراست باقی می‌ماند.',
    'preview.live': 'پیش‌نمایش زنده', 'preview.empty': 'برای دیدن نتیجه، یک کد QR بسازید.', 'preview.download': 'دانلود PNG', 'preview.alt': 'کد QR ساخته‌شده از نوع {type}',
    'validator.title': 'اعتبارسنجی یک کد QR', 'validator.copy': 'یک تصویر QR بارگذاری کنید تا محتوا و اعتبار آن بررسی شود.',
    'validator.chooseImage': 'تصویر QR را انتخاب کنید', 'validator.fileHint': 'PNG، JPG یا WebP تا ۲ مگابایت',
    'validator.expected': 'محتوای مورد انتظار (اختیاری)', 'validator.expectedPlaceholder': 'محتوای رمزگشایی‌شدهٔ مورد انتظار',
    'validator.validate': 'اعتبارسنجی QR', 'validator.validating': 'در حال اعتبارسنجی…',
    'validator.valid': 'کد QR معتبر است', 'validator.invalid': 'اعتبارسنجی کد QR ناموفق بود', 'validator.format': 'فرمت: {value}', 'validator.content': 'محتوا: {value}',
    'validator.ready': 'فایل {name} برای اعتبارسنجی آماده است.', 'validator.fileError': 'یک تصویر کوچک‌تر از ۲ مگابایت انتخاب کنید.',
    'validator.unavailable': 'اعتبارسنجی در دسترس نیست. API محلی را اجرا کرده و دوباره تلاش کنید.',
    'type.url': 'نشانی', 'type.vcard': 'کارت تماس', 'type.file': 'فایل', 'type.link': 'صفحه لینک', 'type.google': 'فرم گوگل', 'type.menu': 'منو', 'type.app': 'فروشگاه اپ', 'type.landing': 'صفحه فرود', 'type.social': 'شبکه اجتماعی', 'type.gs1': 'GS1', 'type.mp3': 'MP3', 'type.video': 'ویدئو', 'type.wifi': 'وای‌فای',
    'hint.url': 'https://example.com', 'hint.vcard': 'نام، تلفن یا اطلاعات مخاطب', 'hint.file': 'نشانی قابل‌اشتراک فایل', 'hint.link': 'نشانی صفحه فرود', 'hint.google': 'نشانی فرم', 'hint.menu': 'نشانی منو', 'hint.app': 'نشانی فروشگاه اپ', 'hint.landing': 'نشانی صفحه فرود', 'hint.social': 'نشانی پروفایل اجتماعی', 'hint.gs1': 'اطلاعات محصول GS1', 'hint.mp3': 'نشانی فایل صوتی', 'hint.video': 'نشانی ویدئو', 'hint.wifi': 'WIFI:T:WPA;S:network;P:password;;',
    'about.title': 'دربارهٔ NTK.EBarCode', 'about.whatTitle': 'NTK.EBarCode چیست؟', 'about.whatCopy': 'ابزاری رایگان برای ساخت و اعتبارسنجی بارکد و کد QR با فناوری‌های مدرن وب است.', 'about.featuresTitle': 'امکانات', 'about.feature.generate': 'ساخت کد QR', 'about.feature.generateCopy': 'ساخت کد QR برای متن، نشانی، اطلاعات تماس و محتوای دیگر.', 'about.feature.validate': 'اعتبارسنجی', 'about.feature.validateCopy': 'بررسی تصویر QR و مشاهدهٔ محتوای رمزگشایی‌شده.', 'about.feature.customize': 'شخصی‌سازی', 'about.feature.customizeCopy': 'انتخاب رنگ و قاب بدون کاهش خوانایی کد.', 'about.techTitle': 'فناوری', 'about.techCopy': 'رابط کاربری با Angular و API محلی با ASP.NET Core ساخته شده است.',
    'contact.title': 'تماس با ما', 'contact.copy': 'برای دریافت راهنمایی با ما در ارتباط باشید:',
  },
  'en-US': {
    'meta.title': 'NTK.EBarCode | QR generation and validation',
    'nav.products': 'Products', 'nav.solutions': 'Solutions', 'nav.learn': 'Learn', 'nav.pricing': 'Pricing', 'nav.faq': 'FAQ', 'nav.login': 'Log in', 'nav.register': 'Register', 'nav.language': 'English', 'nav.switchLanguage': 'Switch language to Persian',
    'footer.tagline': 'Generate and validate QR codes locally.', 'hero.eyebrow': 'NTK.EBarCode generator', 'hero.title': 'Create QR codes that work everywhere.', 'hero.copy': 'Build QR codes for URLs, contacts, Wi-Fi, menus, files, and more. Generate, validate, customize, and download from one workspace.', 'hero.create': 'Create a free QR code', 'hero.validate': 'Validate a QR code',
    'workspace.generate': 'Generate QR', 'workspace.validate': 'Validate QR', 'step.one': 'STEP 1', 'step.two': 'STEP 2', 'step.check': 'CHECK', 'generator.chooseTitle': 'Choose QR content', 'generator.chooseCopy': 'Select a QR type and enter the content to encode.', 'generator.static': 'Static QR', 'generator.staticCopy': 'Permanent encoded data', 'generator.dynamic': 'Dynamic QR', 'generator.dynamicCopy': 'Tracking needs an account service', 'generator.data': '{type} data', 'generator.width': 'Width', 'generator.height': 'Height', 'generator.required': 'Enter content to generate a QR code (up to 2,000 characters).', 'generator.generate': 'Generate QR code', 'generator.generating': 'Generating…', 'generator.offline': 'Static codes work offline. Dynamic tracking requires a future account service.', 'generator.staticSelected': 'Static mode is selected. Your data is encoded directly in the QR code.', 'generator.dynamicSelected': 'Dynamic mode is selected. Scan tracking requires a connected account service.', 'generator.typeSelected': '{type} QR selected.', 'generator.generatingMessage': 'Generating your QR code…', 'generator.ready': 'Your QR code is ready to download.', 'generator.unavailable': 'QR generation is unavailable. Start the local API and try again.',
    'customize.title': 'Customize your QR', 'customize.copy': 'Choose a visual treatment before you generate.', 'customize.pattern': 'Pattern', 'customize.eyes': 'Eyes', 'customize.colors': 'Colors', 'customize.frame': 'Frame', 'customize.templates': 'Templates', 'customize.foreground': 'Foreground', 'customize.background': 'Background', 'customize.frameLabel': 'Frame label', 'customize.prepares': 'Selecting {name} prepares a style preset. The generated API image remains high-contrast for reliable scanning.', 'preview.live': 'Live preview', 'preview.empty': 'Generate a QR code to see the final result.', 'preview.download': 'Download PNG', 'preview.alt': 'Generated {type} QR code',
    'validator.title': 'Validate a QR code', 'validator.copy': 'Upload a QR image to decode it and check its content.', 'validator.chooseImage': 'Choose a QR image', 'validator.fileHint': 'PNG, JPG, or WebP up to 2 MB', 'validator.expected': 'Expected content (optional)', 'validator.expectedPlaceholder': 'Expected decoded content', 'validator.validate': 'Validate QR code', 'validator.validating': 'Validating…', 'validator.valid': 'QR code is valid', 'validator.invalid': 'QR code could not be validated', 'validator.format': 'Format: {value}', 'validator.content': 'Content: {value}', 'validator.ready': '{name} is ready to validate.', 'validator.fileError': 'Choose an image smaller than 2 MB.', 'validator.unavailable': 'Validation is unavailable. Start the local API and try again.',
    'type.url': 'URL', 'type.vcard': 'vCard', 'type.file': 'File', 'type.link': 'Link page', 'type.google': 'Google form', 'type.menu': 'Menu', 'type.app': 'App store', 'type.landing': 'Landing page', 'type.social': 'Social', 'type.gs1': 'GS1', 'type.mp3': 'MP3', 'type.video': 'Video', 'type.wifi': 'Wi-Fi',
    'hint.url': 'https://example.com', 'hint.vcard': 'Name, phone, or contact card data', 'hint.file': 'A shareable file URL', 'hint.link': 'A landing page URL', 'hint.google': 'A form URL', 'hint.menu': 'A menu URL', 'hint.app': 'An app-store URL', 'hint.landing': 'A landing-page URL', 'hint.social': 'A social profile URL', 'hint.gs1': 'GS1 product data', 'hint.mp3': 'An audio URL', 'hint.video': 'A video URL', 'hint.wifi': 'WIFI:T:WPA;S:network;P:password;;',
    'about.title': 'About NTK.EBarCode', 'about.whatTitle': 'What is NTK.EBarCode?', 'about.whatCopy': 'A free tool for generating and validating barcodes and QR codes with modern web technologies.', 'about.featuresTitle': 'Features', 'about.feature.generate': 'QR code generation', 'about.feature.generateCopy': 'Create QR codes for text, URLs, contact details, and more.', 'about.feature.validate': 'Validation', 'about.feature.validateCopy': 'Check a QR image and view its decoded content.', 'about.feature.customize': 'Customization', 'about.feature.customizeCopy': 'Choose colors and a frame without compromising scanability.', 'about.techTitle': 'Technology', 'about.techCopy': 'The user interface is built with Angular and the local API uses ASP.NET Core.', 'contact.title': 'Contact us', 'contact.copy': 'We are here to help. Reach out to us at:',
  },
};

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  readonly locale = signal<Locale>(this.readLocale());

  constructor() { this.applyLocale(this.locale()); }

  t(key: string, values: Record<string, string | number> = {}): string {
    const template = translations[this.locale()][key] ?? translations['en-US'][key] ?? key;
    return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`));
  }

  setLocale(locale: Locale): void {
    this.locale.set(locale);
    localStorage.setItem('ntk.locale', locale);
    this.applyLocale(locale);
  }

  toggle(): void { this.setLocale(this.locale() === 'fa-IR' ? 'en-US' : 'fa-IR'); }

  private readLocale(): Locale {
    const stored = localStorage.getItem('ntk.locale');
    return stored === 'en-US' ? 'en-US' : 'fa-IR';
  }

  private applyLocale(locale: Locale): void {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa-IR' ? 'rtl' : 'ltr';
    document.title = this.t('meta.title');
  }
}
