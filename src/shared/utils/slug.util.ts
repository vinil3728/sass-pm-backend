export class SlugUtil {
    static generate(
        value: string
    ): string {
        return value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }
}