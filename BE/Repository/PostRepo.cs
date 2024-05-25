using Swp391.Models;

namespace Swp391.Repository
{

    public class PostRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ bàn của repository Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Post> getAllPost()
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.Posts.ToList();
        }
    }
}
