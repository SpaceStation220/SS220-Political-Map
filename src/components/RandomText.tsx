import { ReactNode, useEffect, useState } from "react";

const randomText = () => {
  const chars = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@&*_=+-!?";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export function RandomText({ children }: { children?: ReactNode }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setText(randomText());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="RandomText">
      {children} <span className="RandomText--text">{text}</span>
    </div>
  );
}
