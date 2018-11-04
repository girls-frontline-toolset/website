const sum = require('./sum');

console.log(common.getHost());
var a = null;

describe('matching cities to foods', () => {

beforeAll(() => {

  a = function(){
    return "abc";
  };
});


// afterAll(() => {
//   return clearCityDatabase();
// });


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('test2',function(){
  expect(sum(1,3)).toBe(2);
});


test('test3',function(){
  expect(1).not.toBe(2);
});

test('test4',function(){
  expect(a()).toBe("abc");
});

});
