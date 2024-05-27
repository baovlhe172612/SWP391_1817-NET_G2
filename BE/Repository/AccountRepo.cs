using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Swp391.Dtos;
using Swp391.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Swp391.Repository
{
    public class AccountRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ sản phẩm của repository accounts
        /// </summary>

        /// <returns>get all account by linq join between account+rol </returns>

        public List<AccountDtos> GetAllAccounts_manager()
        {

            SwpfinalContext _context = new SwpfinalContext();

            var accountsWithRoles =  (from a in _context.Accounts
                                           join r in _context.Roles on a.RoleId equals r.RoleId
                                           join s in _context.Stores on a.StoreId equals s.StoreId
                                      where r.RoleName == "Manager" && a.IsDelete ==0                                   
                                      select new AccountDtos
                                           {
                                               AccountId = a.AccountId,
                                               UserName = a.UserName,
                                               PassWord = a.PassWord,
                                               Status = a.Status,
                                               Email = a.Email,
                                               FullName = a.FullName,
                                               Location = a.Location,
                                               Phone = a.Phone,
                                               RoleId = a.RoleId,
                                               Token = a.Token,
                                               StoreId = a.StoreId,
                                               RoleName = r.RoleName,
                                               StoreName = s.StoreName,
                                               IsDelete = (int)a.IsDelete,                                               
                                           }                                          
                                           ).ToList();
            return accountsWithRoles;
        }
        /// <summary>
        /// hàm trả về toàn bộ sản phẩm của repository accounts
        /// </summary>

        /// <returns>get all account by linq join between account+rol </returns>
        public AccountDtos getAccountById(int id)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var accountsWithRoles = (from a in _context.Accounts
                                     join r in _context.Roles on a.RoleId equals r.RoleId
                                     join s in _context.Stores on a.StoreId equals s.StoreId
                                     where a.AccountId == id
                                     select new AccountDtos
                                     {
                                         AccountId = a.AccountId,
                                         UserName = a.UserName,
                                         PassWord = a.PassWord,
                                         Status = a.Status,
                                         Email = a.Email,
                                         FullName = a.FullName,
                                         Location = a.Location,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         Token = a.Token,
                                         RoleName = r.RoleName,
                                         StoreName = s.StoreName,
                                         IsDelete = (int)a.IsDelete,
                                     }).FirstOrDefault();

            return accountsWithRoles;
        }
        public void UpdateAccountStatus(int accountId, int newStatus)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var account = _context.Accounts.Find(accountId);

            if (account != null)
            {
                account.Status = newStatus;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Account not found"); // Ném một exception để thông báo lỗi
            }
        }
        // thêm account mới
        public void createrAccount(Account newAccount)
        {
            SwpfinalContext _context = new SwpfinalContext();
            // Kiểm tra xem có tài khoản nào có cùng UserName không
            bool isExisting = _context.Accounts.Any
                (a => (a.UserName == newAccount.UserName)||(a.Email==newAccount.Email)||(a.Phone==newAccount.Phone));

            // Nếu đã tồn tại tài khoản có cùng UserName, ném một ngoại lệ hoặc xử lý theo ý bạn
            if (isExisting)
            {
                throw new Exception("An account with the same username already exists.");
            }
            else
            {
                // Tạo một đối tượng Account từ dữ liệu được truyền vào thông qua newAccount
                Account account = new Account
                {
                    UserName = newAccount.UserName,
                    PassWord = newAccount.PassWord,
                    Status = newAccount.Status,
                    Email = newAccount.Email,
                    FullName = newAccount.FullName,
                    Location = newAccount.Location,
                    Phone = newAccount.Phone,
                    RoleId = newAccount.RoleId,                    
                    Token = String.Empty,
                    IsDelete = newAccount.IsDelete,
                    StoreId = newAccount.StoreId,
                };
                _context.Accounts.Add(account);
                _context.SaveChanges();
            }
        }
        // edit isdelete
        public void UpdateisdeleteAccount(int id, int isdelete)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var account = _context.Accounts.Find(id);
            if (account != null)
            {
                account.IsDelete = isdelete;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Update Fail! Account doesn't not exist");
            }
        }

        /// <summary>
        /// hàm trả về toàn bộ account của employee
        /// </summary>

        /// <returns>get all account by linq join between account+rol </returns>
        public List<AccountDtos> GetAllAccountEmployee()
        {

            SwpfinalContext _context = new SwpfinalContext();

            var accountsWithRoles = (from a in _context.Accounts
                                     join r in _context.Roles on a.RoleId equals r.RoleId
                                     join s in _context.Stores on a.StoreId equals s.StoreId
                                     where r.RoleName == "Employee" && a.IsDelete == 0
                                     select new AccountDtos
                                     {
                                         AccountId = a.AccountId,
                                         UserName = a.UserName,
                                         PassWord = a.PassWord,
                                         Status = a.Status,
                                         Email = a.Email,
                                         FullName = a.FullName,
                                         Location = a.Location,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         StoreName= s.StoreName,
                                         Token = a.Token,
                                         RoleName = r.RoleName,
                                         IsDelete = (int)a.IsDelete,
                                     }
                                           ).ToList();

            return accountsWithRoles;
        }



    }
}
