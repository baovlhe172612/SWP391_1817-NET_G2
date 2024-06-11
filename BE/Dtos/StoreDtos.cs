namespace Swp391.Dtos

{
    // ham bien the cua Store DTOS
    public class StoreDtos()
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; } = null!;
        public string Location { get; set; } = null!;                 
        public int ?IsDelete { get; set; }
        public int ?Status { get; set; }
        public string AccountName { get; set; }
        public int RoleId { get; set; }
        public int AccountId { get; set; }

    }
}