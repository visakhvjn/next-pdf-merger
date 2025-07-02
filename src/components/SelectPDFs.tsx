type SelectPDFsProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectPDFs({ onChange }: SelectPDFsProps) {
    
    return (
    <label className="border bg-white text-black hover:bg-black hover:text-white px-8 py-2 rounded cursor-pointer text-2xl hover:shadow-md">
        Select PDFs
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