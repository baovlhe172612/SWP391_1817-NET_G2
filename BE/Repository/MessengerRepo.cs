

using BE.Models;

namespace Swp391.Repository
{
    public class MessengerRepo
    {
        /// <summary>
        /// Phương thức để thêm feedback vào repository MessengerBox.
        /// </summary>


        /// <summary>
        /// Hàm để add feedback từ repository MessengerBox
        /// </summary>
        public void PostMessUI(MessengerBox messengerBox)
        {
            using (SwpfinalContext _context = new SwpfinalContext())
            {
                _context.MessengerBoxes.Add(messengerBox);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Hàm trả về toàn bộ feedback từ repository MessengerBox
        /// </summary>
        /// <returns>Danh sách toàn bộ feedback</returns>
        public List<MessengerBox> getAllMess()
        {
            SwpfinalContext _context = new SwpfinalContext();
            return _context.MessengerBoxes.ToList();
        }
    }
}
