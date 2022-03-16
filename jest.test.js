test("jest test add", () => {
    expect(5 + 5).toBe(10);
    expect(5 + 5).not.toBe(4);
});
test("true or false", () => {
    expect(3).toBeTruthy()
    expect(0).toBeFalsy()
})
test("test number", () => {
    expect(4).toBeLessThan(5)
    expect(100).toBeGreaterThan(1)
})
test("test object", () => {
    expect({ name: "chanokh" }).toEqual({ name: "chanokh" })
})