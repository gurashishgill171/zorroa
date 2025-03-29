import Image from "next/image";
import React from "react";

interface PreviewProps {
  image: string;
  title: string;
  price: string;
}

function Preview({ image, title, price }: PreviewProps) {
  return (
    <main>
      <Image src={image} alt={title} width={280} height={320} />
      <div>
        <h4>{title}</h4>
        <p>
          ₹ <span>{price}</span>
        </p>
      </div>
    </main>
  );
}

export default Preview;
