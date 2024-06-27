using BE.Models;
using Swp391.Controllers;
using Swp391.Dtos;

namespace Swp391.Repository
{
    public class ProductSizeRepo
    {
        /// <summary>
        /// lấy toàn bộ product đi cùng size tại repo
        /// </summary>
        /// <returns>trả về toàn bộ product đi cùng size</returns>

        public List<ProductSizeDtos> GetAllProductSize()
        {
            SwpfinalContext _context = new SwpfinalContext();
            var ProductSize = (from p in _context.Products
                               join ps in _context.ProductSizes on p.ProductId equals ps.ProductId
                               join s in _context.Sizes on ps.SizeId equals s.SizeId
                               join c in _context.Categories on p.CategoryId equals c.CategoryId
                               /*join st in _context.Stores on p.StoreId equals st.StoreId*/
                               select new ProductSizeDtos
                               {
                                  ProductSizeID = ps.ProductSizeId,
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                               /*StoreId=p.StoreId,*/
                                  Img = p.Img,
                                  SizeId = s.SizeId,
                                  SizeName = s.SizeName,
                                  Price = (int)(p.Price + s.Price),
                                  Category = p.CategoryId,
                                  IsDelete= ps.IsDelete,
                                  CategoryName=c.CategoryName,
                                  Quantity=ps.Quanity,
                                  /*StoreName=st.StoreName,*/
                               }).ToList();
            return ProductSize;
        }

        // GetProductByID

        public ProductSizeDtos GetProductSizeById(int id)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var ProductSize = (from p in _context.Products
                               join ps in _context.ProductSizes on p.ProductId equals ps.ProductId
                               join s in _context.Sizes on ps.SizeId equals s.SizeId
                               join c in _context.Categories on p.CategoryId equals c.CategoryId
                               /*join st in _context.Stores on p.StoreId equals st.StoreId*/
                               where ps.ProductSizeId == id
                               select new ProductSizeDtos
                               {
                                   ProductSizeID = ps.ProductSizeId,
                                   ProductId = p.ProductId,
                                   ProductName = p.ProductName,
                                   /*StoreId=p.StoreId,*/
                                   Img = p.Img,
                                   SizeId = s.SizeId,
                                   SizeName = s.SizeName,
                                   Price = (int)(p.Price + s.Price),
                                   Category = p.CategoryId,
                                   IsDelete = ps.IsDelete,
                                   CategoryName = c.CategoryName,
                                   Quantity = ps.Quanity,
                                   /*StoreName=st.StoreName,*/
                               }).FirstOrDefault();
            return ProductSize;
        }

        public void CreateProduct(ProductcreateDtos newproduct)
        {
            using (var _context = new SwpfinalContext())
            {
                if (newproduct == null)
                {
                    throw new ArgumentNullException(nameof(newproduct));
                }
                if (newproduct.Sizes == null || newproduct.Sizes.Count == 0)
                {
                    throw new ArgumentException("Sizes list is null or empty");
                }

                // Save the image file to disk and get its path
                string imagePath = SaveImageFile(newproduct.Img);

                // Create the main Product entity
                var product = new Product
                {
                    ProductName = newproduct.ProductName,
                    CategoryId = newproduct.Category,
                    Img = imagePath, // Save the image path
                    Price = newproduct.Price,
                    CreateDate = DateTime.Now,
                    IsDelete = 0,
                    StoreId = newproduct.StoreId,
                    Status = 1 ,// Convert bool to int
                    DateDeleted = null,
                    ModifileDate = null
                };

                // Add product to context and save changes
                _context.Products.Add(product);
                _context.SaveChanges();

                // Create ProductSize entities for each size in Sizes list
                foreach (var size in newproduct.Sizes)
                {
                    var productSize = new ProductSize
                    {
                        ProductId = product.ProductId, // Use the generated ProductId
                        SizeId = size.SizeId,
                        Quanity = size.Quantity,
                        Price = newproduct.Price + size.Price,
                        IsDelete = 0,
                        Status = 1,
                        DateCreated = DateOnly.FromDateTime(DateTime.Now),
                        DateDeleted = null,
                    };
                    _context.ProductSizes.Add(productSize);
                }

                _context.SaveChanges();
            }
        }

        private string SaveImageFile(string base64Image)
        {
            // Replace with your logic to save and get image path
            string fileName = $"{Guid.NewGuid().ToString()}.png"; // Generate unique file name
            string directoryPath = @"C:\Upload"; // Example: save in uploads folder

            // Save image bytes to disk
            try
            {
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string filePath = Path.Combine(directoryPath, fileName);
                File.WriteAllBytes(filePath, Convert.FromBase64String(base64Image));
                return filePath; // Return the saved file path
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving image: {ex.Message}");
                throw; // Throwing the exception to handle it in the calling method
            }
        }

        public void UpdateProduct(ProductSize newProduct,string productName)
        {
            SwpfinalContext _context = new SwpfinalContext();          
            var productsize = newProduct;
            productsize.DateDeleted = null;
            productsize.DateCreated = DateOnly.FromDateTime(DateTime.Now);           
            _context.ProductSizes.Update(productsize);
            var product = _context.Products.FirstOrDefault(p => p.ProductId == newProduct.ProductId);
            if (product != null)
            {
                product.ProductName = productName;
                _context.Products.Update(product);
            }
            _context.SaveChanges();
        }
        public void DeleteProduct(int id,int isdelete)
        {
            SwpfinalContext _context = new SwpfinalContext();
            var product = _context.ProductSizes.FirstOrDefault(p => p.ProductSizeId == id);
            product.IsDelete=isdelete;
            product.DateDeleted = DateOnly.FromDateTime(DateTime.Now);
            _context.ProductSizes.Update(product);
            _context.SaveChanges();

        }
    }
}
