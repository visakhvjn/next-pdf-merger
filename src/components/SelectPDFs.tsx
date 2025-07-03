
type SelectPDFsProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectPDFs({ onChange }: SelectPDFsProps) {
    
    return (
    <label className="items-center bg-black hover:bg-black/80 text-white px-8 py-2 rounded cursor-pointer text-xl flex gap-2">
        <span>Add Files</span>
        <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={onChange}
            style={{ display: "none" }}
        />
    </label>
    )
}