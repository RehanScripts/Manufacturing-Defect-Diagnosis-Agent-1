const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// Sample inspection imagery used by the simulated visual-inspection stage.
export const SAMPLE_IMAGES = {
  "Surface Scratches":
    "/images/demo-inspection.png",
  "Surface Cracks":
    "https://media.db.com/images/public/6af0bc963542b3884d768dfb/aa3b9f5f8_generated_image.png",
  "Dimensional Deviation":
    "https://media.db.com/images/public/6af0bc963542b3884d768dfb/ef1346009_generated_image.png",
  "Burr Formation":
    "https://media.db.com/images/public/6af0bc963542b3884d768dfb/aa3b9f5f8_generated_image.png",
};

export const DEFAULT_SAMPLE_IMAGE = SAMPLE_IMAGES["Surface Scratches"];