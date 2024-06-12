using BE.Models;


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

        /// <summary>
        /// hàm trả về 5 bài post có ngày tạo sớm nhất
        /// </summary>
        /// <returns>5 bài post có ngày tạo sớm nhất</returns>
        public List<Post> getEarliestPosts(int count = 5)
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.Posts
                           .OrderBy(p => p.CreatedDate)
                           .Take(count)
                           .ToList();
        }

    }
}
