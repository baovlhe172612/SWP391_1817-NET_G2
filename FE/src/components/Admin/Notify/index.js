import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import "./Notify.css"
function Notify() {
    const items = [
        {
            label: <div className="notify__item">
                <div className="notify__item-icon">
                    <DownOutlined />
                </div>
                <div className="notify__item-content">
                    <div className="notify__item-title">
                        Item 1
                    </div>
                    <div className="notify__item-hour">
                        10 phút trước
                    </div>
                </div>
            </div>,
            key: '0',
        },
        {
            label: <div className="notify__item">
                <div className="notify__item-icon">
                    <DownOutlined />
                </div>
                <div className="notify__item-content">
                    <div className="notify__item-title">
                        Item 2
                    </div>
                    <div className="notify__item-hour">
                        10 phút trước
                    </div>
                </div>
            </div>,
            key: '0',
        }, {
            label: <div className="notify__item">
                <div className="notify__item-icon">
                    <DownOutlined />
                </div>
                <div className="notify__item-content">
                    <div className="notify__item-title">
                        Item 3
                    </div>
                    <div className="notify__item-hour">
                        10 phút trước
                    </div>
                </div>
            </div>,
            key: '0',
        }, {
            label: <div className="notify__item">
                <div className="notify__item-icon">
                    <DownOutlined />
                </div>
                <div className="notify__item-content">
                    <div className="notify__item-title">
                        Item 1
                    </div>
                    <div className="notify__item-hour">
                        10 phút trước
                    </div>
                </div>
            </div>,
            key: '0',
        }, {
            label: <div className="notify__item">
                <div className="notify__item-icon">
                    <DownOutlined />
                </div>
                <div className="notify__item-content">
                    <div className="notify__item-title">
                        Item 1
                    </div>
                    <div className="notify__item-hour">
                        10 phút trước
                    </div>
                </div>
            </div>,
            key: '0',
        },
    ];
    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']}
                dropdownRender={(menu) => (
                    <>
                        <div className="notify__dropdown">
                            <div className="notify__header">
                                <div className="notify__header-title">
                                    <BellOutlined /> Notification
                                </div>
                                <button type="link">View All</button>
                            </div>

                            <div className="notify__body">
                                {menu}
                            </div>
                        </div>
                    </>
                )

                }
            >

                <Button type="text">
                    <Badge className="notify__dot" dot={true}>
                        <BellOutlined />
                    </Badge>
                    {/* <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <BellOutlined />
                        <DownOutlined />
                    </Space>
                </a> */}
                </Button>
            </Dropdown>

        </>
    )
}
export default Notify