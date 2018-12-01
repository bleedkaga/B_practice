function MyError(message, fileName, lineNumber){
	if(this instanceof MyError); else return new MyError(message, fileName, lineNumber);
	this.message = message || "";
	if(fileName) this.fileName = fileName;
	if(lineNumber) this.lineNumber = lineNumber;
}

var proto = MyError.prototype = Object.create(Error.prototype);
proto.name = 'MyError';
proto.constructor = MyError;