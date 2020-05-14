(function () {
  'use strict';

  angular
    .module('otusjs.player.standalone')
    .service('IndexedDbStorageService', Service);

  Service.$inject = [
    '$q',
    '$window'
  ];

  function Service($q, $window) {
    const DB_NAME = 'survey-player';

    var self = this;
    var _dbManager = {};
    var _idbAdapter = new LokiIndexedAdapter(DB_NAME);

    /* Public methods */
    self.getDb = getDb;
    self.newDb = newDb;
    self.loadDb = loadDb;
    self.dbExists = dbExists;
    self.deleteDatabase = deleteDatabase;

    function getDb(dbName) {
      return _dbManager[dbName].lokiDb;
    }

    function newDb(dbName, storages) {
      _dbManager[dbName] = {};
      _dbManager[dbName].loading = $q.defer();
      _dbManager[dbName].storages = storages;
      _dbManager[dbName].lokiDb = new loki(dbName, {
        autoload: true,
        autoloadCallback: function () {
          _newDbLoadHandler(dbName);
        },
        adapter: _idbAdapter
      });
      return _dbManager[dbName].loading.promise;
    }

    function loadDb(dbName, storages) {
      _dbManager[dbName] = {};
      _dbManager[dbName].loading = $q.defer();
      _dbManager[dbName].storages = storages;
      _dbManager[dbName].lokiDb = new loki(dbName, {
        autoload: true,
        autoloadCallback: function () {
          _existentDbLoadHandler(dbName);
        },
        adapter: _idbAdapter
      });

      return _dbManager[dbName].loading.promise;
    }

    function dbExists(dbName) {
      var response = $q.defer();

      _idbAdapter.getDatabaseList(function (dbList) {
        var result = dbList.some(function (foundedDbName) {
          return (foundedDbName === dbName);
        });
        response.resolve(result);
      });

      return response.promise;
    }

    function _newDbLoadHandler(dbName) {
      _dbManager[dbName].storages.forEach(function (storage) {
        storage.initialize(addCollection(dbName, storage), getDb(dbName));
      });
      getDb(dbName).saveDatabase();
      _dbManager[dbName].loading.resolve();
    }

    function _existentDbLoadHandler(dbName) {
      _dbManager[dbName].storages.forEach(function (storage) {
        storage.initialize(
          getDb(dbName).getCollection(storage.collectionName) || addCollection(dbName, storage),
          getDb(dbName)
        );
      });
      _dbManager[dbName].loading.resolve();
    }

    function deleteDatabase() {
      _dbManager[DB_NAME].lokiDb.collections.forEach(function (collection) {
        collection.clear();
      });
      _dbManager[DB_NAME].lokiDb.deleteDatabase();
    }

    function addCollection(dbName, storage) {
      if (!storage.options) {
        storage.options = {};
      }
      return getDb(dbName).addCollection(storage.collectionName, storage.options);
    }
  }
}());
