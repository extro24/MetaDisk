(function(window, undefined)
{
	var indexedDB = window.indexedDB = window.indexedDB || window.mozIndexedDB ||
		window.webkitIndexedDB || window.msIndexedDB || { polyfill : true };

	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;

	if (!indexedDB.polyfill) return;

	console.warn('This browser most likely does not support IndexedDB technology. Initialing custom IndexedDB' +
		' implementation using Web SQL Database technology.');


	// Configuration
	indexedDB.SCHEMA_TABLE = "__IndexedDBSchemaInfo__";
	indexedDB.INDEXEDDB_METADATA_CURRENT_VERSION = "v1.0";
	indexedDB.DB_PREFIX = "__INDEXEDDB__";
	indexedDB.DB_DESCRIPTION = "IndexedDB ";
	indexedDB.DEFAULT_DB_SIZE = 5 * 1024 * 1024;
	indexedDB.CURSOR_CHUNK_SIZE = 10;

	// Data types
	indexedDB.DOMStringList = function () { };
	indexedDB.DOMStringList.prototype = [];
	indexedDB.DOMStringList.constructor = indexedDB.DOMStringList;
	indexedDB.DOMStringList.prototype.contains = function (str)
	{
		return this.indexOf(str) >= 0;
	};


	indexedDB.util =
	{
		async : function (fn) { w_setTimeout(fn, 0); },

		exception : function (type, message, innerException)
		{
			var result = new w_Error(message);
			result.type = type;
			result.inner = innerException;
			return result;
		},

		error : function (name, message, inner)
		{
			return {
				name : name,
				message : message,
				inner : inner
			}
		},

		event : function (type, target)
		{
			return {
				type : type,
				target : target,
				currentTarget : target,
				preventDefault : function () { }
			};
		}
	};

	/*
	IDBVersionChangeEvent.prototype = new Event(null);
	IDBVersionChangeEvent.prototype.constructor = IDBVersionChangeEvent;
	function IDBVersionChangeEvent ()
	{
		this.oldVersoin = null;
		this.newVersion = null;
	}
	*/

	var IDBDatabaseException = window.IDBDatabaseException =
	{
		ABORT_ERR : 8,
		CONSTRAINT_ERR : 4,
		DATA_ERR : 5,
		NON_TRANSIENT_ERR : 2,
		NOT_ALLOWED_ERR : 6,
		NOT_FOUND_ERR : 3,
		QUOTA_ERR : 11,
		READ_ONLY_ERR : 9,
		TIMEOUT_ERR : 10,
		TRANSACTION_INACTIVE_ERR : 7,
		UNKNOWN_ERR : 1,
		VERSION_ERR : 12
	};

	// Cached
	var w_Error = window.Error;
	var w_setTimeout = window.setTimeout;

}(window));
