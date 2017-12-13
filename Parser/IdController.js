var IdController = (function(){
	function IdController() {

		//init IdController
    this.array = new Array();

    this.array[InputType.localId] = new Array();
    this.array[InputType.string] = new Array();

    //this.array[InputType.globalId] = new Array();

    /*
    
  $('#someId').autocomplete({
    source: someSource,
    autofocus: true
});
  
  $(input).easyAutocomplete(
    {
      list: IdController.options(inputType)
    }
  );


    */

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
  };

  function getId(type){
	 return instance.array[type];
  };

  function add(id,type){
        
    if(type == InputType.globalId)
      type = InputType.localId;
    
    for(var k=0; k<instance.array[type].length; k++){
      if(instance.array[type][k] == id)
        return;
    }
    
    return instance.array[type].push(id);
  };

})();