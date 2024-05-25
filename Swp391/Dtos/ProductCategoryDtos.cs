using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Swp391.Dtos
{
    public class ProductCategoryDtos
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public DateTime? ModifileDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? Img { get; set; }
        public int CategoryId { get; set; }
        public double? Price { get; set; }
        public String CategoryName { get; set; } = null!;
        public int IsDelete { get; set; }

    }
}