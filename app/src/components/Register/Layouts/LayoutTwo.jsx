const LayoutTwo = ({selectedTheme}) => {
    return (
        <div className="flex flex-col">
            {/* Top Navigation */}
            <nav style={{ color: selectedTheme?.text.primary, backgroundColor: selectedTheme?.navbar.background }} className={`w-full p-4 flex justify-between items-center`}>
                <div style={{background: selectedTheme?.navbar.links.hover}} className="h-8 w-32 rounded"></div>
                <div className="flex space-x-4">
                    <div style={{ background: selectedTheme?.navbar.links.background }} className="h-8 w-8 rounded-full"></div>
                    <div style={{ background: selectedTheme?.navbar.links.background }} className="h-8 w-8 rounded-full"></div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-4 grid grid-cols-3 gap-4">
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 rounded border"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
                <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border }} className="h-24 border rounded"></div>
            </div>
        </div>
    );
};

export default LayoutTwo;
