export type oEvent = {
    name: string;
    dateTime: Date; // Always stored in UTC
    /**
     * Determines whether the event occurs at different local times worldwide (true)
     * or at a fixed global UTC time (false).
     */
    isLocal: boolean;
    description: string;
    coverImgUrl: string;
}