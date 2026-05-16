import { useState, useEffect } from "react";

interface PasswordStrengthProps {
  password: string;
  onValidationChange?: (isValid: boolean) => void;
}

export default function PasswordStrength({ password, onValidationChange }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const newChecks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    setChecks(newChecks);

    const score = Object.values(newChecks).filter(Boolean).length;
    setStrength(score);

    if (onValidationChange) {
      onValidationChange(score === 5);
    }
  }, [password]);

  if (!password) return null;

  const strengthLabels = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte", "Excelente"];
  const strengthColors = [
    "bg-gray-200",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  return (
    <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Força da palavra-passe</span>
        <span className={`text-[10px] font-black uppercase tracking-widest ${strength >= 4 ? "text-emerald-500" : "text-gray-400"}`}>
          {strengthLabels[strength]}
        </span>
      </div>
      
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              s <= strength ? strengthColors[strength] : "bg-gray-100"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <CheckItem label="8+ caracteres" met={checks.length} />
        <CheckItem label="Maiúscula" met={checks.upper} />
        <CheckItem label="Minúscula" met={checks.lower} />
        <CheckItem label="Número" met={checks.number} />
        <CheckItem label="Símbolo" met={checks.special} />
      </div>
    </div>
  );
}

function CheckItem({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
        met ? "bg-emerald-100 text-emerald-600" : "bg-gray-50 text-gray-300"
      }`}>
        <i className={`${met ? "ri-check-line" : "ri-close-line"} text-[10px] font-bold`}></i>
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${
        met ? "text-emerald-700" : "text-gray-400"
      }`}>
        {label}
      </span>
    </div>
  );
}
