namespace Swp391.Dtos

{
    // ham bien the cua Store DTOS
    public class StoreDtos()
    {
        public int StoreId { get; set; }
        public String StoreName { get; set; }
        public String Location { get; set; }

        public int AccountId { get; set; }
        public String UserName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public int Status { get; set; }
        public int ?IsDelete { get; set; }

        public int RoleId { get; set; }
    }
}