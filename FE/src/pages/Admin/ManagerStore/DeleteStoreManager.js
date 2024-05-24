import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
// import axios from 'axios';

function DeleteStoreManager({ record, onReload }) {

    const handleDelete = async () => {
        try {
            // Replace with your delete API endpoint
            const response = await fetch.put(`/api/store-managers/${record.id}`);
            if (response.status === 200) {
                onReload();
                alert("Delete successfully");
            } else {
                alert("Delete not successful");
            }
        } catch (error) {
            console.error("There was an error deleting the record!", error);
            alert("Delete not successful");
        }
    }

    return (
        <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
            <Button danger size='small' icon={<DeleteOutlined />} />
        </Popconfirm>
    )
}

export default DeleteStoreManager;

