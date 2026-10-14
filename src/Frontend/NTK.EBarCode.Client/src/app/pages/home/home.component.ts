import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarcodeService, GenerateBarcodeResponse, ValidateBarcodeResponse } from '../../services/barcode.service';
import { LocalizationService } from '../../services/localization.service';

type QrMode = 'static' | 'dynamic';
type Workspace = 'generate' | 'scan';

interface QrType {
  id: string;
  labelKey: string;
  paths: string[]; // SVG stroke paths (24x24 viewBox), rendered as an icon
  hintKey: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  readonly qrTypes: QrType[] = [
    { id: 'url', labelKey: 'type.url', hintKey: 'hint.url', paths: ['M7 17 17 7', 'M8 7h9v9'] },
    { id: 'vcard', labelKey: 'type.vcard', hintKey: 'hint.vcard', paths: ['M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M4 20a8 8 0 0 1 16 0'] },
    { id: 'file', labelKey: 'type.file', hintKey: 'hint.file', paths: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'] },
    { id: 'link', labelKey: 'type.link', hintKey: 'hint.link', paths: ['M9 17H7A5 5 0 0 1 7 7h2', 'M15 7h2a5 5 0 1 1 0 10h-2', 'M8 12h8'] },
    { id: 'google', labelKey: 'type.google', hintKey: 'hint.google', paths: ['M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'] },
    { id: 'menu', labelKey: 'type.menu', hintKey: 'hint.menu', paths: ['M17 8h1a4 4 0 1 1 0 8h-1', 'M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z'] },
    { id: 'app', labelKey: 'type.app', hintKey: 'hint.app', paths: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'] },
    { id: 'landing', labelKey: 'type.landing', hintKey: 'hint.landing', paths: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h5v-6h4v6h5V9.5'] },
    { id: 'social', labelKey: 'type.social', hintKey: 'hint.social', paths: ['M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M8.59 13.51l6.83 3.98', 'M15.41 6.51 8.59 10.49'] },
    { id: 'gs1', labelKey: 'type.gs1', hintKey: 'hint.gs1', paths: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'] },
    { id: 'mp3', labelKey: 'type.mp3', hintKey: 'hint.mp3', paths: ['M9 18V5l12-2v13', 'M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z', 'M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'] },
    { id: 'video', labelKey: 'type.video', hintKey: 'hint.video', paths: ['M7 4v16l13-8z'] },
    { id: 'wifi', labelKey: 'type.wifi', hintKey: 'hint.wifi', paths: ['M2 9a19 19 0 0 1 20 0', 'M5.5 12.5a13 13 0 0 1 13 0', 'M8.8 16a7 7 0 0 1 6.4 0', 'M12 19.5h.01'] },
  ];

  readonly generateForm: FormGroup;
  readonly validateForm: FormGroup;

  activeWorkspace: Workspace = 'generate';
  selectedType = 'url';
  mode: QrMode = 'static';
  selectedCustomizer = 'pattern';
  isGenerating = false;
  isValidating = false;
  errorMessage = '';
  statusMessage = '';
  generatedBarcode: GenerateBarcodeResponse | null = null;
  validationResult: ValidateBarcodeResponse | null = null;
  uploadedFileName = '';
  foregroundColor = '#1d5c9f';
  backgroundColor = '#ffffff';
  frameLabel = 'Scan me';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly barcodeService: BarcodeService,
    private readonly zone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly i18n: LocalizationService,
  ) {
    this.generateForm = this.formBuilder.nonNullable.group({
      data: ['', [Validators.required, Validators.maxLength(2000)]],
      width: [320, [Validators.min(128), Validators.max(1000)]],
      height: [320, [Validators.min(128), Validators.max(1000)]],
    });
    this.validateForm = this.formBuilder.nonNullable.group({
      imageBase64: ['', Validators.required],
      expectedData: [''],
    });
    effect(() => {
      this.i18n.locale();
      this.statusMessage = '';
      this.errorMessage = '';
    });
  }

  get selectedTypeDetails(): QrType {
    return this.qrTypes.find((type) => type.id === this.selectedType) ?? this.qrTypes[0];
  }

  selectType(type: QrType): void {
    this.selectedType = type.id;
    this.generateForm.controls['data'].setValue('');
    this.generatedBarcode = null;
    this.statusMessage = this.i18n.t('generator.typeSelected', { type: this.i18n.t(type.labelKey) });
  }

  selectMode(mode: QrMode): void {
    this.mode = mode;
    this.statusMessage = mode === 'dynamic'
      ? this.i18n.t('generator.dynamicSelected')
      : this.i18n.t('generator.staticSelected');
  }

  generate(): void {
    if (this.generateForm.invalid || this.isGenerating) {
      this.generateForm.markAllAsTouched();
      return;
    }

    this.isGenerating = true;
    this.errorMessage = '';
    this.statusMessage = this.i18n.t('generator.generatingMessage');
    const { data, width, height } = this.generateForm.getRawValue();

    this.barcodeService.generateBarcode({ data, format: 'QR_CODE', width, height }).subscribe({
      next: (response) => this.zone.run(() => {
        this.generatedBarcode = response;
        this.isGenerating = false;
        this.statusMessage = this.i18n.t('generator.ready');
        this.changeDetectorRef.detectChanges();
      }),
      error: () => this.zone.run(() => {
        this.isGenerating = false;
        this.errorMessage = this.i18n.t('generator.unavailable');
        this.changeDetectorRef.detectChanges();
      }),
    });
  }

  download(): void {
    if (!this.generatedBarcode) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${this.generatedBarcode.imageBase64}`;
    link.download = `${this.selectedType}-qr-code.png`;
    link.click();
  }

  onQrImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2_000_000) {
      this.errorMessage = this.i18n.t('validator.fileError');
      return;
    }

    this.uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => this.zone.run(() => {
      const result = String(reader.result);
      this.validateForm.controls['imageBase64'].setValue(result.split(',')[1] ?? '');
      this.statusMessage = this.i18n.t('validator.ready', { name: file.name });
      this.changeDetectorRef.detectChanges();
    });
    reader.readAsDataURL(file);
  }

  validate(): void {
    if (this.validateForm.invalid || this.isValidating) {
      this.validateForm.markAllAsTouched();
      return;
    }

    this.isValidating = true;
    this.errorMessage = '';
    const { imageBase64, expectedData } = this.validateForm.getRawValue();
    this.barcodeService.validateBarcode({ imageBase64, expectedData: expectedData || undefined }).subscribe({
      next: (response) => this.zone.run(() => {
        this.validationResult = response;
        this.isValidating = false;
        this.changeDetectorRef.detectChanges();
      }),
      error: () => this.zone.run(() => {
        this.isValidating = false;
        this.errorMessage = this.i18n.t('validator.unavailable');
        this.changeDetectorRef.detectChanges();
      }),
    });
  }
}
