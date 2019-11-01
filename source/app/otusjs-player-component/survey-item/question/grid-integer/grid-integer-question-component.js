(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridIntegerQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/grid-integer/grid-integer-question-template.html',
      controller: "otusGridIntegerQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusGridIntegerQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.view = false;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
      _fixArray();

    }

    function update(outerIndex, innerIndex) {
      assignNullsToEmptyValues();
      if (!_checkIfAnswered()) {
        clear();
        self.onUpdate({
          valueType: 'answer',
          value: null
        });
      } else {
        self.onUpdate({
          valueType: 'answer',
          value: self.answerArray
        });
      }
    }

    function _fixArray() {
      if (!Array.isArray(self.answerArray)) {
        self.answerArray = [
          []
        ];

        self.itemData.getLinesList().forEach(function (line, outerIndex) {
          self.answerArray[outerIndex] = [];
          line.getGridIntegerList().forEach(function (gridInteger,
            innerIndex) {
            self.answerArray[outerIndex][innerIndex] =
              _buildAnswerObject(gridInteger);
          });
        });
      }
    }

    function _buildAnswerObject(gridInteger) {
      return {
        objectType: 'GridIntegerAnswer',
        customID: gridInteger.customID,
        value: (gridInteger.value === undefined || gridInteger.value === '') ? null : Number(gridInteger.value)
      };
    }

    function _checkIfAnswered() {
      var result = false;
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridIntegerList().forEach(function (gridInteger,
          innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value !== null) {
            result = true;
          }
        });
      });
      return result;
    }

    function assignNullsToEmptyValues() {
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridIntegerList().forEach(function (gridInteger,
          innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value === '' || self
            .answerArray[outerIndex][innerIndex].value === undefined) {
            self.answerArray[outerIndex][innerIndex].value = null;
          }
        });
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());
