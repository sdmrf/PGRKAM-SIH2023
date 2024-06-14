import React from "react";
import { Feature } from "@/types/feature";
import { Job } from "@/types/job";
import Image from "next/image";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const SingleFeature = ({ job }: { job: Job }) => {
  const { id, jobDescription, jobTitle, jobImage, jobLink, jobLocation, jobType, jobInfo, jobRequirements } = job;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
      >
        <div className="flex flex-row gap-5 items-center">
        <div className="relative flex flex-row gap-5 h-16 w-16 items-center justify-center rounded-[4px] bg-teal-500 dark:bg-teal-500">
          <Image src={jobImage} width={36} height={36} alt="title" />
        </div>
        <h1 className="text-xl font-semibold text-black dark:text-white xl:text-itemtitle">{jobTitle}</h1>
        </div>
        <h3 className="mb-5 mt-7.5 text-l font-md text-black dark:text-white xl:text-itemtitle">
          {jobType}
        </h3>
        <p className="mb-3">{jobInfo}</p>
        <p>{jobDescription}</p>
        <div className="flex flex-row items-center justify-between">
        <p className="mt-5 text-sm font-medium text-teal-500 dark:text-teal-500">
          {jobLocation}
          <LocationOnIcon className="ml-2 text-black opacity-50 dark:text-white dark:opacity-50"/>
        </p>
        <button className="transition-all duration-300 mt-5 flex items-center gap-2 text-sm font-medium text-teal-500 dark:text-teal-500 hover:bg-teal-400 hover:px-3 hover:py-2 hover:rounded-lg hover:dark:text-white">
          Apply
          <ArrowForwardIcon />
        </button>
        </div>
      </motion.div>
    </>
  );
};

export default SingleFeature;
