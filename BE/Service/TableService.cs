using Swp391.Models;
using Swp391.Repository;

namespace Swp391.Service
{
    public class TableService
    {
        TableRepo _tablerepo = new TableRepo();

        /// <summary>
        /// lấy toàn bộ bàn của Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Table> getAllTable()
        {
            return _tablerepo.getAllTable();
        } 
    }
}
