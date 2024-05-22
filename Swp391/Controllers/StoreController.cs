using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swp391.Models;
using Swp391.Service;

namespace Swp391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class stores : ControllerBase
    {
        private StoreService _service = new StoreService();

        [HttpGet]
        public IActionResult getAllStore()
        {
            return Ok(_service.getAllStore());
        }

        // [HttpPost]
        // public IActionResult createStoreController(Store store) {
        //     return Ok(store);
        // }
    }
}