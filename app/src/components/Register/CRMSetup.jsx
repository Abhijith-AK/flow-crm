import React, { useState } from 'react'
import BuisnessType from './SetUp/BuisnessType';
import CustomWorkflow from './SetUp/CustomWorkflow';
import LayoutTheme from './SetUp/LayoutTheme';
import SetupComplete from './SetUp/SetupComplete';

const CRMSetup = () => {
    const [count, setCount] = useState(1);

    const renderStep = () => {
        switch (count) {
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
        <div className="flex items-center justify-evenly min-h-screen bg-gray-900 text-white">
            <div className="flex flex-col">
                {renderStep()}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                        disabled={count === 1}
                        className="px-6 py-2 bg-gray-600 rounded-lg disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setCount((prev) => Math.min(4, prev + 1))}
                        disabled={count === 4}
                        className="px-6 py-2 bg-blue-600 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CRMSetup