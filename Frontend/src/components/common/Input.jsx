export default function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-bold text-white">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        )}
        <input
          className={`w-full bg-surface-300 text-white rounded-md outline-none border border-transparent 
            focus:border-white focus:ring-2 focus:ring-white/20
            placeholder:text-text-muted transition-all duration-200
            text-sm py-3 ${Icon ? 'pl-11 pr-4' : 'px-4'}
            hover:border-surface-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className || ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs font-medium">{error}</p>
      )}
    </div>
  );
}
