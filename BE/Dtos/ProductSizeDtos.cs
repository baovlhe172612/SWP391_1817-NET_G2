using BE.Models;

namespace Swp391.Dtos
{
    public class ProductSizeDtos
    {
        public int ProductSizeID { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } 
        public string? Img { get; set; }
        public int SizeId { get; set; }
        public string SizeName { get; set; }
        public int Price { get; set; }
        public int Category { get; set; }
        public string CategoryName { get; set; }
        public int? StoreId { get; set; }
        public string StoreName { get; set; }
        public int? IsDelete { get; set; }
        public List<SizeDto> Sizes { get; set; }
        public DateOnly? dateCreated {  get; set; }
        public int? Quantity { get; set; }

    }
    public class SizeDto
    {
        public int SizeId { get; set; }
        public int Quantity { get; set; }
    }
}
