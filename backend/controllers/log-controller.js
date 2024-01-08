
import Logging from "../model/Logging.js";

export const saveLogs = async (logData) => {
    console.log("Received log data:", logData);

    const log = new Logging({
        logging: JSON.stringify(logData),
    });
    try {
    await log.save(logData); }
    catch (err) {
            console.error("Log could not be saved: ");
    }; 
};