namespace Swp391.Dtos
{
    public class AccountDtos
   {
        public int AccountId { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public int Status { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? Location { get; set; }
        public string? Phone { get; set; }
        public int RoleId { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
    }
}
