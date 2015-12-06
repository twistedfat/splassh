Stores = {};

 Stores.images  = new FS.Store.S3("images", {
   accessKeyId: Meteor.settings.accessKeyId, //required
   secretAccessKey: Meteor.settings.secretAccessKey, //required
   bucket: Meteor.settings.bucket //required
 });

Stores.any = new FS.Store.GridFS("any");


var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = '96';
  gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

Stores.thumbnails = new FS.Store.FileSystem("thumbnails", { transformWrite: createSquareThumb , 
	 beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      extension: 'png',
      type: 'image/png'
    };
  }
});
