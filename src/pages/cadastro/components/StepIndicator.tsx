interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-[#E8501A] text-white"
                  : i === current
                  ? "bg-[#E8501A] text-white ring-4 ring-[#E8501A]/20"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? (
                <i className="ri-check-line text-sm"></i>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] font-medium mt-1.5 whitespace-nowrap ${
                i <= current ? "text-[#E8501A]" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 transition-all duration-300 ${
                i < current ? "bg-[#E8501A]" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
