(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('singleSelectionQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill xmlns="http://www.w3.org/1999/html"><p class="md-caption" style="color: gray;">Resposta</p><div ng-repeat="option in $ctrl.item.answer" layout-align="start, center"><md-icon style="font-size: 23px; margin-top: 3px;" ng-show="option.value===1">radio_button_checked</md-icon><md-icon style="font-size: 23px; margin-top: 3px;" ng-hide="option.value===1">radio_button_unchecked</md-icon><span ng-bind-html="option.label.ptBR.formattedText"></span></div></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {
  }

}());
