using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Swp391.Dtos;
using Swp391.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Swp391.Repository
{
    public class AccountRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ sản phẩm của repository accounts
        /// </summary>

        /// <returns>get all account by linq join between account+rol </returns>

        public List<AccountDtos> GetAllAccountsAsync()

        {

            SwpfinalContext _context = new SwpfinalContext();

            var accountsWithRoles =  (from a in _context.Accounts
                                           join r in _context.Roles on a.RoleId equals r.RoleId
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
                                               RoleName = r.RoleName
                                           }).ToList();

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
                                         RoleName = r.RoleName                                      
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
            };

            _context.Accounts.Add(account);
            _context.SaveChanges();
        }
        // xoá account 
        public void deleteAccount(int id)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var account = _context.Accounts.Find(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Remove Fail! Account doesn't not exist");
            }
        }

    }
}
