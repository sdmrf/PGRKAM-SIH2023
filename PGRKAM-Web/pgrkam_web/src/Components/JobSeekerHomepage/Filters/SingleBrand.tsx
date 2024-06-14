import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Filter} from "@/types/Filter"
import { motion } from "framer-motion";

const SingleBrand = ({ filter }: { filter: Filter }) => {
  const { id, title } = filter;

  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}
        className="animate_top mx-w-full relative block h-10 w-98px"
      >
        <div className="max-w-full rounded-full border border-current flex items-center justify-center">
        <h1 className="opacity-65 text-lg transition-all duration-300 hover:opacity-100 dark:slate-400">{title}</h1>
        </div>
      </motion.a>
    </>
  );
};

export default SingleBrand;
