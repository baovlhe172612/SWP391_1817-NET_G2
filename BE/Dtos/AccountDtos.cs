namespace Swp391.Dtos
{
    /// <summary>
    /// DTO account + roleName
    /// </summary>

    /// <returns>get all account + roleName</returns>
    public class AccountDtos
   {
        public int AccountId { get; set; }
        public string UserName { get; set; } = null!;
        public string PassWord { get; set; } = null!;
        public int Status { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public int RoleId { get; set; }
        public string Token { get; set; } = null!;
        public string RoleName { get; set; } = null!;
        public string StoreName { get; set; } = null!;       
        public int StoreId { get; set; }
        public int IsDelete { get; set; }
        public string? Cccd { get; set; }
        public DateOnly? StatusDate { get; set; }
        public DateOnly? DateStartWork { get; set; }

    }
}
