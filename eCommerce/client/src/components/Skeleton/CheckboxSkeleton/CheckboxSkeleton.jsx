import React from "react";
import "./CheckboxSkeleton.scss";

const CheckboxSkeleton = ({ numberOfItems }) => {
  return (
    <>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <div className="checkbox-skeleton-wrapper" key={index}>
          <div className="skeleton-checkbox"></div>
          <div className="skeleton-label"></div>
        </div>
      ))}
    </>
  );
};

export default CheckboxSkeleton;
