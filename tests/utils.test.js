const utils = require("../src/utils/utils");

test("renameLabel() removes underscores", () => {
    expect(utils.renameLabel("test_label")).toBe("test label");
});

test("range() generates array with correct numbers", () => {
    expect(utils.range(1,10)).toEqual([1,2,3,4,5,6,7,8,9,10]);
    expect(utils.range(5,6)).toEqual([5,6]);
})