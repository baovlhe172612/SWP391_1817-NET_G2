

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

        public MessengerBox GetMessById(int id)
        {
            using (SwpfinalContext _context = new SwpfinalContext())
            {
                return _context.MessengerBoxes.FirstOrDefault(m => m.MessengerBoxId == id);
            }
        }


        public void UpdateIsDelete(int id, int isDelete)
        {
            using (SwpfinalContext _context = new SwpfinalContext())
            {
                var messengerBox = _context.MessengerBoxes.Find(id);

                if (messengerBox != null)
                {
                    messengerBox.IsDelete = isDelete;
                    messengerBox.DateDeleted = DateOnly.FromDateTime(DateTime.Now); // DateOnly.FromDateTime
                    _context.SaveChanges();
                }
                else
                {
                    throw new Exception($"Update Fail! Messenger box with ID {id} does not exist");
                }
            }
        }
    }
}

