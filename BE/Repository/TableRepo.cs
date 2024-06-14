using BE.Models;


namespace Swp391.Repository
{   

    public class TableRepo
    {
        /// <summary>
        /// hàm trả về toàn bộ bàn của repository Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Table> getAllTable()
        {
            SwpfinalContext _context = new SwpfinalContext();    
            return _context.Tables.ToList();
        }
    }
}
