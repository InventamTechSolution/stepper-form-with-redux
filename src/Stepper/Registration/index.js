import React from "react";
import { Stepper, Step } from "react-form-stepper";
import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "./BasicInfo";
import Address from "./Address";
import Education from "./Education";
const index = () => {
  const _GO_STEPS = useSelector((state) => state.common.goSteps);

  const _All_DETAIL = useSelector((state) => state.common.allDetail);

  // const _GO_STEPS = 0;
  return (
    <>
      <h1>Registration</h1>
      <Stepper activeStep={_GO_STEPS}>
        <Step label="Basic Info" />
        <Step label="Address" />
        <Step label="Education" />
      </Stepper>
      <div>
        {_GO_STEPS === 0 && (
          <div>
            <BasicInfo data={_All_DETAIL} />
          </div>
        )}
        {_GO_STEPS === 1 && (
          <div>
            <Address data={_All_DETAIL} />
          </div>
        )}
        {_GO_STEPS === 2 && (
          <div>
            <Education data={_All_DETAIL} />
          </div>
        )}
      </div>
    </>
  );
};

export default index;
