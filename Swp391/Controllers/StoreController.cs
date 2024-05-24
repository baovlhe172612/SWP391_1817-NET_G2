using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swp391.Models;
using Swp391.Service;

namespace Swp391.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        /// <summary>
        /// Phuơng thức Patch của api/stores => cập nhật lại trường IsDelete
        /// </summary>
        [HttpPatch("delete/{id}")]
        public IActionResult updateStoreById(int id)
        {
            // Xóa Store => cập nhập lại isDelete
            var store = storeService.UpdateStoreService(id, 1);

            //
            if (store != null)
            {
                return Ok(new
                {
                    id = id,
                    store = store,
                });

            }
            else
            {
                return BadRequest(new
                {
                    Success = false,
                    Data = store
                });
            }
        }

        /// <summary>
        /// Phuơng thức GET của api/stores => Get Store theo id
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult getStoreById(int id)
        {
            var store = storeService.FindStoreById(id);

            //
            if (store != null)
            {
                return Ok(store);

            }
            else
            {
                return BadRequest(new
                {
                    Success = false,
                    Data = store
                });
            }
        }

        /// <summary>
        /// Phuơng thức GET của api/stores => Get Store theo id
        /// </summary>
        [HttpPatch("PATCH")]
        public IActionResult UpdateStore(Store store) {
            var storeNew = storeService.UpdateStoreAdmin(store);

            //
            if (storeNew != null)
            {
                return Ok(store);

            }
            else
            {
                return BadRequest(new
                {
                    Success = false,
                    Data = store
                });
            }
        }

    }

}