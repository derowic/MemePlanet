import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";
import "./styles.css"; // Importuj plik ze stylami
function SidePanel() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={togglePanel}>
                {" "}
                <div className="text-white">Add Post</div>
            </Button>
            <Drawer anchor="bottom" open={isOpen} onClose={togglePanel}>
                <div className="panel-content">Dodatkowy panel</div>
            </Drawer>
        </div>
    );
}

export default SidePanel;
