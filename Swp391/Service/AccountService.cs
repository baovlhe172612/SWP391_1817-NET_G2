using Swp391.Models;
using Swp391.Repository;
using Swp391.Dtos;   
namespace Swp391.Service
{
    public class AccountService
    {
       AccountRepo _accountRepo= new AccountRepo();
        public List<AccountDtos> GetAllAccountDtos()
        {
            return _accountRepo.GetAllAccountsAsync();           
        }

        // Các phương thức khác của AccountService
    }
}
