import VideoForm from "@/domain/VideoForm";
import VideoList from "@/domain/VideoList";
import VideoView from "@/domain/VideoView";

export default class VideoService {

    constructor(private readonly api: string) {
    }

    async upload(video: VideoForm): Promise<void> {
        await fetch(`${this.api}/videos/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: video.name,
                description: video.description,
                content: await video.getContent(),
            }),
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
