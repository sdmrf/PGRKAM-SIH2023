"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SigninSelection = ({setIsJobSeeker, setIsRecruiter, handleLoginClick} : any) => {
  const [recruiterChecked, setRecruiterChecked] = useState(false);
  const [jobSeekerChecked, setJobSeekerChecked] = useState(false);

  const handleChange = (checked : boolean) => {
    setRecruiterChecked(checked);
    setJobSeekerChecked(false);
  };

  const handleJobSeekerChange = (checked : boolean) => {
    setJobSeekerChecked(checked);
    setRecruiterChecked(false);
  };

  return (
    <>
      {/* <!-- ===== Selection Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
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
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Login as a Recruiter or job seeker
            </h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-8"></div>
            </div>
            <form>
              <div className="mb-7.5 flex flex-row gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                <div className="z-10 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5">
                  <div className="flex justify-between">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-[4px] bg-teal-500 dark:bg-teal-500">
                      <Image
                        src="/images/icon/icon-03.svg"
                        width={36}
                        height={36}
                        alt="title"
                      />
                    </div>
                    <div>
                      <Checkbox
                        {...label}
                        icon={<PanoramaFishEyeIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={recruiterChecked}
                        onChange={() => handleChange(!recruiterChecked)}
                        inputProps={{ "aria-label": "controlled" }}
                        className="radius-[25px] border "
                        sx={{
                          color: "#94A3B8",
                          "&.Mui-checked": {
                            color: "#3FC1C9",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                    Looking for talent ?
                  </h3>
                  <p>I’m a recruiter, Want to hire new talent</p>
                </div>
                <div className="z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5">
                  <div className="flex justify-between">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-[4px] bg-teal-500 dark:bg-teal-500">
                      <Image
                        src="/images/icon/icon-03.svg"
                        width={36}
                        height={36}
                        alt="title"
                      />
                    </div>
                    <div>
                      <Checkbox
                        {...label}
                        icon={<PanoramaFishEyeIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={jobSeekerChecked}
                        onChange={() => handleJobSeekerChange(!jobSeekerChecked)}
                        inputProps={{ "aria-label": "controlled" }}
                        className="radius-[25px] border "
                        sx={{
                          color: "#94A3B8",
                          "&.Mui-checked": {
                            color: "#3FC1C9",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                    Looking for a job ?
                  </h3>
                  <p>I’m a Job seeker, searching for a job</p>
                </div>
              </div>
              <div className="mb-7.5">
                <div className="flex justify-center">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-2 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  >
                    <button className="inline-flex items-center rounded-full bg-black font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    onClick={() => handleLoginClick(jobSeekerChecked)}>
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                <p>
                  Don't have an Account?{" "}
                  <Link
                    className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                    href="/auth/signup"
                  >
                    sign up
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== Selection Form End ===== --> */}
    </>
  );
};

export default SigninSelection;
