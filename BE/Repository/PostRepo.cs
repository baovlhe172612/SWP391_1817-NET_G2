using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Swp391.Repository
{
    public class PostRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ bài viết của repository Post
        /// </summary>
        /// <returns>toàn bộ bài viết</returns>
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

        /// <summary>
        /// hàm trả về các bài post chưa được xuất bản
        /// </summary>
        /// <returns>danh sách các bài post chưa được xuất bản</returns>
        public List<Post> getUnpublishedPosts()
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.Posts
                           .Where(p => p.IsPublished == 0)
                           .ToList();
        }

        public void AddPost(Post p)
        {
            SwpfinalContext _context = new SwpfinalContext();
            List<Post> posts = new List<Post>();
            posts = _context.Posts.ToList();
            p.PostId= posts.Count +1 ;
            _context.Posts.Add(p);
            _context.SaveChanges();
        }

        public Post GetPostById(int postId)
        {
            SwpfinalContext _context = new SwpfinalContext();

            var postById = _context.Posts.FirstOrDefault(post => post.PostId == postId);

            if (postById != null)
            {
                return postById;
            }

            return null;
        }

        public void UpdatePost(Post p)
        {
            SwpfinalContext _context = new SwpfinalContext();
            p.ModifiDate = DateTime.Now;
            _context.Posts.Update(p);
            _context.SaveChanges();
        }
        public void DeletePost(Post p)
        {
            SwpfinalContext _context = new SwpfinalContext();

            _context.Posts.Update(p);
            _context.SaveChanges();
        }

    }
}
