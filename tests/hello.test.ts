describe('Hello', () => {
    it('should Hello', () => {
        function hello(name: string) : string {
            return `Hello ${name}`;
        }

        expect(hello('berli')).toBe('Hello berli');
    });
});