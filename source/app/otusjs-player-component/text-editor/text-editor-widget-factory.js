(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .factory('OtusTextEditorWidgetFactory', OtusTextEditorWidgetFactory);

  OtusTextEditorWidgetFactory.$inject = [
    'UpdateQuestionEventFactory'
  ];

  function OtusTextEditorWidgetFactory(UpdateQuestionEventFactory) {
    var self = this;

    self.create = create;

    function create(scope, element) {
      return new OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory);
    }
    return self;
  }

  function OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory) {
    var self = this;

    self.input = angular.element(element.children()[0]);
    self.ngModel = scope.ngModel;
    self.placeholder = scope.placeholder;

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItems = getItems;
    self.getLabel = getLabel;

    _init();

    function _init() {
      if (self.ngModel) {
        _loadLabel();
      }
    }

    function getClassName() {
      return 'OtusTextEditorWidget';
    }

    function getUUID() {
      return scope.uuid;
    }

    function getLabel() {
      return self.ngModel.ptBR.formattedText;
    }

    function getElement() {
      return element;
    }

    function getParent() {
      return scope.$parent.widget;
    }

    function getItems() {
      return getParent().getItems();
    }


    element.on('focusout', function(event) {
      _saveLabel();
      UpdateQuestionEventFactory.create().execute(self);
    });

    function _saveLabel() {
      self.ngModel.ptBR.formattedText = event.target.innerHTML;
      self.ngModel.ptBR.plainText = event.target.innerText;
    }

    function _loadLabel() {
      self.getElement().children()[0].innerHTML = self.getLabel();
    }
  }
}());
