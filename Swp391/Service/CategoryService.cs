using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class CategoryService
    {
        CategoryRepo _Categoryrepo = new CategoryRepo();

        /// <summary>
        /// lấy toàn bộ bàn của Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Category> getAllCategory()
        {
            return _Categoryrepo.getAllCategory();
        }
    }
}
