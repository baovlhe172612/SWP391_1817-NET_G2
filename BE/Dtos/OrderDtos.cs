namespace BE.Dtos
{
    public class OrderDtos
    {
        public int OrderID { get; set; }
        public DateTime? Date { get; set; }
        public int Status { get; set; }
        public int TableID { get; set; }
        public int StoreID { get; set; }
        public int? PaymentID { get; set; }
        public string? Note { get; set; }
        public double Total { get; set; }
        public string TableName { get; set; }
        public string PaymentName { get; set; }
    }
}
