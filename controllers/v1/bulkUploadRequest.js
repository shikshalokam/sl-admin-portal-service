/**
 * name : bulkUploadRequest.js
 * author : Rakesh Kumar
 * created-date : 13-May-2020
 * Description : bulk upload operations 
 */

const bulkUploadHelper = require(MODULES_BASE_PATH + "/bulk-upload-request/helper.js");

/**
   * BulkUploadRequest
   * @class
*/
module.exports = class BulkUploadRequest extends Abstract {
  constructor() {
    super(schemas["bulkUploadRequest"]);
  }

  static get name() {
    return "bulkUploadRequest";
  }

  /**
  * @api {get} /admin-service/api/v1/bulkUploadRequest/bulkUpload 
  * For bulk upload
  * @apiVersion 1.0.0
  * @apiGroup Bulk Upload
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /admin-service/api/v1/bulkUploadRequest/bulkUpload
  * @apiParam {File} users list file of type CSV. 
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * {
  *  result: { requestId: "ADSASSq31" },
  *  message:"Request Submitted Successfully"
  * }
  **/

  /**
   * For bulk upload
   * @method
   * @name bulkUpload
   * @param  {req}  - requested data.
   * @returns {json} Response consists of request details
  */

  bulkUpload(req) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!req.files || !req.files.uploadFile ) {
          throw {
            status: httpStatusCode["bad_request"].status,
            message: httpStatusCode["bad_request"].message
          };
        }
        let uploadRequest = await bulkUploadHelper.bulkUpload(req, req.userDetails.userId);
        return resolve(uploadRequest);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }



  /**
   * @api {get} /admin-service/api/v1/bulkUploadRequest/list 
   * Bulk request list
   * @apiVersion 1.0.0
   * @apiGroup Bulk Upload
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiSampleRequest /admin-service/api/v1/bulkUploadRequest/list
   * @apiUse successBody
   * @apiUse errorBodyuser
   * @apiParamExample {json} Response:
   * {
   * "status": 200,
   * "result": {
   *     "count": 173,
   *     "column": [
   *         {
   *             "type": "column",
   *             "visible": false,
   *             "label": "Select",
   *             "key": "id"
   *         },
   *         {
   *             "type": "column",
   *             "visible": true,
   *             "label": "Request Id",
   *             "key": "requestId"
   *         },
   *         {
   *             "type": "column",
   *             "visible": true,
   *             "label": "Request Type",
   *             "key": "requestType"
   *         },
   *         {
   *             "type": "column",
   *             "visible": true,
   *             "label": "Status",
   *             "key": "status"
   *         },
   *         {
   *             "type": "column",
   *             "visible": true,
   *             "label": "Created At",
   *             "key": "createdAt"
   *         },
   *         {
   *             "type": "action",
   *             "visible": true,
   *             "label": "Files",
   *             "key": "files",
   *             "actions": [
   *                 {
   *                     "key": "view",
   *                     "label": "View",
   *                     "visible": true,
   *                     "icon": "view"
   *                 },
   *                 {
   *                     "key": "edit",
   *                     "label": "Edit",
   *                     "visible": true,
   *                     "icon": "edit"
   *                 }
   *             ]
   *         }
   *     ],
   *     "data": [
   *         {
   *             "_id": "5ecd316df4f8070d92bcfdfd",
   *             "status": "pending",
   *             "requestId": "503g62oikao23yo9",
   *             "requestType": "userCreation",
   *             "createdAt": "26th May 2020",
   *             "inputFileAvailable": true,
   *             "successFileAvailable": true,
   *             "errorFileAvailable": true
   *         }
   *     ]
   * }
   * }
   * 
  **/

  /**
   * Bulk upload request list
   * @method
   * @name list
   * @param  {req}  - requested data.
   * @returns {json} Response consists of created user details
  */

  list(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let list = await bulkUploadHelper.list(req.userDetails.userId,
          req.searchText,
          req.pageSize,
          req.pageNo,
          req.userDetails.userToken, 
          req.query.status,
          req.query.requestType
        );
        return resolve(list);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }

  /**
   * @api {get} /admin-service/api/v1/bulkUploadRequest/getDownloadableUrls 
   * Get downloadable url of bulk csv files
   * @apiVersion 1.0.0
   * @apiGroup Bulk Upload
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiSampleRequest /admin-service/api/v1/bulkUploadRequest/getDownloadableUrls/p0f4n3o1kamjmacu?fileType=input
   * @apiUse successBody
   * @apiUse errorBodyuser
   * @apiParamExample {json} Response:
   * {
   * "message": "Url's generated successfully",
   * "status": 200,
   * "result": {
   *     "filePath": "d04c5432-cb7e-4bbe-ace9-1df412117ae5/1590414313_52082.csv",
   *     "url": "https://storage.googleapis.com/download/storage/v1/b/sl-dev-storage/o/d04c5432-cb7e-4bbe-ace9-1df412117ae5%2F1590414313_52082.csv?generation=1590414313701670&alt=media"
   *  }
   * }
  */

  /**
   * to get getDownloadable url
   * @method
   * @name details
   * @param  {req}  - requested data.
   * @returns {json} Response consists of getDownloadable Url
  */

  getDownloadableUrls(req) {
    return new Promise(async (resolve, reject) => {
      try {

        console.log("req.body", req.params._id);

        let response = await bulkUploadHelper.getDownloadableUrls(req.userDetails.userToken, req.params._id, req.query.fileType);
        return resolve(response);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }


   /**
   * @api {get} /admin-service/api/v1/bulkUploadRequest/getStatus 
   * Get all status of bulk upload
   * @apiVersion 1.0.0
   * @apiGroup Bulk Upload
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiSampleRequest /admin-service/api/v1/bulkUploadRequest/getStatus
   * @apiUse successBody
   * @apiUse errorBodyuser
   * @apiParamExample {json} Response:
   {
    "message": "Status list featched successfully",
    "status": 200,
    "result": [
        {
            "label": "All",
            "value": "all"
        },
        {
            "label": "Completed",
            "value": "completed"
        },
        {
            "label": "Proccessing",
            "value": "proccessing"
        }
    ]
}
**/

  /**
   * To get all status
   * @method
   * @name getStatus
   * @param  {req}  - requested data.
   * @returns {json} Response consists of status list
  */

 getStatus(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let response = await bulkUploadHelper.getStatus();
      return resolve(response);

    } catch (error) {

      return reject({
        status:
          error.status ||
          httpStatusCode["internal_server_error"].status,

        message:
          error.message ||
          httpStatusCode["internal_server_error"].message
      });
    }
  });
}


  /**
   * @api {get} /admin-service/api/v1/bulkUploadRequest/getTypes 
   * Get all request type of bulk upload
   * @apiVersion 1.0.0
   * @apiGroup Bulk Upload
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiSampleRequest /admin-service/api/v1/bulkUploadRequest/getTypes
   * @apiUse successBody
   * @apiUse errorBodyuser
   * @apiParamExample {json} Response:
   {
    "message": "Request types featched successfully",
    "status": 200,
    "result": [
        {
            "label": "All",
            "value": "all"
        },
        {
            "label": "Entity Mapping",
            "value": "entityMapping"
        },
        {
            "label": "Entity-creation",
            "value": "entity-creation"
        },
        {
            "label": "User Creation",
            "value": "userCreation"
        }
       
    ]
}
  */
  /**
   * to get all request types
   * @method
   * @name getTypes
   * @param  {req}  - requested data.
   * @returns {json} Response consists of request types 
  */

 getTypes(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let response = await bulkUploadHelper.getTypes();
      return resolve(response);

    } catch (error) {

      return reject({
        status:
          error.status ||
          httpStatusCode["internal_server_error"].status,

        message:
          error.message ||
          httpStatusCode["internal_server_error"].message
      });
    }
  });
}

};
