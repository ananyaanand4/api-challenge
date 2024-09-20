export function isValidDecodeFormat(profile: object): boolean {
    try {
        return (
            typeof profile === 'object' &&
            profile !== null &&
            typeof (profile as any).token === 'string'
        );
    } catch (error) {
        return false;
    }
}