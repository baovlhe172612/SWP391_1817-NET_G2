using BE.Models;

namespace Swp391.Repository
{

    public class TableRepo
    { 
        private SwpfinalContext _context = new SwpfinalContext();

        /// <summary>
        /// hàm trả về toàn bộ bàn của repository Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Table> getAllTableRepo(int storeID)
        {
            var listTable = _context.Tables
                            .Where(o => o.StoreId == storeID && o.IsDelete == 0)
                            .ToList();
            return listTable;
        }

        public void addTableRepo(Table table)
        {
            _context.Tables.Add(table);
            _context.SaveChanges();
        }
    }
}
