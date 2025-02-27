import React, { useState } from 'react'
import BuisnessType from './SetUp/BuisnessType';
import CustomWorkflow from './SetUp/CustomWorkflow';
import LayoutTheme from './SetUp/LayoutTheme';
import SetupComplete from './SetUp/SetupComplete';
import { useSelector } from 'react-redux';

const CRMSetup = () => {
    const {step} = useSelector((state) => state.setup)

    const renderStep = () => {
        switch (step) {
            case 1:
                return <BuisnessType />;
            case 2:
                return <CustomWorkflow />;
            case 3:
                return <LayoutTheme />;
            case 4:
                return <SetupComplete />;
            default:
                return <BuisnessType />;
        }
    };

    return (
        <div className="flex items-center justify-evenly min-h-screen bg-gradient-to-t from-indigo-500 to-gray-900 w-full text-white">
            <div className="flex w-full flex-col">
                {renderStep()}
            </div>
        </div>
    );
}

export default CRMSetup