from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io


from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array

app = FastAPI()

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = tf.keras.models.load_model(
    r"model/trained_eye_disease_model.h5",
    compile=False
)

class_names = ['CNV', 'DME', 'DRUSEN', 'NORMAL']


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((160, 160))  

        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)

        # DEBUG: Log image shape
        print(f"DEBUG: Input Image Shape: {img_array.shape}")

        # VALIDATION 1: Reject color images (OCT scans are grayscale)
        # Calculate standard deviation across RGB channels. Grayscale images have ~0 variance.
        color_variance = np.mean(np.std(img_array[0], axis=-1))
        if color_variance > 10.0:
            print(f"DEBUG: Rejected. Color variance too high: {color_variance}")
            return {"prediction": "Invalid Image", "confidence": 0.0, "error": "Uploaded image is not a valid grayscale OCT scan."}

        # VALIDATION 2: Reject blank/solid images
        # OCT scans have bright structures on a dark background. Solid images have ~0 overall variance.
        overall_std = np.std(img_array[0])
        if overall_std < 10.0:
            print(f"DEBUG: Rejected. Image too uniform (std: {overall_std})")
            return {"prediction": "Invalid Image", "confidence": 0.0, "error": "Image is too uniform to be a valid retinal scan."}

        # SCALING FIX & PREPROCESSING: 
        # MobileNetV3 has a built-in Rescaling layer (scale=1/127.5, offset=-1).
        # Therefore, we MUST pass inputs in the [0, 255] range.
        # We use preprocess_input which correctly leaves inputs in [0, 255] for this architecture.
        img_array = preprocess_input(img_array)

        prediction = model.predict(img_array)
        result_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        # DEBUG: Log prediction tensors and probabilities
        print(f"DEBUG: Prediction Tensor: {prediction}")
        print(f"DEBUG: Probabilities: {prediction[0]}")
        print(f"DEBUG: Selected Class: {class_names[result_index]}")
        print(f"DEBUG: Confidence: {confidence}")

        # VALIDATION 3: Confidence Thresholding (Uncertain Fallback)
        if confidence < 0.65:
            return {
                "prediction": "Uncertain Prediction",
                "confidence": confidence
            }

        return {
            "prediction": class_names[result_index],
            "confidence": confidence
        }

    except Exception as e:
        print(f"DEBUG: Exception occurred: {str(e)}")
        return {
            "error": str(e)
        }