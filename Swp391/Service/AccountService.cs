using Swp391.Models;
using Swp391.Repository;
using Swp391.Dtos;   
namespace Swp391.Service
{
    public class AccountService
    {
        AccountRepo _accountRepo = new AccountRepo();

        /// <summary>
        /// lấy toàn bộ sản phẩm bằng service
        /// </summary>

        /// <returns>trả về toàn bộ tài khoản</returns>
        public async Task<List<AccountDtos>> GetAllAccountAsync()
        {
            return await _accountRepo.GetAllAccountsAsync();
        }
    }
}
