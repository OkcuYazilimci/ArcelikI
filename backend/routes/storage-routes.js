import { upload } from './middleware/multer.js';
import { uploadImage } from '../controllers/storage-controller.js';

const storageRouter = express.Router();

storageRouter.post("/test-upload",upload, uploadImage);

export default storageRouter