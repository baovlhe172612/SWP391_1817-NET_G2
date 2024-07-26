using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models;
using Swp391.Dtos;
namespace Swp391.Repository
{
    public class AccountDtosRepo
    {
        /// <summary>
        /// hàm chơi với AccountDtos
        /// </summary>

        private SwpfinalContext _context = new SwpfinalContext();

        // Find Account follow UserName + Password
        public AccountDtos GetAccountByUserPass(string UserName, string PassWord)
        {
            var accountDtos = (from a in _context.Accounts
                               join r in _context.Roles on a.RoleId equals r.RoleId
                               join s in _context.Stores on a.StoreId equals s.StoreId
                               // Equals: phương thức để so sánh và phân  biệt chữ hoa chữ thường
                               where a.UserName.Equals(UserName) && a.PassWord.Equals(PassWord)
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
                                   Cccd=a.Cccd,
                                   StatusDate=a.StatusDate,
                                   DateStartWork=a.DateStartWork,
                                   StoreName = s.StoreName,
                                   IsDelete = (int)a.IsDelete,                                                                                                    
                               }).FirstOrDefault();

            return accountDtos;
        }

        // Hàm tìm Account = TOKEN
        public AccountDtos FindAccountByToken(string Token)
        {
            var accountDtos = (from a in _context.Accounts
                               join r in _context.Roles on a.RoleId equals r.RoleId
                               join s in _context.Stores on a.StoreId equals s.StoreId
                               where Token == a.Token
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
                                   Cccd = a.Cccd,
                                   StatusDate = a.StatusDate,
                                   DateStartWork = a.DateStartWork,
                                   RoleName = r.RoleName,
                                   StoreName = s.StoreName,
                                   IsDelete = (int)a.IsDelete,                                                                                                    
                               }).FirstOrDefault();

            return accountDtos;
        }

        // Hàm tìm Account = Email
        public AccountDtos FindAccountByEmail(string email)
        {
            var accountDtos = (from a in _context.Accounts
                               join r in _context.Roles on a.RoleId equals r.RoleId
                               join s in _context.Stores on a.StoreId equals s.StoreId
                               where a.Email.Equals(email)
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
                                   Cccd = a.Cccd,
                                   StatusDate = a.StatusDate,
                                   DateStartWork = a.DateStartWork,
                                   RoleName = r.RoleName,
                                   StoreName = s.StoreName,
                                   IsDelete = (int)a.IsDelete,
                               }).FirstOrDefault();

            return accountDtos;
        }
    }
}