import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';

const Filter = ({ visible, onClose, applyFilters }) => {
  const [filters, setFilters] = useState({ status: '', isDeleted: '' });

  const handleApply = () => {
    applyFilters(filters);
    onClose();
  };

  const handleChange = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <Modal
      title="Filter Accounts"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleApply}>
          Apply
        </Button>,
      ]}
    >
        <div>Status</div>
      <Select
        defaultValue=""
        onChange={value => handleChange('status', value)}
        style={{ width: '50%', marginBottom: '10px' }}
      >
        <Select.Option value="">None</Select.Option>
        <Select.Option value="1">Active</Select.Option>
        <Select.Option value="0">Inactive</Select.Option>
      </Select>
      <div>IsDelete</div>
      <Select
        defaultValue=""
        onChange={value => handleChange('isDeleted', value)}
        style={{ width: '50%' }}
      >
        <Select.Option value="">None</Select.Option>
        <Select.Option value="0">UnDeleted</Select.Option>
        <Select.Option value="1">Deleted</Select.Option>

      </Select>
    </Modal>
  );
};

export default Filter;