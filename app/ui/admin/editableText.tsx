"use client"
import React, { useRef, useState } from 'react';

interface EditableTitleProps {
    text: string;
    updateText: (newText: string) => Promise<void>;
  }
  
  const EditableTitle = ({ text, updateText }: EditableTitleProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (range) {
      const offset = range.startOffset;
      setHoverPosition(offset);
    }
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        if (hoverPosition !== null) {
          inputRef.current?.setSelectionRange(hoverPosition, hoverPosition);
        }
      }, 10);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateText(newText)
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <p
      className={`text-4xl font-bold pt-2 p-2 rounded-lg hover:bg-gray-100 ${
        isEditing ? 'bg-gray-100' : 'bg-gray-50'
      }`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className={`w-full p-0 border-none focus:outline-none focus:border-none focus:ring-0 hover:bg-gray-100 ${
            isEditing ? 'bg-gray-100' : 'bg-gray-50'
          }`}
        />
      ) : (
        newText
      )}
    </p>
  );
};

const printNewText = (newText: string) => {
    console.log('Text updated:', newText)
}
export default EditableTitle;