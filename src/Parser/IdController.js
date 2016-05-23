var IdController = (function(){
	function IdController() {

		//init IdController
    this.array = new Array();

    this.array[InputType.localId] = new Array();
    this.array[InputType.globalId] = new Array();

    this.options = {    
      //json
      data: this.array[InputType.localId],

      list: {

        match: {
          enabled: true
        },

        showAnimation: {
          type: "fade", //normal|slide|fade
          time: 200,
          callback: function() {}
        },

        hideAnimation: {
          type: "slide", //normal|slide|fade
          time: 200,
          callback: function() {}
        }
      }
    };

	};
    
  var instance;

  return {
      getInstance: function(){
          if (instance == null) {
              instance = new IdController();
              // Hide the constructor so the returned objected can't be new'd...
              instance.constructor = null;
          }
          return instance;
      },
      getId: getId,
      add: add,
      options: options
  };

  function getId(type){
	  return instance.array[type];
  };

  function options(type){
    instance.options.data = getId(type);
    return instance.options; 
  };

  function add(id,type){
    return instance.array[type].push(id);
  };

})();