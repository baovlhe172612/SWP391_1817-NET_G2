using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swp391.Repository;
using Swp391.Dtos;

namespace Swp391.Service
{
    public class AccountDtosService
    {
        /// <summary>
        /// hàm chơi với AccountDtosService
        /// </summary>

        // Hàm này lấy acc dựa trên UserName, Password bằng AccountDtosRepo
        private AccountDtosRepo _accountDtosRepo = new AccountDtosRepo();
        public AccountDtos GetAccountDtosService(string UserName, string PassWord)
        {
            try
            {
                var accountDtos = _accountDtosRepo.GetAccountByUserPass(UserName, PassWord);

                return accountDtos;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        // Hàm này lấy Account dựa trên token
        public AccountDtos GetAccDtosByTokenSer(String token)
        {
            try
            {
                var accountDtos = _accountDtosRepo.FindAccountByToken(token);

                return accountDtos;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        // Hàm này lấy Account dựa trên email
        public AccountDtos GetAccDtosByEmailSer(string email)
        {
            try
            {
                var accountDtos = _accountDtosRepo.FindAccountByEmail(email);
                return accountDtos;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}