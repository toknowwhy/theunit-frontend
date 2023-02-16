'use client';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

export default function VaultInfoTitle({
    title,
    info
} : {
    title: string,
    info?: string
}) {
    return <div className="text-sm text-gray flex items-center">
        {title} {info && (
            <Popover 
                content={<div className='text-text'>{info}</div>} 
                title={<div className='text-text'>{title}</div>} 
                color="#1D1D1F"
                className="ml-1"
            >
                <QuestionCircleOutlined />
            </Popover>
        )}
    </div>
}