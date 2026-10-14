using System.ComponentModel.DataAnnotations;

namespace NTK.EBarCode.Api.Dtos;

/// <summary>
/// Data transfer object for barcode generation request
/// </summary>
public class GenerateBarcodeRequest
{
    /// <summary>
    /// The data to encode in the barcode
    /// </summary>
    [Required]
    public string Data { get; set; } = string.Empty;

    /// <summary>
    /// The barcode format (e.g., QR_CODE, CODE_128, EAN_13)
    /// </summary>
    [Required]
    public string Format { get; set; } = "QR_CODE";

    /// <summary>
    /// Optional width of the barcode image (in pixels)
    /// </summary>
    public int? Width { get; set; }

    /// <summary>
    /// Optional height of the barcode image (in pixels)
    /// </summary>
    public int? Height { get; set; }
}

/// <summary>
/// Data transfer object for barcode generation response
/// </summary>
public class GenerateBarcodeResponse
{
    /// <summary>
    /// Base64 encoded barcode image
    /// </summary>
    public string ImageBase64 { get; set; } = string.Empty;

    /// <summary>
    /// The barcode format used
    /// </summary>
    public string Format { get; set; } = string.Empty;

    /// <summary>
    /// The encoded data
    /// </summary>
    public string Data { get; set; } = string.Empty;

    /// <summary>
    /// Width of the generated image
    /// </summary>
    public int Width { get; set; }

    /// <summary>
    /// Height of the generated image
    /// </summary>
    public int Height { get; set; }
}

/// <summary>
/// Data transfer object for barcode validation request
/// </summary>
public class ValidateBarcodeRequest
{
    /// <summary>
    /// Base64 encoded barcode image to validate
    /// </summary>
    [Required]
    public string ImageBase64 { get; set; } = string.Empty;

    /// <summary>
    /// Expected barcode format (optional)
    /// </>
    public string? ExpectedFormat { get; set; }

    /// <summary>
    /// Expected data (optional)
    /// </summary>
    public string? ExpectedData { get; set; }
}

/// <summary>
/// Data transfer object for barcode validation response
/// </summary>
public class ValidateBarcodeResponse
{
    /// <summary>
    /// Whether the barcode is valid
    /// </summary>
    public bool IsValid { get; set; }

    /// <summary>
    /// Detected barcode format
    /// </summary>
    public string? DetectedFormat { get; set; }

    /// <summary>
    /// Decoded data from the barcode
    /// </summary>
    public string? DecodedData { get; set; }

    /// <summary>
    /// Validation errors if any
    /// </summary>
    public List<string> Errors { get; set; } = new List<string>();
}