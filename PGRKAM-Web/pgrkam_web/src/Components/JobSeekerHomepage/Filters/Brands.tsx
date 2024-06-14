"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import filterData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="flex flex-col gap-10 ">
          <h1 className="rounded-md border-current bg-transparent px-4 py-1 text-center text-xl text-slate-800 dark:text-slate-400">
            Filter by Category
          </h1>
          <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
            <div className="grid grid-cols-3 items-center justify-center gap-4.5 md:grid-cols-6 lg:gap-7.5 xl:gap-18">
            {filterData.map((filter, key) => (
              <SingleBrand filter={filter} key={key} />
            ))}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
