"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/app/ui/input";

interface EditableDateProps {
  date?: Date | null;
  updateDate: (newDate: Date | null) => Promise<void>;
}

const EditableDate = ({ date, updateDate }: EditableDateProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(
    date ? date.toISOString().split("T")[0] : ""
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateDate(newDate ? new Date(newDate) : null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(event.target.value);
  };

  return (
    <div onClick={handleClick} className="grid grid-rows-2 p-2">
      <p className="text-sm text-gray-500">Date</p>
      {isEditing ? (
        <Input
          ref={inputRef}
          type="date"
          value={newDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-gray-950 font-semibold"
        />
      ) : (
        <p className="text-gray-950 font-semibold">
          {date ? new Date(date).toLocaleDateString() : "No Date Set"}
        </p>
      )}
      <hr className="border border-gray-300" />
    </div>
  );
};

export default EditableDate;
