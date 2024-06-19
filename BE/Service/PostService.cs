using BE.Models;

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

        public List<Post> getUnpublishedPosts()
        {
            return _Postrepo.getUnpublishedPosts();
        }

        public Post GetPostById(int postId)
        {
            return _Postrepo.GetPostById(postId);
        }


        public void AddPost(Post post)
        {
            _Postrepo.AddPost(post);
        }
        public void UppdatePost(Post post)
        {
            _Postrepo.UpdatePost(post);
        }
        public Post DeletePost(int postId)
        {
            var postById = _Postrepo.GetPostById(postId);

            if (postById != null && postById.Status == 1)
            {
                postById.Status = 0;
                _Postrepo.DeletePost(postById);
                return postById;

            }
            else
            {
                postById.Status = 1;
                _Postrepo.DeletePost(postById);
                return postById;
            }



            return null;
        }

        public Post UpPost(int postId, int isPublish)
        {
            var postyById = _Postrepo.GetPostById(postId);

            if (postyById != null)
            {
                postyById.IsPublished = isPublish;
                _Postrepo.DeletePost(postyById);

                return postyById;
            }

            return null;

        }


    }
}
