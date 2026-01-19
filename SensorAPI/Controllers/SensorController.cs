using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SensorAPI.Data;

namespace SensorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorController : ControllerBase
    {
        private readonly SensorDbContext _context;

        public SensorController(SensorDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.SensorData
                .OrderByDescending(x => x.Timestamp)
                .Take(100)
                .ToListAsync());
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            return Ok(await _context.SensorData
                .OrderByDescending(x => x.Timestamp)
                .Take(20)
                .ToListAsync());
        }
    }
}
