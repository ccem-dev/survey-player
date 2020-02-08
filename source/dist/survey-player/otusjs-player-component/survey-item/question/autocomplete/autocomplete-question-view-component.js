(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestionView', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px" layout-fill><div layout="column" flex><p layout="row" ng-hide="$ctrl.dataReady || $ctrl.dataError">Aguarde. Preparando lista de opções.</p><p layout="row" md-warn ng-show="$ctrl.dataError">Erro ao carregar opções.</p><md-autocomplete flex ng-disabled="!$ctrl.dataReady || $ctrl.answer" md-search-text="$ctrl.autoCompleteSettings.searchText" md-selected-item="$ctrl.answer" md-selected-item-change="$ctrl.update()" md-items="meds in $ctrl.searchQuery($ctrl.autoCompleteSettings.searchText)" md-item-text="meds.value" md-min-length="3" placeholder="Inicie a digitação"><md-item-template layout-fill flex><span md-highlight-text="$ctrl.autoCompleteSettings.searchText" md-highlight-flags="gi">{{meds.value}}</span></md-item-template><md-not-found><span ng-click="$ctrl.setOther()">"{{$ctrl.autoCompleteSettings.searchText}}" não encontrado. Clique para responder com "Outro"</span></md-not-found></md-autocomplete></div></div></md-content>',
      controller: "otusAutocompleteViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    })
    .controller("otusAutocompleteViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    /* Question Methods */
    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
