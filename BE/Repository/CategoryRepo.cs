using BE.Models;

using System.Collections.Generic;
using System.Linq;

namespace Swp391.Repository
{
    public class CategoryRepo
    {
        private readonly SwpfinalContext _context;

        public CategoryRepo()
        {
            _context = new SwpfinalContext();
        }

        public List<Category> getAllCategory()
        {
            return _context.Categories.ToList();
        }

        public void AddCategory(Category category)
        {
            category.Status = 1;
            category.DateCreated = DateOnly.FromDateTime(DateTime.Now.AddHours(+7));
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public void UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            _context.SaveChanges();
        }

        public void UpdateDeleteCategory(Category category)
        {
            _context.Categories.Update(category);
            _context.SaveChanges();
        }
    
        public Category GetCategoryById(int categoryId)
        {
            var categoryById = _context.Categories.FirstOrDefault(category => category.CategoryId == categoryId);

            if(categoryById != null)
            {
                return categoryById;
            }

            return null;
        }

    }
}
