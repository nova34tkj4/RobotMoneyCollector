interface InputProps {
  value?: string | undefined | number;
  placeholder?: string;
  type?: 'text' | 'number';
  onChange?: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
}
export default function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onFocus,
  onBlur,
  label = ''
}: InputProps) {
  return (
    <div className="w-full">
      <p>{label}</p>
      <input
        onFocus={(event) => {
          event.preventDefault();
          onFocus?.();
        }}
        onBlur={(event) => {
          event.preventDefault();
          onBlur?.();
        }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-14"
      />
    </div>
  )
}