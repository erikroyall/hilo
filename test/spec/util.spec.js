describe("Hilo.noConflict()", function () {
  it("should not delete $ before calling", function () {
    expect((function () {
      try {
        return ('noConflict' in $);
      } catch (e) {
        return false;
      }
    }())).toEqual(true);
    Hilo.noConflict();
  });
  it("should delete shorthand $ on calling", function () {
    expect((function () {
      try {
        return ('noConflict' in $);
      } catch (e) {
        return false;
      }
    }())).not.toEqual(true);
  });
});
