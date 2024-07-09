namespace BE.Dtos
{
    public class CartItem
    {
        public int ProductSizeId { get; set; }

        public string ProductName { get; set; } 

        public int Quantity { get; set; }

        public double Price { get; set; }

        public int Status { get; set; }

        public int tableId { get; set; }
    }
}
