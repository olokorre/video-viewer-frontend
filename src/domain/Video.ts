export default class Video {
    constructor(readonly name: string, readonly description: string, readonly content: File) { }

    async getContent(): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(this.content);
        });
    }
}
