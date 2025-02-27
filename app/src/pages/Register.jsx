import CRMSetup from "../components/Register/CRMSetup";
import { useSelector } from "react-redux";
import VerifyEmail from "../components/Register/verifyEmail";
import SetPassword from "../components/Register/setPassword";
import WelcomeStep from "../components/Register/WelcomeStep";

const Register = () => {
    const { step } = useSelector((state) => state.register)

    const renderStep = () => {
        switch (step) {
            case 1:
                return <WelcomeStep />;
            case 2:
                return <VerifyEmail />;
            case 3:
                return <SetPassword />;
            case 4:
                return <CRMSetup />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-evenly text-white">
            {renderStep()}
        </div>
    );
};

export default Register;
