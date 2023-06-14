import React from 'react'
import { Space, Spin } from 'antd'

const LoaderComponent = () => {
  return (
    <div className="loader">
      <Space>
        <Spin tip="Loading" size="large"></Spin>
      </Space>
    </div>
  )
}

export default LoaderComponent
