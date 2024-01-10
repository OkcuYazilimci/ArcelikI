
import Logging from "../model/Logging.js";

export const saveLogs = async (logData) => {
    console.log("Received log data:", logData);
    await deleteExtraLogs(10);
    const log = new Logging({
        logging: JSON.stringify(logData),
    });
    try {
        await log.save(logData);
    }
    catch (err) {
            console.error("Log could not be saved: ");
    }; 
};

export const deleteExtraLogs = async (limit) => {
    try {
      const logsCount = await Logging.countDocuments();
  
      if (logsCount > limit) {
        const extraLogsToDelete = logsCount - limit;
        const extraLogs = await Logging.find().sort({ timestamp: -1 }).skip(limit);
  
        await Logging.deleteMany({ _id: { $in: extraLogs.map(log => log._id) } });
        console.log(`${extraLogsToDelete} old logs deleted.`);
      }
    } catch (err) {
      console.error("Error deleting extra logs: ", err);
    }
  };