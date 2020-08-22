import React from 'react';
import JobTitle from './JobTitle';
import Department from './Department';

const JobTitleDepartMent = () => {
  return (
    <div>
      <div className="gx-fs-xl gx-pb-3 gx-pt-3">
        Job Title
      </div>
      <JobTitle/>
      <div className="gx-fs-xl gx-pb-3 gx-pt-5">
        Departments
      </div>
      <Department/>
    </div>
  );
};

export default JobTitleDepartMent;
