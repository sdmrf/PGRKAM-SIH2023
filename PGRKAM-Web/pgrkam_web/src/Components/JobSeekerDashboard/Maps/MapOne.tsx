"use client";
import React from "react";
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MapOne = () => {
  return (
    <div className="col-span-6 rounded-sm border border-stroke bg-white py-6 px-7.5 h-60
     shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
      <Image
      src='/images/user/user-01.png'
      alt="user 01"
      width={50}
      height={50}
      className="rounded-full flex items-center justify-center" 
      ></Image>
      <MoreHorizIcon className="fill-teal-500 text-teal-500 dark:fill-white"/>
      </div>
      <h4 className="mb-2 text-xl font-small text-black dark:text-white">
      Your profile editing is not completed 
      </h4>
      <div className="flex flex-row justify-between items-center">
      <h4 className="mb-2 text-sm font-extralight text-black dark:text-gray block w-55">
      Complete your profile editing & build your custom resume
      </h4>
      <button className="rounded-md bg-teal-500 py-2 px-4 text-white">
      <span className="text-sm font-medium text-black dark:text-white">
      Edit Profile
      <ArrowForwardIcon className="ml-1.5"/>
      </span>
      </button>
      </div>
      </div>
      <div id="mapOne" className="mapOne map-btn h-90">
        
      </div>
    </div>
  );
};

export default MapOne;
