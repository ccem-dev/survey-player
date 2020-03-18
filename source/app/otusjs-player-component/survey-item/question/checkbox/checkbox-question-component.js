(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
      controller: 'otusjs.player.component.CheckboxQuestionController as $ctrl',
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .controller('otusjs.player.component.CheckboxQuestionController', Controller);


  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];


  function Controller(CurrentItemService) {
    var self = this;

    self.view = false;

    self.$onInit = function () {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
      _buildAnswerArray();
    };

    self.update = function () {
      if (!_checkIfAnyTrue()) {
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
    };

    self.clear = function () {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answerArray;
      _buildAnswerArray();
    };

    function _buildAnswerArray() {
      if (!self.answerArray) {
        self.answerArray = [];
        self.itemData.options.forEach(function (option) {
          self.answerArray.push(_buildAnswerObject(option));
        });
      }
    }


    function _buildAnswerObject(option) {
      return {
        option: option.customOptionID,
        state: option.value
      };
    }


    function _checkIfAnyTrue() {
      return self.answerArray.some(function (answer) {
        return answer.state;
      });
    }
  }


}());
