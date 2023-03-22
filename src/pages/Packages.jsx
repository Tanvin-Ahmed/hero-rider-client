import { useState } from "react";
import PackageCard from "../components/package/PackageCard";
import { packages } from "../utils/data";

const Packages = () => {
  const [packagesData] = useState(packages || []);
  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-screen overflow-y-auto flex justify-center items-center flex-col">
        <h1 className="text-[30px] mb-4">Our provided Courses</h1>
        <div className="flex justify-center items-center flex-wrap sm:flex-nowrap gap-4">
          {packagesData.map((p) => (
            <PackageCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
