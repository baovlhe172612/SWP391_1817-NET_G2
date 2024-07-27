using BE.Models;

using Swp391.Repository;

namespace Swp391.Service
{
    public class TableService
    {
        TableRepo _tableRepo = new TableRepo();

        /// <summary>
        /// lấy toàn bộ bàn của Tables
        /// </summary>

        /// <returns>toàn bộ bàn </returns>
        public List<Table> getAllTable(int storeID)
        {
            return _tableRepo.getAllTableRepo(storeID);
        }

        public void addTable(Table table)
        {
            _tableRepo.addTableRepo(table);
        }
        public void updateIsDelete(int tableId, int isDelete)
        {
            _tableRepo.updateIsDelete(tableId, isDelete);
        }
        public void updateIsStatus(int tableId, int status)
        {
            _tableRepo.updateIsStatus(tableId, status);
        }
        public void updatetable(int tableId, string tableName)
        {
            _tableRepo.updateTable(tableId, tableName);
        }
    }
}