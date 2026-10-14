using Microsoft.AspNetCore.Mvc;
using NTK.EBarCode.Api.Dtos;
using NTK.EBarCode.Api.Services;

namespace NTK.EBarCode.Api.Controllers;

/// <summary>
/// API controller for barcode operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class BarcodeController : ControllerBase
{
    private readonly IBarcodeService _barcodeService;
    private readonly ILogger<BarcodeController> _logger;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="barcodeService">The barcode service</param>
    /// <param name="logger">Logger instance</param>
    public BarcodeController(IBarcodeService barcodeService, ILogger<BarcodeController> logger)
    {
        _barcodeService = barcodeService;
        _logger = logger;
    }

    /// <summary>
    /// Generates a barcode based on the provided data
    /// </summary>
    /// <param name="request">The barcode generation request</param>
    /// <returns>The generated barcode image and metadata</returns>
    [HttpPost("generate")]
    public ActionResult<GenerateBarcodeResponse> Generate([FromBody] GenerateBarcodeRequest request)
    {
        try
        {
            var response = _barcodeService.GenerateBarcode(request);
            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            // Unsupported format or data that cannot be encoded in the requested format
            _logger.LogWarning(ex, "Invalid barcode generation request");
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating barcode");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Validates a barcode from an image
    /// </summary>
    /// <param name="request">The barcode validation request</param>
    /// <returns>The validation result</returns>
    [HttpPost("validate")]
    public ActionResult<ValidateBarcodeResponse> Validate([FromBody] ValidateBarcodeRequest request)
    {
        try
        {
            var response = _barcodeService.ValidateBarcode(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating barcode");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    /// <returns>Health status</returns>
    [HttpGet("health")]
    public ActionResult<Dictionary<string, string>> Health()
    {
        return Ok(new Dictionary<string, string>
        {
            { "status", "healthy" },
            { "service", "NTK.EBarCode.Api" },
            { "timestamp", DateTime.UtcNow.ToString("o") }
        });
    }
}