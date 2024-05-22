using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class MessengerBoxService
    {
        private readonly MessengerRepo _repo;

        public MessengerBoxService(MessengerRepo repo)
        {
            _repo = repo;
        }

        public void PostMessUI(MessengerBox messengerBox)
        {
            _repo.PostMess(messengerBox);
        }
    }
}
