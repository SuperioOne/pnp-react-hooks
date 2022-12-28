import { mergeDependencies } from "../../src/utils/merge";

test("Merge Test", () =>
{
    expect(() =>
    {
        const obj = {
            test: "test"
        };
        const arr = ["0x00"];

        const mergedDeps = mergeDependencies(
            [1, 2, 3],
            ["a", "b", "c", undefined, null],
            undefined,
            [],
            [obj, arr]);

        const expected = [1, 2, 3, "a", "b", "c", undefined, null, obj, arr];

        if (mergedDeps.length !== expected.length)
        {
            throw new Error("Merged and expected results has different element count");
        }

        for (let index = 0; index < mergedDeps.length; index++)
        {
            if (mergedDeps[index] !== expected[index])
            {
                throw new Error(`Elements are not equal, merged : ${mergedDeps[index]} expected :${expected[index]}`);
            }
        }
    }).not.toThrowError();
});