import { useState, useEffect } from "react";
import PulsingCircle from "@/components/pulse-circle";
import { Trees } from "lucide-react";

const RandomContent = () => {
  const contentArray = [
    {
      text: "Breathe to the rhythm",
      element: <PulsingCircle />,
    },
    {
      text: "Take a walk in the park",
      element: (
        <div className="flex items-center justify-center p-8">
          <Trees size={48} className="text-[#3D8D7A]" />
        </div>
      ),
    },
  ];

  // Specify the type of currentContent: either null or an object with 'text' and 'element'
  const [currentContent, setCurrentContent] = useState<{
    text: string;
    element: JSX.Element;
  } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * contentArray.length);
    setCurrentContent(contentArray[randomIndex]);
  }, []);

  if (!currentContent) return null; // Ensure content is loaded before rendering

  const { text, element } = currentContent;

  return (
    <div className="text-center">
      <p className="mt-2">{text}</p>
      {element}
    </div>
  );
};

export default RandomContent;
