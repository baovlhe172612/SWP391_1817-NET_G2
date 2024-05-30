using Swp391.Models;

using Swp391.Repository;
using System.Collections.Generic;

namespace Swp391.Service
{
    public class CategoryService
    {
         CategoryRepo _categoryRepo = new CategoryRepo();
        
        

        public List<Category> getAllCategory()
        {
            return _categoryRepo.getAllCategory();
        }

        public void AddCategory(Category category)
        {
            _categoryRepo.AddCategory(category);
        }

        public void UpdateCategory(Category category)
        {
            _categoryRepo.UpdateCategory(category);
        }

        public Category DeleteCategory(int categoryId, int isDelete)
        {
            var categoryById = _categoryRepo.GetCategoryById(categoryId);

            if(categoryById != null)
            {
                categoryById.IsDelete = isDelete;
                _categoryRepo.UpdateDeleteCategory(categoryById);

                return categoryById;
            }

            return null;

        }
        public Category GetCategoryById(int categoryId)
        {
            return _categoryRepo.GetCategoryById(categoryId);
        }
    }
}
