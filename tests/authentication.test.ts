import Authentication from '../src/utils/authentication';

describe('Authentication', () => {
    it('should hash a password', async () => {
        const password = 'mypassword';
        const hashedPassword = await Authentication.passwordHash(password);
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(password);
    });
});