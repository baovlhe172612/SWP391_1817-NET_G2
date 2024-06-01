using BE.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Swp391.Dtos;

using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Swp391.Repository
{
    public class AccountRepo
    {
        //Trang manager store
        /// <summary>
        /// GetAllAccountsAsync(): Lấy tất cả các tài khoản có [RoleName] là "Manager" và chưa bị xóa (IsDelete != 0).
        /// </summary>

        /// <returns>get all account by linq join between account+rol </returns>

        public List<AccountDtos> GetAllAccounts_manager([FromQuery] string status, [FromQuery] string isDeleted)
        {

            SwpfinalContext _context = new SwpfinalContext();
            int? statusFilter = !string.IsNullOrEmpty(status) ? int.Parse(status) : (int?)null;
            int? isDeletedFilter = !string.IsNullOrEmpty(isDeleted) ? int.Parse(isDeleted) : (int?)null;

            var accountsWithRoles = (from a in _context.Accounts
                                     join r in _context.Roles on a.RoleId equals r.RoleId
                                     join s in _context.Stores on a.StoreId equals s.StoreId

                                     where r.RoleName == "Manager" && (statusFilter == null || a.Status == statusFilter)
                                     select new AccountDtos
                                     {
                                         AccountId = a.AccountId,
                                         UserName = a.UserName,
                                         PassWord = a.PassWord,
                                         Status = a.Status,
                                         Email = a.Email,
                                         FullName = a.FullName,
                                         Address = a.Address,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         Token = a.Token,
                                         StoreId = s.StoreId,
                                         RoleName = r.RoleName,
                                         StoreName = s.StoreName,
                                         IsDelete = (int)a.IsDelete,
                                         Cccd = a.Cccd,
                                         DateStartWork = a.DateStartWork,
                                         StatusDate = a.StatusDate,
                                     }
                                           );
            if (isDeletedFilter.HasValue)
            {
                accountsWithRoles = accountsWithRoles.Where(a => a.IsDelete == isDeletedFilter);
            }
            else
            {
                accountsWithRoles = accountsWithRoles.Where(a => a.IsDelete == 0); // Chỉ lấy ra những tài khoản có isDelete = 0 nếu isDeleted không được chỉ định.
            }
            return accountsWithRoles.ToList();
        }


        /// <summary>
        /// getAllAccount(int id): lấy hết tài khoản
        /// </summary>

        /// <returns>get all account  </returns>
        public List<Account> getAllAccount()
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.Accounts.ToList();
        }


        /// <summary>
        /// getAccountById(int id): Lấy một tài khoản dựa trên ID của nó.
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
                                         Address = a.Address,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         Token = a.Token,
                                         RoleName = r.RoleName,
                                         StoreId = s.StoreId,
                                         StoreName = s.StoreName,
                                         IsDelete = (int)a.IsDelete,
                                         Cccd = a.Cccd,
                                         DateStartWork = a.DateStartWork,
                                     }).FirstOrDefault();

            return accountsWithRoles;
        }

     

        /// <summary>
        /// UpdateAccountStatus(int accountId, int newStatus): Cập nhật trạng thái của một tài khoản dựa trên ID.
        /// </summary>

        public void UpdateAccountStatus(int accountId, int newStatus)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var account = _context.Accounts.Find(accountId);         
            if (account != null)
            {
                account.Status = newStatus;
                account.StatusDate = DateOnly.FromDateTime(DateTime.Now);
                if (newStatus == 1)
                {
                    account.StatusDate = null;
                }
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Account not found"); // Ném một exception để thông báo lỗi
            }
        }

        //update full account
        public void UpdateAccount(Account newAccount)
        {
            using (var _context = new SwpfinalContext())
            {
                try
                {
                    // Check if the account exists
                    var existingAccount = _context.Accounts.FirstOrDefault(a => a.AccountId == newAccount.AccountId);
                    if (existingAccount != null)
                    {
                        // Check if the store exists
                        var storeExists = _context.Stores.Any(s => s.StoreId == newAccount.StoreId);
                        if (!storeExists)
                        {
                            throw new Exception("Store not found.");
                        }
                        // Update fields
                        existingAccount.FullName = newAccount.FullName;
                        existingAccount.Status = newAccount.Status;
                        existingAccount.Email = newAccount.Email;
                        existingAccount.Address = newAccount.Address;
                        existingAccount.Phone = newAccount.Phone;
                        existingAccount.RoleId = newAccount.RoleId;
                        existingAccount.IsDelete = newAccount.IsDelete;
                        existingAccount.StoreId = newAccount.StoreId;
                        existingAccount.Cccd = newAccount.Cccd;                  
                        _context.SaveChanges();
                    }
                    else
                    {
                        throw new Exception("Account not found.");
                    }
                }
                catch (DbUpdateException ex)
                {
                    // Log the exception (optional)
                    Console.WriteLine($"An error occurred while updating the account: {ex.Message}");
                    throw new Exception("An error occurred while updating the account.");
                }
            }
        }





        /// <summary>
        /// createrAccount(Account newAccount): Thêm một tài khoản mới vào cơ sở dữ liệu.
        /// </summary>



        public void createrAccount(Account newAccount)
        {
            SwpfinalContext _context = new SwpfinalContext();
            // Kiểm tra xem có tài khoản nào có cùng UserName không
            bool isExisting = _context.Accounts.Any
                (a => (a.UserName == newAccount.UserName) || (a.Email == newAccount.Email) || (a.Phone == newAccount.Phone) || (a.Cccd == newAccount.Cccd));

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
                    Address = newAccount.Address,
                    Phone = newAccount.Phone,
                    RoleId = newAccount.RoleId,
                    Token = String.Empty,
                    IsDelete = newAccount.IsDelete,
                    StoreId = newAccount.StoreId,
                    Cccd = newAccount.Cccd,
                    StatusDate= null,
                    DateStartWork= DateOnly.FromDateTime(DateTime.Now),
            };
                _context.Accounts.Add(account);
                _context.SaveChanges();
            }
        }


  

        /// <summary>
        /// UpdateisdeleteAccount(int id, int isdelete): Cập nhật trường IsDelete của một tài khoản.
        /// </summary>
        public void UpdateisdeleteAccount(int id, int isdelete)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var account = _context.Accounts.Find(id);
            if (account != null)
            {
                account.IsDelete = isdelete;
                account.Status = 0;
                account.StatusDate = DateOnly.FromDateTime(DateTime.Now);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Update Fail! Account doesn't not exist");
            }
        }

        //-----------------------------------------------------------------------------------------------------------------------------//

        //Trang manager employee
        /// <summary>
        /// GetAllAccountsAsync(): Lấy tất cả các tài khoản có [RoleName] là "Employee" và chưa bị xóa (IsDelete != 0).
        /// </summary>

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
                                         Address = a.Address,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         StoreName=s.StoreName,
                                         Token = a.Token,
                                         StoreId = (int)a.StoreId,
                                         RoleName = r.RoleName,                                       
                                         IsDelete = (int)a.IsDelete,
                                     }
                                           ).ToList();
            return accountsWithRoles;
        }

        public AccountDtos getAccountEmployeeId(int id)
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
                                         Address = a.Address,
                                         Phone = a.Phone,
                                         RoleId = a.RoleId,
                                         StoreName=s.StoreName,
                                         Token = a.Token,
                                         RoleName = r.RoleName,
                                         IsDelete = (int)a.IsDelete,
                                     }).FirstOrDefault();

            return accountsWithRoles;
        }

    }



}
