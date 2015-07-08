Stores = {};

 Stores.images  = new FS.Store.S3("images", {
   accessKeyId: Meteor.settings.accessKeyId, //required
   secretAccessKey: Meteor.settings.secretAccessKey, //required
  bucket: Meteor.settings.anyStoreBucket //required
 });
