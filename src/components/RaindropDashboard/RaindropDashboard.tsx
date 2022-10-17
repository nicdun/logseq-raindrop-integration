import React, { FC } from "react";

interface RaindropDashboardProps {}

const RaindropDashboard: FC<RaindropDashboardProps> = () => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setFilter(e.target.value);
  };

  return (
    <>
      <span>TEST</span>
    </>
  );
};
export default RaindropDashboard;
