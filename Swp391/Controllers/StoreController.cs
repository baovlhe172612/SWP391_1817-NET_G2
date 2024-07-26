using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swp391.Models;
using Swp391.Service;

namespace Swp391.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class stores : ControllerBase
    {
        private StoreService storeService = new StoreService();

        /// <summary>
        /// Phuơng thức POST của api/stores
        /// </summary>
        [HttpPost]
        public IActionResult createStore(Store store)
        {
            var result = storeService.createStoreService(store);

            if (result != null)
            {
                return Ok(result);

            }
            else
            {
                return BadRequest(new
                {
                    Success = false,
                    Data = result
                });
            }
        }
    }
}