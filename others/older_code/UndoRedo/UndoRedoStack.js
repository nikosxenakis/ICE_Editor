/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Stack = function() {
    this._size = 0;
    this._storage = [];
};

Stack.prototype.push = function(data) {

    var size = this._size++;
  
    this._storage[size] = data;

};

Stack.prototype.pop = function() {
    var size = this._size,
            deletedData;

    if (size) {
        deletedData = this._storage[size];

        delete this._storage[size];
        this._size--;
        return deletedData;
    }
};

Stack.prototype.clear = function() {

    _.each(this._storage, function(item) {
         delete item;
        this._size--;
    });

};

function Undo(undoStack, redoStack) {
    var undo = undoStack.pop();
    if (undo) {
        redoStack.push(undo);
        Perform(undo);
    }
}

function Redo(undoStack, redoStack) {
    var redo = redoStack.pop();
    if (redo) {
        undoStack.push(redo);
        Perform(redo);
    }
}

function Perform(undoRedo, canvas) {
  
}