using Swp391.Models;
using Swp391.Repository;
using Swp391.Dtos;   
namespace Swp391.Service
{
    public class AccountService
    {

       AccountRepo _accountRepo= new AccountRepo();
        /// <summary>
        /// GetAllAccountDtos(): Gọi GetAllAccountsAsync() từ repository để lấy tất cả các tài khoản.
        /// </summary>

        /// <returns>trả về toàn bộ account + roleName</returns>
        public List<AccountDtos> GetAllAccounts_manager()
        {
            return _accountRepo.GetAllAccounts_manager();           
        }

        // Các phương thức khác của AccountService
        // lấy tài khoản bằng ID
        public AccountDtos getAccountById(int id)
        {
            return _accountRepo.getAccountById(id);
        }
        // edit status account
        public void UpdateAccountStatus(int accountId, int newStatus){
            _accountRepo.UpdateAccountStatus(accountId,newStatus);
        }
        //tạo tài khoản mới
        public void createrAccount(Account newAccount)
        {
            _accountRepo.createrAccount(newAccount);
        }
        // xoá tài khoản
        public void updateIsDeleteAccount(int accountId,int isdelete)
        {
            _accountRepo.UpdateisdeleteAccount(accountId,isdelete);
        }
        // ---------------------------------------------------------------------------------------//
        public List<AccountDtos> GetAllAccountEmployeeDtos()
        {
            return _accountRepo.GetAllAccountEmployee();
        }

        public AccountDtos getAccountEmployeeId(int id)
        {
            return _accountRepo.getAccountById(id);
        }
    }


}
