namespace Swp391.Dtos
{
    /// <summary>
    /// DTO account + roleName
    /// </summary>

    /// <returns>get all account + roleName</returns>
    public class OrderDetailDto
    {
        public int OrderDetailID { get; set; }
        public int OrderID { get; set; }
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public int TableID { get; set; }
        public string TableName { get; set; }
        public double Price { get; set; }
        public int Product_SizeID { get; set; }
        public int Quantity { get; set; }
        public int SizeID { get; set; }
        public string SizeName { get; set; }
        public string Img { get; set; }
        public string ProductName { get; set; }
        public int? Status { get; set; }


        // New property for total quantity
        public int ProductID { get; set; }
        public int TotalQuantity { get; set; }

        public DateTime? Date { get; set; }

    }

    public class OrderDeltailDtos_UpdateStatus()
    {
        public int OrderDetailID { get; set; }
        public int? Status { get; set; }
    }

}
