import React from 'react';
import { ProgressBarProvider } from 'react-redux-progress';

export const ProgressBar = ({progress}) => (
    <ProgressBarProvider isActive={progress } color="#f44336" styles={{height: '4px'}} />
);

