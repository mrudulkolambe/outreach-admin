type InputTypes = {
	label?: string,
	value: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	disabled: boolean,
	placeholder: string,
	id: string,
	name: string,
	type: string,
}

const Input = ({ label, value, onChange, disabled, placeholder, id, name, type }: InputTypes) => {
	return (
		<>
			<div className='flex flex-col gap-1 relative'>
				{/* {label && <label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>} */}
				{label && <label className='text-sm font-semibold cursor-pointer text-gray-500' htmlFor={id}>{label}:</label>}
				<input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} id={id} disabled={disabled} className='peer disabled:cursor-not-allowed border-2 focus:border-accent duration-200 px-5 py-3 outline-none rounded-xl block' />
			</div>
		</>
	)
}

export default Input