import { Dimensions, compute, snap } from "../hooks";

describe("computeWidth", () => {
  describe("sequential", () => {
    it("Width 300", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 300 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(
        compute(new Dimensions(widths, index, size, minWidth, offsetWidth))
      ).toEqual([0.2, 0.3, 0.1, 0.2, 0.2]);
    });

    it("Width 400", () => {
      const widths = [0.2, 0.3, 0.1, 0.2, 0.2];
      const index = 1;
      const size = { width: 400 };
      const offsetWidth = 1000;
      const minWidth = 100;
      const result = compute(
        new Dimensions(widths, index, size, minWidth, offsetWidth)
      );
      expect(result).toEqual([0.2, 0.4, 0.1, 0.1, 0.2]);
    });

    it("Width 500", () => {
      const widths = [0.2, 0.4, 0.1, 0.1, 0.2];
      const index = 1;
      const size = { width: 500 };
      const offsetWidth = 1000;
      const minWidth = 100;
      const result = compute(
        new Dimensions(widths, index, size, minWidth, offsetWidth)
      );
      expect(result).toEqual([0.2, 0.5, 0.1, 0.1, 0.1]);
    });
  });

  describe("non-sequential", () => {
    it("Width 500", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 500 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(
        compute(new Dimensions(widths, index, size, minWidth, offsetWidth))
      ).toEqual([0.2, 0.5, 0.1, 0.1, 0.1]);
    });

    it("Width 800", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 800 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(
        compute(new Dimensions(widths, index, size, minWidth, offsetWidth))
      ).toEqual([0.2, 0.5, 0.1, 0.1, 0.1]);
    });

    it("Decrease to 200", () => {
      const widths = [
        0.3333333333333333, 0.3333333333333333, 0.3333333333333333,
      ];
      const index = 1;
      const size = { width: 200 };
      const offsetWidth = 1000;
      const minWidth = 200;

      const result = compute(
        new Dimensions(widths, index, size, minWidth, offsetWidth)
      );
      expect(result).toEqual([0.33333333333333326, 0.2, 0.46666666666666656]);
    });
  });
});

describe("Snap to grid", () => {
  it("Dont snap", () => {
    const offsetWidth = 1200;
    expect(snap(offsetWidth, { width: 155 }, 240)).toEqual({ width: 115 });
    expect(snap(offsetWidth, { width: 235 }, 240)).toEqual({ width: 195 });
  });

  it("Do snap", () => {
    const offsetWidth = 1200;

    expect(snap(offsetWidth, { width: 190 }, 190)).toEqual({ width: 200 });
    expect(snap(offsetWidth, { width: 210 }, 210)).toEqual({ width: 200 });
  });
});
