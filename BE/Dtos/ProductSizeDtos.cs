namespace Swp391.Dtos
{
    public class ProductSizeDtos
    {
        public int ProductSizeID { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public string? Img { get; set; }
        public int SizeId { get; set; }
        public string SizeName { get; set; } = null!;
        public int Price { get; set; }

        public int Category { get; set; }
    }
}
