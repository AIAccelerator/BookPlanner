import React from 'react';

type ProgressBarProps = {
    currentStep: number;
    totalSteps: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container my-10">
        <div
        style={{ width: `${progressPercentage}%` }}
        className="progress-bar"
        >
        <span>
            {Math.round(progressPercentage)}%
        </span>
        </div>
  </div>
  );
}

export default ProgressBar;