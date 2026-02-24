from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# 🔥 MUST match what you used during training
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array

app = FastAPI()

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
model = tf.keras.models.load_model(
    r"model/trained_eye_disease_model.h5",
    compile=False
)

class_names = ['CNV', 'DME', 'DRUSEN', 'NORMAL']


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        # Load and preprocess image EXACTLY like notebook
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((160, 160))  # Must match training size

        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)

        # 🔥 Critical step for MobileNetV3
        img_array = preprocess_input(img_array)

        prediction = model.predict(img_array)
        result_index = int(np.argmax(prediction))

        # Optional debug (uncomment if needed)
        # print("Prediction vector:", prediction)

        return {
            "prediction": class_names[result_index],
            "confidence": float(np.max(prediction))
        }

    except Exception as e:
        return {
            "error": str(e)
        }