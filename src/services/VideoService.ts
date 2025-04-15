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
}
