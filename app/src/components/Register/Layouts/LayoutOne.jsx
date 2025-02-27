const LayoutOne = ({ selectedTheme }) => {
    console.log(selectedTheme.navbar.background)
    return (
        <div style={{color: selectedTheme?.navbar.text}} className="flex ">
            {/* Sidebar */}
            <div style={{backgroundColor: selectedTheme?.navbar.background}} className={` w-64 `}>
                <div className="p-4 border-b border-gray-700">Sidebar</div>
                <div className="p-4 space-y-4">
                    <div style={{ background: selectedTheme?.navbar.links.background }} className="h-10 rounded"></div>
                    <div style={{ background: selectedTheme?.navbar.links.background }} className="h-10 rounded"></div>
                    <div style={{ background: selectedTheme?.navbar.links.hover }} className="h-10 rounded"></div>
                    <div style={{ background: selectedTheme?.navbar.links.background }} className="h-10 rounded"></div>
                </div>
                
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-4 grid grid-cols-3 gap-4">
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                    <div style={{ background: selectedTheme?.card.background, borderColor: selectedTheme?.card.border  }} className="h-24 border rounded"></div>
                </main>
            </div>
        </div>
    );
};

export default LayoutOne