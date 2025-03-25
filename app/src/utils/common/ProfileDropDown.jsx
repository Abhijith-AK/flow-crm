import { useState, useEffect, useRef } from "react";
import { LogOut, UserCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ profileName }) => {
    const [open, setOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate("/login", { replace: true });
    };

    // Adjust dropdown position
    useEffect(() => {
        if (open && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setDropUp(window.innerHeight - rect.bottom < 80); // 80px buffer
        }
    }, [open]);

    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
            >
                <UserCircle size={30} />
                <span className="font-bold hidden text-2xl sm:inline">{profileName}</span>
                <ChevronDown
                    size={20}
                    className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    ref={dropdownRef}
                    className={`absolute right-0 w-40 bg-white shadow-lg rounded-lg py-2 ${dropUp ? "bottom-12" : "top-12"
                        }`}
                >
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
