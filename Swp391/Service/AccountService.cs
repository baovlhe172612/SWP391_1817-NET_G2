using Swp391.Models;
using Swp391.Repository;
using Swp391.Dtos;   
namespace Swp391.Service
{
    public class AccountService
    {

       AccountRepo _accountRepo= new AccountRepo();
        /// <summary>
        /// lấy toàn bộ sản phẩm bằng service
        /// </summary>

        /// <returns>trả về toàn bộ account + roleName</returns>
        public List<AccountDtos> GetAllAccountDtos()
        {
            return _accountRepo.GetAllAccountsAsync();           
        }

        // Các phương thức khác của AccountService
    }
}
