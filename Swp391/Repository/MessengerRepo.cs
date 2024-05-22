using Swp391.Models;

namespace Swp391.Repository
{
    public class MessengerRepo
    {
        private readonly SwpdemoContext _context;

        public MessengerRepo(SwpdemoContext context)
        {
            _context = context;
        }

        public void PostMessUI(MessengerBox messengerBox)
        {
            _context.MessengerBoxes.Add(messengerBox);
            _context.SaveChanges();
        }
    }
}
