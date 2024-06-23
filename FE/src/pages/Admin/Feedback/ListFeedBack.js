

import React, { useEffect, useState } from 'react';
import { get } from '../../../helpers/API.helper';
import { Button, Table, Tag, Space, DatePicker } from 'antd'; // Thêm DatePicker từ antd
import { LIST_FEEDBACK } from '../../../helpers/APILinks';
import updateStatus from './UpdateStatus';

const { RangePicker } = DatePicker; // Sử dụng RangePicker cho tìm kiếm ngày tháng

function ListFeedBack() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchDate, setSearchDate] = useState(null); // State để lưu ngày tháng tìm kiếm

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
        //         // US English uses month-day-year order
        //         // console.log(date.toLocaleDateString('en-US'));
        //         // → "12/20/2012"

        //         // British English uses day-month-year order
        //         // console.log(date.toLocaleDateString('en-GB'));
        //         // → "20/12/2012"
        return date.toLocaleDateString('en-GB');
    };

    const handleSearchDateChange = (dates) => {
        if (dates && dates.length === 2) {
            setSearchDate(dates);
        } else {
            setSearchDate(null);
        }
    };

    const filteredFeedbacks = () => {
        let data = feedbacks;

        if (searchDate) {
            data = data.filter((item) => {
                const createDate = new Date(item.createDate);
                return createDate >= searchDate[0].startOf('day') && createDate <= searchDate[1].endOf('day');
            });
        }

        return data;
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
            title: "Status",
            dataIndex: "isDelete",
            key: "isDelete",
            render: (isDelete, record) => {
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
            <h1 style={{ textAlign: 'center' }}>View Feedbacks</h1>
            <Space style={{ marginBottom: 16 }}>
                <RangePicker onChange={handleSearchDateChange} />
            </Space>
            <Table
                columns={columns}
                dataSource={filteredFeedbacks()}
                rowKey="messengerBoxId"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
}

export default ListFeedBack;
