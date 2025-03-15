from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# 允许的图片和 SVG 文件类型
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "svg", "bmp", "webp"}

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

# 设置静态文件目录
STATIC_DIR = "src/css/src"


# 提供静态文件
@app.get("/{filename:path}")
async def serve_file(filename: str):
    if "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS:
        file_path = os.path.join(STATIC_DIR, filename)
        if os.path.exists(file_path):
            return FileResponse(file_path)
        else:
            raise HTTPException(status_code=404, detail="File not found")
    else:
        raise HTTPException(status_code=403, detail="File type not allowed")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3000)
