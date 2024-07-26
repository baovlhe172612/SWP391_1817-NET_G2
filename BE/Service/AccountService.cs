
using Swp391.Repository;
using Swp391.Dtos;
using BE.Models;
using Microsoft.AspNetCore.Mvc;
namespace Swp391.Service
{
    public class AccountService
    {

       AccountRepo _accountRepo= new AccountRepo();
        /// <summary>
        /// lấy toàn bộ sản phẩm bằng service
        /// </summary>

        /// <returns>trả về toàn bộ account + roleName</returns>
        public List<AccountDtos> GetAllAccounts_manager([FromQuery] string status, [FromQuery] string isDeleted, [FromQuery] string search)
        {
            return _accountRepo.GetAllAccounts_manager( status,isDeleted, search);           
        }

        // getALlAccount

        public List<Account> getAllAccount()
        {
            return _accountRepo.getAllAccount();
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
        //update full account
        public void UpdateAccount(Account newAccount)
        {
            _accountRepo.UpdateAccount(newAccount);
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

        /////////////////////////////////////////////'
        public List<AccountDtos> GetAllAccountEmployeeDtos()
        {
            return _accountRepo.GetAllAccountEmployee();
        }

        public AccountDtos getAccountEmployeeId(int id)
        {
            return _accountRepo.getAccountEmployeeId(id);
        }

        public Account UpdateAccountV2(Account account) {
            return _accountRepo.UpdateAccountV2(account);
        }

        public void DeletePassword(int accountId)
        {
            _accountRepo.DeletePassword(accountId);
        }
        public void UpdatePassword(int accountId, string newPassword)
        {
            _accountRepo.UpdatePassword(accountId, newPassword);
        }

    }
}
