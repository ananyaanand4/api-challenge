export function isValidEncodeFormat(profile: string): boolean {
    const userJson = JSON.parse(profile);
    try {
        const profile = JSON.parse(userJson);
        return (
            typeof profile.user === 'string'
        );
    } catch (error) {
        return false;
    }
}