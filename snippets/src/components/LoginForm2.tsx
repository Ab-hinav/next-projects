'use client'

import { useRef, useState } from "react"

export default function OTPForm() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Check your Email for a Code
      </h3>
      <form className="flex flex-col items-center space-y-4">
        <div>
          <label htmlFor="otp" className="sr-only">
            Enter OTP
          </label>
          <OtpBoxes num={3} />
        </div>
      </form>
    </div>
  );
}


function OtpBoxes({ num }: { num: number }) {
    const references = useRef<Array<HTMLInputElement | null>>(Array(num).fill(null));
    const [values, setValue] = useState<string[]>(Array(num).fill(""));

    const handleOnChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!/^[0-9]{0,1}$/.test(val)) return;

        const newValues = [...values];
        newValues[index] = val;
        setValue(newValues);

        if (val && index + 1 < num) {
            references.current[index + 1]?.focus();
        }
    };

    const handleKeyUp = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            references.current[index - 1]?.focus();
        }
    };

    return (
        <>
            {Array(num).fill(0).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => {
                      references.current[i] = el;
                    }}
                    className="bg-blue-100 w-[39px] mx-2 p-2 rounded text-black text-center"
                    type="text"
                    maxLength={1}
                    value={values[i]}
                    onChange={handleOnChange(i)}
                    onKeyUp={handleKeyUp(i)}
                  />
            ))}
        </>
    );
}