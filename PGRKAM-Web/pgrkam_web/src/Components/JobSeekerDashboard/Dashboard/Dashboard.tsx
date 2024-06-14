"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Messages/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import WorkIcon from '@mui/icons-material/Work';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const Dashboard: React.FC = () => {
  return (
    <>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="My Current Jobs" number="3">
          <WorkIcon 
            className="fill-teal-500 text-teal-500 dark:fill-white"
            width="22"
            height="22"/>
        </CardDataStats>
        <CardDataStats title="My Applied Jobs" number="6">
          <BubbleChartIcon
            className="fill-teal-500 text-teal-500 dark:fill-white"
            width="22"
            height="22"
          />
        </CardDataStats>
        <CardDataStats title="My Favorite Jobs" number="17">
        <FavoriteIcon
            className="fill-teal-500 text-teal-500 dark:fill-white"
            width="22"
            height="22"
          />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default Dashboard;
