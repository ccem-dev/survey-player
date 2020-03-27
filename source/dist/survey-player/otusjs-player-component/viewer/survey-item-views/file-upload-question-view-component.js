(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('fileUploadQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><p ng-show="$ctrl.filters.fillingBox" ng-repeat="file in $ctrl.item.answer">{{file.name}}</p></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });

  function Controller() {
  }

}());