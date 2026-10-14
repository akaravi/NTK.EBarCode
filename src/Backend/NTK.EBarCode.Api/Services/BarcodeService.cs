using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using ZXing;
using ZXing.Common;
using ZXing.Rendering;
using NTK.EBarCode.Api.Dtos;

namespace NTK.EBarCode.Api.Services;

/// <summary>
/// Service for barcode generation and validation operations
/// </summary>
public class BarcodeService : IBarcodeService
{
    /// <summary>
    /// Generates a barcode image based on the request parameters
    /// </summary>
    /// <param name="request">The barcode generation request</param>
    /// <returns>The generated barcode response</returns>
    public GenerateBarcodeResponse GenerateBarcode(GenerateBarcodeRequest request)
    {
        // Set default dimensions if not provided
        int width = request.Width ?? 300;
        int height = request.Height ?? 300;

        var format = ParseFormat(request.Format);

        // ZXing picks the right encoder for the requested format. For 1D formats
        // (CODE_128, EAN_13, ...) the encoder draws real bars; for 2D formats
        // (QR_CODE, DATA_MATRIX, ...) it draws the corresponding matrix.
        var writer = new BarcodeWriterPixelData
        {
            Format = format,
            Options = new EncodingOptions
            {
                Width = width,
                Height = height,
                Margin = 10,
                PureBarcode = false
            }
        };

        PixelData pixelData;
        try
        {
            pixelData = writer.Write(request.Data);
        }
        catch (Exception ex)
        {
            // ZXing throws WriterException/ArgumentException when the content does
            // not fit the requested format (e.g. non-digit data for EAN_13).
            throw new ArgumentException($"Data is not valid for {format}: {ex.Message}", ex);
        }

        // Convert to bitmap and then to base64
        using var bitmap = new Bitmap(width, height, PixelFormat.Format32bppArgb);
        using var ms = new MemoryStream();

        // Convert pixel data to bitmap
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                int index = (y * width + x) * 4;
                byte r = pixelData.Pixels[index];
                byte g = pixelData.Pixels[index + 1];
                byte b = pixelData.Pixels[index + 2];
                byte a = pixelData.Pixels[index + 3];
                bitmap.SetPixel(x, y, Color.FromArgb(a, r, g, b));
            }
        }

        bitmap.Save(ms, ImageFormat.Png);
        byte[] imageBytes = ms.ToArray();

        return new GenerateBarcodeResponse
        {
            ImageBase64 = Convert.ToBase64String(imageBytes),
            Format = request.Format,
            Data = request.Data,
            Width = width,
            Height = height
        };
    }

    /// <summary>
    /// Validates a barcode from an image
    /// </summary>
    /// <param name="request">The barcode validation request</param>
    /// <returns>The validation response</returns>
    public ValidateBarcodeResponse ValidateBarcode(ValidateBarcodeRequest request)
    {
        var response = new ValidateBarcodeResponse();

        try
        {
            // Convert base64 to bitmap
            byte[] imageBytes = Convert.FromBase64String(request.ImageBase64);
            using var ms = new MemoryStream(imageBytes);
            using var bitmap = new Bitmap(ms);

            // Create barcode reader using generic version
            var reader = new BarcodeReaderGeneric
            {
                Options = new DecodingOptions
                {
                    TryHarder = true,
                    PureBarcode = false
                }
            };

            // Extract raw bytes from bitmap and create LuminanceSource for decoding
            var rect = new System.Drawing.Rectangle(0, 0, bitmap.Width, bitmap.Height);
            var bits = bitmap.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadOnly, bitmap.PixelFormat);
            var rawBytes = new byte[bits.Stride * bitmap.Height];
            System.Runtime.InteropServices.Marshal.Copy(bits.Scan0, rawBytes, 0, rawBytes.Length);
            bitmap.UnlockBits(bits);

            // Decode using RGB32 format (matches Format32bppArgb pixel layout)
            var lum = new RGBLuminanceSource(rawBytes, bitmap.Width, bitmap.Height, RGBLuminanceSource.BitmapFormat.RGB32);
            var result = reader.Decode(lum);

            if (result != null)
            {
                response.IsValid = true;
                response.DetectedFormat = result.BarcodeFormat.ToString();
                response.DecodedData = result.Text;
            }
            else
            {
                response.IsValid = false;
                response.Errors.Add("No barcode detected in the image");
            }

            // Validate against expected values if provided
            if (!string.IsNullOrEmpty(request.ExpectedFormat) &&
                response.DetectedFormat != request.ExpectedFormat)
            {
                response.IsValid = false;
                response.Errors.Add($"Expected format '{request.ExpectedFormat}' but detected '{response.DetectedFormat}'");
            }

            if (!string.IsNullOrEmpty(request.ExpectedData) &&
                response.DecodedData != request.ExpectedData)
            {
                response.IsValid = false;
                response.Errors.Add($"Expected data '{request.ExpectedData}' but decoded '{response.DecodedData}'");
            }
        }
        catch (Exception ex)
        {
            response.IsValid = false;
            response.Errors.Add($"Error processing image: {ex.Message}");
        }

        return response;
    }

    /// <summary>
    /// Maps the requested format string to the ZXing barcode format
    /// </summary>
    /// <param name="format">The format name (e.g. QR_CODE, CODE_128, EAN_13)</param>
    /// <returns>The matching ZXing barcode format</returns>
    /// <exception cref="ArgumentException">Thrown when the format is not supported</exception>
    private static BarcodeFormat ParseFormat(string format)
    {
        return format.ToUpperInvariant() switch
        {
            "QR_CODE" => BarcodeFormat.QR_CODE,
            "CODE_128" => BarcodeFormat.CODE_128,
            "CODE_39" => BarcodeFormat.CODE_39,
            "CODE_93" => BarcodeFormat.CODE_93,
            "EAN_13" => BarcodeFormat.EAN_13,
            "EAN_8" => BarcodeFormat.EAN_8,
            "UPC_A" => BarcodeFormat.UPC_A,
            "UPC_E" => BarcodeFormat.UPC_E,
            "ITF" => BarcodeFormat.ITF,
            "CODABAR" => BarcodeFormat.CODABAR,
            "PDF_417" => BarcodeFormat.PDF_417,
            "DATA_MATRIX" => BarcodeFormat.DATA_MATRIX,
            "AZTEC" => BarcodeFormat.AZTEC,
            _ => throw new ArgumentException($"Unsupported barcode format: {format}")
        };
    }
}

/// <summary>
/// Interface for barcode service
/// </summary>
public interface IBarcodeService
{
    GenerateBarcodeResponse GenerateBarcode(GenerateBarcodeRequest request);
    ValidateBarcodeResponse ValidateBarcode(ValidateBarcodeRequest request);
}
