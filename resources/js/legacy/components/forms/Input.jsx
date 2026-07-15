import FieldError from './FieldError';

function Input({ label, error, className = '', ...props }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
            <input
                {...props}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-black outline-none transition focus:border-cyan-400"
            />
            <FieldError message={error} />
        </label>
    );
}

export default Input;
