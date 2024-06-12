import { post } from "../../../helpers/API.helper";


function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchStatus] = useSearchParams();
  const [updated, setUpdated] = useState(false);

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        let data = [];
        if (searchStatus.get("status")) {
          data = await get(`${LIST_BLOGS}?status=${searchStatus.get("status")}`);
        } else {
          data = await get(`${LIST_BLOGS}`);
        }

        console.log('hello')

        if (data) {
          setBlogs(data);
          console.log(data);
        }
      } catch (error) {
        console.log("err in ListBlog", error);
        setBlogs([]);
      }
    };

    fetchApi();
  }, [updated, searchStatus]);

  // COLUMS
  const columns = [
    {
      title: "BlogID",
      dataIndex: "BlogID",
      key: "BlogID",
    },
    {
      title: "Author",
      dataIndex: "Author",
      key: "Author",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Contents",
      dataIndex: "Contents",
      key: "Contents",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
      render: (status) =>
        status == 0 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },

    
    {
      title: "CreatedDate",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
    
    },
    {
      title: "ModifiedDate",
      dataIndex: "ModifiedDate",
      key: "ModifiedDate",
    
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (postID) => (
        <Space size="middle">
          <Link to={`/admin/post/edit/${postID}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Link to={`/admin/post/edit/${postID}`}>
            <Button type="primary" ghost>Detail</Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(postID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // DATA
  let data = [];

  // Nếu có data từ api => tạo data cho Table
  if (blogs.length > 0) {
    data = blogs.map((blog) => {
      return {
        postID: blog.,
        StoreName: store.storeName,
        Location: store.location,
        Email: store.email,
        UserName: store.userName,
        Status: store.isDelete,
        actions: store.storeId,
        key: store.storeId,
      };
    });
  }
  // Handler for deleting a store
  const handleDelete = async (storeId) => {
    // bởi vì Swal là file đợi => phải có await mới được
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      console.log(`${DELETE_STORE_ID}${storeId}`);
      const dataDelete = await patch(`${DELETE_STORE_ID}${storeId}`, {
        storeId: storeId,
      });

      if (dataDelete) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // load lại data
        setUpdated(!updated);
      }
    }
  };

  // Handler for change status in  store
  const handleStatus = async (status) => {
    try {
      // truy vấn store
      const dataStore = await get(`${LIST_STORES}?status=${status}`);
      if (dataStore) {
        setStores(dataStore);
      }
    } catch (error) {}
  };

  return (
    <>
      <Status handleStatus={handleStatus} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ margin: "20px 0" }}
      />
      <PaginationDesign />
    </>
  );
}

export default ListStore;
