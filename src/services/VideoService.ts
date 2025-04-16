import VideoForm from "@/domain/VideoForm";
import VideoList from "@/domain/VideoList";
import VideoView from "@/domain/VideoView";

export default class VideoService {

    constructor(readonly api: string) {
    }

    async upload(video: VideoForm, onProgress?: (progress: number) => void): Promise<void> {
        const formData = new FormData();
        formData.append("title", video.name);
        formData.append("description", video.description);
        if (video.content) {
            formData.append("video", video.content);
        }

        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    onProgress(percent);
                }
            };
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) resolve();
                else reject(new Error(`Failed to upload video: ${xhr.statusText}`));
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.open("POST", `${this.api}/videos/upload`);
            xhr.send(formData);
        });
    }

    async list(): Promise<VideoList[]> {
        const response = await fetch(`${this.api}/videos/list`);
        if (!response.ok) {
            throw new Error("Failed to fetch videos");
        }
        const videosData = await response.json();
        return videosData.map((videoData: { id: string, title: string, description: string, thumbnail: string }) => {
            return new VideoList(videoData.id, videoData.title, videoData.description, videoData.thumbnail);
        });
    }

    async getVideo(id: string): Promise<VideoView> {
        const response = await fetch(`${this.api}/videos/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch video");
        }
        const videoData = await response.json();
        return new VideoView(
            videoData.id,
            videoData.title,
            videoData.description,
            videoData.thumbnail,
            videoData.videoUrl,
            videoData.duration,
            videoData.uploadDate,
            videoData.views,
            videoData.likes,
            videoData.dislikes,
        );
    }
}
