type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export default function Button({ children, onClick, disabled, isLoading }: ButtonProps) {
    return (
        <button disabled={disabled || isLoading} className="group bg-black hover:bg-black/80 text-white px-8 py-2 rounded cursor-pointer text-xl flex gap-2" onClick={onClick}>
            {isLoading && <div className="flex gap-2 items-center">
                <span className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin
                  group-hover:border-white group-hover:border-t-transparent
                "></span>
                {'Merging'}
                </div>}
            {!isLoading && children}
        </button>
    )
}