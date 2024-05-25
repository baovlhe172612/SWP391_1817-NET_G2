using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swp391.Dtos;
using Swp391.Models;

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
                                   Location = a.Location,
                                   Phone = a.Phone,
                                   RoleId = a.RoleId,
                                   Token = a.Token,
                                   RoleName = r.RoleName,
                                   IsDelete = (int)a.IsDelete,
                               }).FirstOrDefault();

            return accountDtos;
        }

        // Hàm tìm Account = TOKEN
        public AccountDtos FindAccountByToken(string Token)
        {
            var accountDtos = (from a in _context.Accounts
                               join r in _context.Roles on a.RoleId equals r.RoleId
                               where Token == a.Token
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
                                   IsDelete = (int)a.IsDelete,
                               }).FirstOrDefault();

            return accountDtos;
        }
    }
}