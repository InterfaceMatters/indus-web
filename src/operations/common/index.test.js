import { addTag, fetchTags } from './index';

describe(`Tags operations`, () => {

  it('should fetch all tags of a type', function() {
    const resolve = data => {
      console.log(data);
      expect(data).toBeDefined();
      expect(data.list).toBeDefined();
      expect(data.list.length).toBeGreaterThanOrEqual(1);
    };

    const type = 'protocols';

    return fetchTags(type).then(data => resolve(data));
  });

  it('should add a new tag of a type', function() {
    const resolve = data => {
      expect(data).toBeDefined();
      expect(data).toBe(true);
    };

    const type = 'protocols';
    const tag = 'Safety';

    return addTag(type, tag).then(data => resolve(data));
  });
});
