using BE.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swp391.Dtos;

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
        ///       
        [HttpPost("POST")]
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

        [HttpPatch("Update/{id}")]
        public IActionResult Updatestore([FromBody] Store store)
        {
            try
            {
                storeService.UpdateStore(store);
                return Ok(store);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Error = ex.Message
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
        [HttpGet]
        public IActionResult GetAllStore()
        {
            return Ok(storeService.getAllStore());
        }

        [HttpGet("/api/status/{status}")]
        public IActionResult getAllStoreStatus(int status)
        {
            var storeDtos = storeService.GetStoreByStatus(status);

            if (storeDtos != null)
            {
                return Ok(storeDtos);
            } 

            return BadRequest();
        }

        [HttpGet("newStore")]
        public IActionResult GetNewStore()
        {
            var storeDtos = storeService.GetNewStore();

            if (storeDtos != null)
            {
                return Ok(storeDtos);
            } 

            return BadRequest();
        }
    }

}