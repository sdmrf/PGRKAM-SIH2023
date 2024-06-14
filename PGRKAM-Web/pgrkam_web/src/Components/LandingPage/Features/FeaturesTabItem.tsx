import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex items-center gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h2 className="mb-7 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-5">{desc}</p>
          <button>
            <a
              href="#"
              className=" mb-5 flex rounded-lg bg-teal-500 px-7.5 py-2.5 mt-5 text-white duration-300 ease-in-out dark:bg-teal-500 dark:hover:bg-teal-500"
            >
              View Demo
            </a>
          </button>
        </div>
        <div className="relative mx-auto hidden aspect-[562/366] max-w-[550px] md:block md:w-1/2">
          <Image src={image} alt={title} width={562} height={366} className="dark:hidden" />
          <Image
            src={imageDark}
            alt={title}
            width={562} height={366}
            className="hidden dark:block"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
