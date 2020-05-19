module.exports = {
    name: "bulkUploadRequest",
    schema: {
      id: "ObjectId",
      requestType:{
        type: String,
        required: true
      },
      remarks:{
        type: String
      },
      userId:{
        type: String,
        required: true
      },
      file:{
        type: Object
      },
      metaInformation:{
        type:Object
      },
      status: {
        type: String,
        default: "pending"
      }
    }
  };