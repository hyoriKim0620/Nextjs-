import React from "react";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ProductHead = ({
  title,
  imageSrc,
  id,
  currentUser,
}: ProductHeadProps) => {
  return (
    <>
      <Heading title={title} />
      <div className="w-full h-[60vh] relative overflow-hidden rounded-xl">
        <Image src={imageSrc} fill className="object-cover w-full" alt="" />
        <div className="absolute top-5 right-5">
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;