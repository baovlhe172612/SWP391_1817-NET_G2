namespace BE.Dtos
{
    public class DailyRevenueDtos
    {
        public DateTime Date { get; set; }
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public double TotalRevenue { get; set; }
    }
    public class MonthlyRevenueDtos
    {
        public DateTime YearMonth { get; set; } // Store the year and month
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public double TotalRevenue { get; set; }

        // Property to serialize YearMonth as string in yyyy-MM format
        public string YearMonthString => YearMonth.ToString("yyyy-MM");
    }

}
