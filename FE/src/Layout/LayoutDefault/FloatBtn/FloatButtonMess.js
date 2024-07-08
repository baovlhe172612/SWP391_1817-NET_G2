import { CommentOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button, FloatButton, Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../actions/DataSaveCartAction";
import { getCookie } from "../../../helpers/Cookie.helper";

function FloatButtonMess({ handleOnclick }) {
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [connection, setConnection] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const dispatch = useDispatch();
  const cartSave = useSelector((state) => state.savedCart);
  const tableId = parseInt(getCookie("tableId"), 10);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const startSignalRConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5264/OrderHub")
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        console.log("SignalR Connected.");
        setConnection(newConnection);

        newConnection.invoke("JoinTableGroup", tableId.toString());
        newConnection.on(
          "ReceiveOrderNotification",
          (receivedTableId, productsizeId, status, date) => {
            dispatch(updateStatus(productsizeId, date, status));
            console.log(tableId);
            console.log(status);
            console.log(productsizeId);
            console.log(date);
            console.log(cartSave);
            const updatedProduct = cartSave.find(
              (item) => item.productSizeID == productsizeId
            );
            if (updatedProduct) {
              setProduct([updatedProduct]); // Đảm bảo `product` là mảng
            }
            if (status == 1) {
              setShowCompletionModal(true);
            }
          }
        );
      } catch (error) {
        console.error("SignalR Connection Error: ", error);
      }
    };

    startSignalRConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [tableId, cartSave, dispatch]);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveOrderNotification", (receivedTableId) => {});
      return () => {
        connection.off("ReceiveOrderNotification");
      };
    }
  }, [connection]);

  const handleOrderClick = () => {
    setIsOrderModalVisible(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalVisible(false);
  };

  const handleShowOnlyToday = () => {
    setShowOnlyCompleted(true);
  };

  const handleShowAllOrders = () => {
    setShowOnlyCompleted(false);
  };

  const today = new Date().toLocaleDateString("en-US");
  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Ngày",
      dataIndex: "datetime",
      key: "datetime",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const statusMap = {
          1: { text: "Hoàn Thành", color: "green" },
          0: { text: "Đang xử lý", color: "yellow" },
          [-1]: { text: "Chờ xử lý", color: "red" },
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <>
      <FloatButton
        trigger="click"
        onClick={handleOnclick}
        type="primary"
        style={{
          fontSize: "100px",
        }}
        icon={<CommentOutlined />}
      />
      <FloatButton
        trigger="click"
        onClick={handleOrderClick}
        type="primary"
        style={{
          right: 50,
          bottom: 120,
          fontSize: "24px",
        }}
        icon={<ShoppingCartOutlined />}
      />
      <Modal
        title="Trạng thái đơn hàng"
        visible={isOrderModalVisible}
        onCancel={handleOrderModalClose}
        footer={null}
        width={800} // Đặt chiều rộng cho modal
      >
        <Button
          onClick={handleShowOnlyToday}
          style={{ marginRight: "10px" }}
          type={showOnlyCompleted ? "primary" : "default"}
        >
          Đơn hàng hôm nay
        </Button>
        <Button
          onClick={handleShowAllOrders}
          type={!showOnlyCompleted ? "primary" : "default"}
        >
          Đơn hàng đã mua
        </Button>
        <Table
          dataSource={
            showOnlyCompleted
              ? cartSave.filter(
                  (item) =>
                    new Date(item.datetime).toLocaleDateString("en-US") ===
                    today
                )
              : cartSave
          }
          columns={columns}
          pagination={false}
          rowKey={(record) =>
            `${record.productSizeID}_${new Date(record.datetime).getTime()}`
          }
        />
      </Modal>
      <Modal
        title="Sản phẩm đã được hoàn thành"
        visible={showCompletionModal}
        onCancel={() => setShowCompletionModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowCompletionModal(false)}>
            Đóng
          </Button>,
        ]}
      >
        {product.length > 0 && ( // Kiểm tra nếu có sản phẩm
          <Table
            dataSource={product}
            columns={[
              {
                title: "Product",
                dataIndex: "productName",
                key: "productName",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (price) => `${price.toLocaleString("vi-VN")} đ`,
              },
            ]}
            pagination={false}
            rowKey="productSizeID"
          />
        )}
      </Modal>
    </>
  );
}

export default FloatButtonMess;
