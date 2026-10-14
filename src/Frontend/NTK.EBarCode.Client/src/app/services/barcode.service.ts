import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenerateBarcodeRequest {
  data: string;
  format: string;
  width?: number;
  height?: number;
}

export interface GenerateBarcodeResponse {
  imageBase64: string;
  format: string;
  data: string;
  width: number;
  height: number;
}

export interface ValidateBarcodeRequest {
  imageBase64: string;
  expectedFormat?: string;
  expectedData?: string;
}

export interface ValidateBarcodeResponse {
  isValid: boolean;
  detectedFormat?: string;
  decodedData?: string;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private apiUrl = '/api'; // Proxied to backend

  constructor(private http: HttpClient) { }

  generateBarcode(request: GenerateBarcodeRequest): Observable<GenerateBarcodeResponse> {
    return this.http.post<GenerateBarcodeResponse>(`${this.apiUrl}/barcode/generate`, request);
  }

  validateBarcode(request: ValidateBarcodeRequest): Observable<ValidateBarcodeResponse> {
    return this.http.post<ValidateBarcodeResponse>(`${this.apiUrl}/barcode/validate`, request);
  }

  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/barcode/health`);
  }
}