import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = async (req, res, next) => {
  try {
    const { file } = req; // req nesnesinden file alınıyor
    const storageFB = getStorage();

    const dateTime = Date.now();
    const fileName = `images/${dateTime}`
    const storageRef = ref(storageFB, fileName)
    const metadata = {
      contentType: file.type,
    }
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    
    res.send({
      status: "SUCCESS",
      imageName: fileName
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "ERROR",
      error: err.message
    });
  }
};

app.post('/test-upload', );

