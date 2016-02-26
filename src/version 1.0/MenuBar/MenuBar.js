angular
  .module('VPL_tree', ['ngMaterial'])
  .controller('menubarController', menubarController);

  function menubarController ($scope, $mdDialog) {

    this.newMenuBarAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)   
        .textContent('Starting new ' + name + '!')
        .ok('OK')
        .targetEvent(ev)
      );
    };

    this.openFileMenuBarAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)   
        .textContent('Starting new ' + name + '!')
        .ok('OK')
        .targetEvent(ev)
      );
    };

    this.exportTextMenuBarAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)   
        .textContent('Starting new ' + name + '!')
        .ok('OK')
        .targetEvent(ev)
      );
    };

  }     
