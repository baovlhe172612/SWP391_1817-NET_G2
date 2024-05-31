
using BE.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class MessengerBoxService
    {
        private  MessengerRepo _repo = new MessengerRepo();

        /// <summary>
        /// Insert feedback bằng service 
        /// </summary>

        public void PostMessUI(MessengerBox messengerBox)
        {
            _repo.PostMessUI(messengerBox);
        }


        /// <summary>
        /// lấy toàn bộ feedback bằng service
        /// </summary>

        /// <returns>trả về toàn bộ feedback</returns>
        public List<MessengerBox> getAllMess()
        {
            return _repo.getAllMess();
        }
    }
}
