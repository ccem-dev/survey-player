describe('HtmlBuilderService', function() {

  var camelCaseString = 'CamelCaseString';
  var tagNameString = 'camel-case-string';
  var service;

  beforeEach(function() {
    module('otusjs.player.core');
    angular.mock.module('otusjs.player.standalone');

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.player.core.renderer.HtmlBuilderService');
    });
  });

  describe('generateTagName method', function() {

    it('should replace camel case with hyphen and lower case', function() {
      expect(service.generateTagName(camelCaseString)).toEqual(tagNameString);
    });

    it('should keep the string if it is not camel case', function() {
      expect(service.generateTagName(camelCaseString.toLowerCase())).toEqual(camelCaseString.toLowerCase());
    });

  });
});
