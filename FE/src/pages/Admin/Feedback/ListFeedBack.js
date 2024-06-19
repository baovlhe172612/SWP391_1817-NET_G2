import React, { useEffect, useState } from 'react';
import { get } from '../../../helpers/API.helper';
import { Button, Table, Tag } from 'antd';
import { LIST_FEEDBACK } from '../../../helpers/APILinks';
import updateStatus from './UpdateStatus';

function ListFeedBack() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
        const fetchFeedbacks = async () => {
            try {
                const response = await get(LIST_FEEDBACK);
                console.log("response", response);
                setFeedbacks(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const onReload = () => {
        fetchFeedbacks();
      };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // US English uses month-day-year order
        // console.log(date.toLocaleDateString('en-US'));
        // → "12/20/2012"

        // British English uses day-month-year order
        // console.log(date.toLocaleDateString('en-GB'));
        // → "20/12/2012"
        return date.toLocaleDateString('en-GB');
    };

    const columns = [
        {
            title: "Messenger Box ID",
            dataIndex: "messengerBoxId",
            key: "MessengerBoxID",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "Author",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Messenger Description",
            dataIndex: "messengerDescription",
            key: "MessengerDescription",
            render: (text) => <a>{text}</a>,
        },
      
    {
        title: "isDelete",
        dataIndex: "isDelete",
        key: "isDelete",
        // render: (isDelete) => {
        //   const statusMap = {
        //     0: { text: "Undeleted", color: "green" },
        //     1: { text: "Deleted", color: "red" },
        //   };
        //   const { text, color } = statusMap[isDelete] || {
        //     text: "Unknown",
        //     color: "gray",
        //   };
        //   return <Tag color={color}>{text}</Tag>;
        // },

        render: (isDelete,record) => {
            const isDeleteMap = {
              0: { text: "Active", color: "green" },
              1: { text: "Inactive", color: "red" }
            };
    
            const { text, color } = isDeleteMap[isDelete] || {
              text: "Unknown",
              color: "gray"
            };
    
           
    
            return (
              <Button onClick={() => updateStatus(record, onReload)} >
                <Tag color={color}>{text}</Tag>
              </Button>
            );
          }
      },

        {
            title: "CreateDate",
            dataIndex: "createDate",
            key: "createDate",
            render: (text) => <a>{formatDate(text)}</a>,
        },
    ];

    return (
        <>
            <h1 style={{textAlign: 'center'}}>View Feedbacks</h1>
            <Table
                columns={columns}
                dataSource={feedbacks}
                rowKey="messengerBoxId"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
}

export default ListFeedBack;