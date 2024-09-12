import { useState, useEffect } from "react"
import { isFirefox } from "react-device-detect";

export default function AnimateChip({ cellData, chipColor, chipRadius, setAnimateOff }) {
    const [position, setPosition] = useState({
        x: cellData.startX,
        y: cellData.startY
    });

    const [settings, setSettings] = useState({
        positionStep: 5,
        frameTime: 4.166
    });

    const setNewPosition = () => {
        const newPositionY = position.y + settings.positionStep;
        setPosition({...position, y: newPositionY});
    };

    const [timeout, setLocalTimeout] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if(isFirefox) {
            // Iz nekog razloga je animacija dosta usporena na firefoxu. Temp fix
            setSettings({...settings, positionStep: 15});
        }

        const _timeout = setTimeout(() => {
            setNewPosition();
            setCurrentTime(currentTime + settings.frameTime);
        }, settings.frameTime);
        setLocalTimeout(_timeout);
    }, []);

    useEffect(() => {
        if(!timeout) return;

        if(cellData.finalY - position.y <= 0.5) {
            clearTimeout(timeout);
            setAnimateOff();
            setLocalTimeout(null);
            return;
        }

        if(currentTime >= settings.frameTime) {
            const _timeout = setTimeout(() => {
                setNewPosition();
                setCurrentTime(currentTime + settings.frameTime);
            }, settings.frameTime);

            setCurrentTime(0);

            clearTimeout(timeout);
            setLocalTimeout(_timeout);
        }
    }, [currentTime]);

    return (
        <>
            <circle className="chip" fill={chipColor} cx={position.x} cy={position.y} r={chipRadius} />
        </>
    );
}