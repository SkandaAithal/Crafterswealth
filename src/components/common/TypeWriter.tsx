import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, className = "" }) => {
  const [iTextPos, setITextPos] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const typewriter = () => {
      const currentText = text.substring(0, iTextPos);
      setTypedText(currentText);

      if (iTextPos < text.length) {
        setITextPos(iTextPos + 1);
      }
    };

    const timer = setTimeout(typewriter, 20);

    return () => clearTimeout(timer);
  }, [iTextPos, text]);

  return (
    <div className={className}>
      <p dangerouslySetInnerHTML={{ __html: typedText }}></p>
      <style jsx>{`
        .blinker {
          border-right: 2px solid;
          animation: blink 500ms step-end infinite;
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Typewriter;
