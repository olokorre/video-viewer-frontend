import Video from "@/domain/Video";

export default class VideoService {

    constructor(private readonly api: string) {
    }

    async upload(video: Video): Promise<void> {
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

    async list(): Promise<Video[]> {
        const response = await fetch(`${this.api}/videos/list`);
        if (!response.ok) {
            throw new Error("Failed to fetch videos");
        }
        const videosData = await response.json();
        return videosData.map((videoData: { title: string, description: string }) => {
            return new Video(videoData.title, videoData.description);
        });
    }
}
