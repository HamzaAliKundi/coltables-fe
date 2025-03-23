const Input = ({ label, type = "text", placeholder, required, value, onChange, className = "" }) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
          {label}
          {required && <span className="text-[#FF00A2]">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full md:w-[544px] h-[40px] bg-white rounded-[8px] px-4 
          font-space-grotesk text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50
          focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent
          ${className}`}
      />
    </div>
  );
};

export default Input;