import { Home, Search, PlusCircle, User } from "lucide-react";

const LayoutThree = ({ selectedTheme }) => {
    const textColor = selectedTheme?.text?.primary
    console.log(textColor)
    return (
        <div className="flex flex-col">
            {/* Main Content */}
            <div className="flex-1 p-4 grid grid-cols-3 gap-4">
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
            </div>

            {/* Bottom Navigation */}
            <div style={{color: selectedTheme?.navbar.text, backgroundColor: selectedTheme?.navbar.background}} className={`transform mx-auto w-full max-w-sm p-4 rounded-t-lg flex justify-around`}>
                <button className="flex flex-col items-center">
                    <Home size={24} />
                    <span className="text-xs">Home</span> 
                </button>
                <button className="flex flex-col items-center">
                    <Search size={24} />
                    <span className="text-xs">Search</span>
                </button>
                <button className="flex flex-col items-center">
                    <PlusCircle size={24} />
                    <span className="text-xs">Add</span>
                </button>
                <button className="flex flex-col items-center">
                    <User size={24} />
                    <span className="text-xs">Profile</span>
                </button>
            </div>
        </div>
    );
};

export default LayoutThree;
