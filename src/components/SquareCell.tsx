import { PlayerIcon } from './PlayerIcons';

interface SquareCellProps {
    index: number;
    value: string | null;
    updateBoard: (index: number) => void;
}

export function SquareCell({
    index,
    value,
    updateBoard,
}: SquareCellProps) {

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <button
            onClick={handleClick}
            className={`grid place-items-center aspect-square w-24 
            border border-black text-2xl transition-colors
            ${value === 'x' ? "bg-red-600 text-white" :
                    value === 'o' ? "bg-blue-600 text-white" : "bg-white"}
            `}>
            {<PlayerIcon player={value} />}
        </button>
    );
}
