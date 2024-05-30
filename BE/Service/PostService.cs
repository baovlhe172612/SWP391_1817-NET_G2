using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class PostService
    {
        PostRepo _Postrepo = new PostRepo();

        /// <summary>
        /// lấy toàn bộ bàn của Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Post> getAllPost()
        {
            return _Postrepo.getAllPost();
        }

        public List<Post> getFivePostEarly()
        {
            return _Postrepo.getEarliestPosts();
        }

    }
}
