export type oEvent = {
    id: number;
    name: string;
    dateTime: Date; // Always stored in UTC
    /**
     * Determines whether the event occurs at different local times worldwide (true)
     * or at a fixed global UTC time (false)
     * True -> If time is set to 10:00 for example, the time is set to the users localtime 10:00 regardless of their timezone.
     */
    isLocal: boolean;
    description: string;
    coverImgUrl: string;
}