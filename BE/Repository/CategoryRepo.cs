using Swp391.Models;

namespace Swp391.Repository
{

    public class CategoryRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ bàn của repository Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Category> getAllCategory()
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.Categories.ToList();
        }
    }
}
