using BE.Models;

namespace Swp391.Dtos
{
    public class ProductSizeDtos
    {
        public int ProductSizeID { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } 
        public string? Img { get; set; }
        public int Size { get; set; }
        public int SizeName { get; set; }
        public int Price { get; set; }
        public int CategoryID { get; set; }
        public int CategoryName { get; set; }
        public int isDelete { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public List<SizeDto> Sizes { get; set; }

    }
    public class SizeDto
    {
        public int SizeId { get; set; }
        public int Quantity { get; set; }
    }
}
