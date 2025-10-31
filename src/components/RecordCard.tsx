"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Note = {
  thumbnails: {
    large?: { url: string };
  };
};

type Fields = {
  "Component Name"?: string;
  figma_url?: string;
  Notes?: Note[];
  "Component Type"?: string[];
  Description?: string;
  "Colour Mode"?: string[]; // e.g., ["Light"] | ["Dark"]
};

type Props = {
  fields: Fields;
};

const RecordCard = ({ fields }: Props) => {
  const [hovered, setHovered] = useState(false);

  const title = fields["Component Name"] || "Untitled Component";
  const figmaUrl = fields.figma_url;
  const imageUrl = fields.Notes?.[0]?.thumbnails?.large?.url;

  return (
    <div
      className={`relative  rounded-xl p-4 shadow-sm border border-[#E5E7EB] aspect-[1440/900] flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md group ${
        fields["Colour Mode"]?.[0]?.toLowerCase() === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-[#F2F3F5]"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover Button */}
      {hovered && figmaUrl && (
        <Link
          href={figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 bg-black text-white text-sm px-3 py-1.5 rounded-md opacity-90 hover:opacity-100 transition-all duration-200"
        >
          Open in Figma
        </Link>
      )}

      {/* Image */}
      {imageUrl ? (
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg ">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={300}
            className="object-contain group-hover:scale-105 transition-transform duration-200 background-transparent drop-shadow-lg"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-sm">
          No image
        </div>
      )}

      {/* Text Details */}
      {/* <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {componentType && (
          <p className="text-sm text-gray-500 mt-0.5">{componentType}</p>
        )}
        {description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {description}
          </p>
        )}
      </div> */}
    </div>
  );
};

export default RecordCard;
