type LoadingSpinnerProps = {
    text?: string;
  };
  
  const LoadingSpinner = ({ text = "Carregando..." }: LoadingSpinnerProps) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-primary-100 rounded-full border-t-primary-600 animate-spin"></div>
      {text && <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>}
    </div>
  );
  
  export default LoadingSpinner;
  