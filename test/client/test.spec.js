function square(x) {
  return x * x;
}

describe('simple test<div></div> ' , function() {
  it('should return sqrt ', function() {
    let sqr = square(4);
    expect(sqr).toEqual(16);
  });
})