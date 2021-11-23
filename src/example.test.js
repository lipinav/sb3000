test('some', () => {
  expect(true).toBe(true)
});

test('should return 2 when add one and one', () => {
  expect(1 + 1).toBe(2)
});

describe('Add function', () => {  // fuction name
  test('should return 2 when add one and one', () => {
    expect(1 + 1).toBe(2)
  });
  describe('again', () => {  // fuction name
    test('should return 2 again', () => {
      expect(1 + 1).toBe(2)
    });
  })
})
