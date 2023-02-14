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
    return <div className="text-sm grey">
        {title} {info && (
            <Popover 
                content={<div className='white'>{info}</div>} 
                title={<div className='white'>{title}</div>} 
                color="#1D1D1F"
            >
                <QuestionCircleOutlined />
            </Popover>
        )}
    </div>
}