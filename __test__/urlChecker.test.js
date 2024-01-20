import { checkForUrl } from "../src/client/js/urlChecker";

describe('Testing URL checker', () => {
    test('checkForUrl function is defined', () => {
        expect(checkForUrl).toBeDefined();
    });

    test('URL validation works correctly', () => {
        expect(checkForUrl('http://example.com')).toBe(true);
        expect(checkForUrl('invalid_url')).toBe(false);
    });
});
