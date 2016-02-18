Stores = {};

  Stores.files = new FS.Store.S3("files", {
    accessKeyId: Meteor.settings.accessKeyId, //required
    secretAccessKey: Meteor.settings.secretAccessKey, //required
    bucket: Meteor.settings.bucket, //required
  });

 Stores.images  = new FS.Store.S3("images", {
   accessKeyId: Meteor.settings.accessKeyId, //required
   secretAccessKey: Meteor.settings.secretAccessKey, //required
   bucket: Meteor.settings.bucket, //required
	beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      //name: 'png',
    };
	}
 });

 Stores.siteImages  = new FS.Store.S3("site", {
   accessKeyId: Meteor.settings.accessKeyId, //required
   secretAccessKey: Meteor.settings.secretAccessKey, //required
   bucket: Meteor.settings.bucket, //required
folder:"site",
	beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      //name: 'png',
    };
	}
 });
Stores.any = new FS.Store.GridFS("any");


var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = '96';
  gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};

 Stores.thumbnails = new FS.Store.GridFS("thumbnails", {
	transformWrite: createSquareThumb , 
	 beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      extension: 'png',
      type: 'image/png'
    };
}
});
