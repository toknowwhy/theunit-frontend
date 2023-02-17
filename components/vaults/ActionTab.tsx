'use client';

export default function ActionTab({
    title,
    active,
    onClick,
} : {
    title: string,
    active: boolean,
    onClick: () => void,
}) {
    const activeClass = active ? ' font-bold text-text bg-gray-darker' : '';
    return <div 
        onClick={onClick}
        className={"px-4 py-1 inline-block mr-2 rounded cursor-pointer text-gray text-sm hover:text-text" + activeClass}
    >
        { title }
    </div>
}