xdescribe('otusSheetPreview', function () {
  var Mock = {};

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    module('otus.preview');

    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('test of directive otusSheetPreview', function () {

    it('element must be well defined', function () {
      var question = $compile("<question-preview></question-preview>")($rootScope);
      var text = $compile("<text-item-preview></text-item-preview>")($rootScope);
      var image = $compile("<image-item-preview></image-item-preview>")($rootScope);

      expect(question).toBeDefined();
      expect(text).toBeDefined();
      expect(image).toBeDefined();
    });

  });

});
