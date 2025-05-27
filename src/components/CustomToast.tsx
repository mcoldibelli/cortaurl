type CustomToastProps = {
    toast: any;
    message: string;
    type: "success" | "error";
  };
  
  const CustomToast = ({ toast, message, type }: CustomToastProps) => (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        {type === "success" ? (
          <div className="flex items-center gap-2">
            <span className="text-success-600">✓</span>
            <span>{message}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-error-600">⚠️</span>
            <span>{message}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => toast.remove()}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Fechar notificação"
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
  
  export default CustomToast;
  