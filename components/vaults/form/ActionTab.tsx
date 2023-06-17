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
    const activeClass = active ? ' font-bold text-white bg-gray-border' : '';
    return <div 
        onClick={onClick}
        className={"w-[50%] py-1 inline-block text-center rounded cursor-pointer text-gray-medium text-base hover:text-text" + activeClass}
    >
        { title }
    </div>
}