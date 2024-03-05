import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/libs/firebaseConfig";

// TODO: Convert this into Google Cloud

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    // upload the file
    const file = data.get("file");
    // Determine the content type dynamically based on the file type
    const contentType = file.type || "image/jpeg";
    console.log(contentType);

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType,
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Creating an empty link variable
    let link;
    // Listen for state changes, errors, and completion of the upload.
    // Wrap the uploadTask.on callback in a Promise
    const uploadComplete = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            link = downloadURL;
            resolve(link);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });

    // Wait for the upload to complete before returning a response
    try {
      link = await uploadComplete;
      return Response.json(link);
    } catch (error) {
      console.error("Error in uploadComplete Promise:", error);
      return Response.json(
        { error: "Error in uploadComplete Promise" },
        { status: 500 }
      );
    }

    // uploadTask.on(
    //   "state_changed",

    //   async () => {
    //     try {
    //       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    //       console.log("File available at", downloadURL);
    //       link = downloadURL;
    //       return Response.json(link);
    //     } catch (error) {
    //       // Handle errors when getting download URL
    //       console.error("Error getting download URL:", error);
    //       return Response.json(
    //         { error: "Error getting download URL" },
    //         { status: 500 }
    //       );
    //     }
    //   }
    // );
  }
}
