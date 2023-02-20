'use client';

import {useRouter} from 'next-intl/client';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import moment from "moment";


export default function HistoryDatePicker({ date } : { date?: string }) {
    const router = useRouter();
    const now = new Date();
    const onChange = (date: Date) => {
        router.push('/history/'+moment(date).format('YYYY-MM-DD'));
    }

    const selectedDate = date ? moment(date).toDate() : now;

    return <div className="bg-gray-dark rounded-lg py-2 px-4 inline-block">
        <span className="text-sm text-gray font-semibold mr-2">Filter by date:</span>
        <DatePicker 
            selected={selectedDate} 
            onChange={onChange} 
            maxDate={now}
        />
    </div>;
}