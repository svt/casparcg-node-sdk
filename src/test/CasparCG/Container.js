import CasparDeviceContainer from '../../../src/CasparCG/Container';

test('should create one primary CasparDevice when initilize', () => {
  const casparCGContainer = new CasparDeviceContainer('test-name', 'localhost', 5250);
  const totalCasparClients = Object.keys(casparCGContainer.casparClients).length;
  expect(totalCasparClients).toBe(1);
});

test('should create one primary and one shaddow CasparDevice when adding one', () => {
  const casparCGContainer = new CasparDeviceContainer('test-name-primary', 'localhost', 5250);
  casparCGContainer.add('test-name-shaddow', 'localhost', 5250)
  const totalCasparClients = Object.keys(casparCGContainer.casparClients).length;
  expect(totalCasparClients).toBe(2);
  expect(casparCGContainer.casparClients['test-name-shaddow'].props.shaddow).toBe(true);
});