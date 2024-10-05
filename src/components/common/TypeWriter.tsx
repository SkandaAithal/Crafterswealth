import React from "react";

interface TypewriterProps {
  text: string;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, className = "" }) => {
  const textLength = text.length;

  return (
    <div className={className}>
      <span
        className="type"
        style={{ "--n": textLength } as React.CSSProperties}
      >
        {text}
      </span>
    </div>
  );
};

export default Typewriter;
