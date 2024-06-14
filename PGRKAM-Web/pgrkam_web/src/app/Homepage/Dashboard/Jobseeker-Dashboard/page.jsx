"use client";
import React from 'react'
import { useState, useEffect } from "react";
import Loader from "../../../../Components/JobSeekerDashboard/common/Loader/index"
import Navbar from "../../../../Components/JobSeekerDashboard/Navbar/index"
import Sidebar from "../../../../Components/JobSeekerDashboard/Sidebar/index"
import Dashboard from "../../../../Components/JobSeekerDashboard/Dashboard/Dashboard"
const page = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
      }, []);

  return (
    <div>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <Dashboard />
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
        </div>
    </div>
  )
}

export default page
