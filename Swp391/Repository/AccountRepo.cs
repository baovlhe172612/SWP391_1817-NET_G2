using Microsoft.EntityFrameworkCore;
using Swp391.Dtos;
using Swp391.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Swp391.Repository
{
    public class AccountRepo
    {
        private readonly SwpfinalContext _context;

        public AccountRepo(SwpfinalContext context)
        {
            _context = context;
        }

        public async Task<List<AccountDtos>> GetAllAccountsAsync()
        {
            var accountsWithRoles = await (from a in _context.Accounts
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
                                           }).ToListAsync();

            return accountsWithRoles;
        }
    }
}
