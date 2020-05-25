/**
 * name : constants/endpoints.js
 * author : Rakesh Kumar
 * Date : 17-March-2020
 * Description : All service endpoints
 */

module.exports = {

    // usermanagement API's
    // PLATFORM_USER_PROFILE : "/platformUserRoles/getProfile",
    PLATFORM_USER_PROFILE : "/userExtension/getProfile",
    PLATFORM_USER_CREATE : "/userExtension/Create",
    PLATFORM_USER_UPDATE : "/platformUserRoles/update",
    STATUS_UPDATE:"/userExtension/statusUpdate",
    USER_DETAILS:"/userExtension/userDetails",

    // subird API's
    SUNBIRD_ADD_USER_TO_ORG : "/api/org/v1/member/add",
    SUNBIRD_ASSIGN_ROLES_TO_ORG : "/api/user/v1/role/assign",
    SUNBIRD_ORGANISATION_LIST : "/api/org/v1/type/list",
    SUNBIRD_USER_READ: "/api/user/v1/read",
    SUNBIRD_SEARCH_USER:"/api/user/v1/search",
    SUNBIRD_SEARCH_ORG:"/api/org/v1/search",
    SUNBIRD_CREATE_ORG:"/api/org/v1/create",
    SUNBIRD_UPDATE_ORG:"/api/org/v1/update",
    SUNBIRD_READ_ORG:"/api/org/v1/read",
    SUNBIRD_ORG_STATUS_UPDATE:"/api/org/v1/status/update",
    SUNBIRD_REMOVE_USER_FROM_ORG:"/api/org/v1/member/remove",

    GCP_PRESIGNED_URL:"/cloud-services/gcp/preSignedUrls",
    AWS_PRESIGNED_URL:"/cloud-services/aws/preSignedUrls",
    AZURE_PRESIGNED_URL:"/cloud-services/azure/preSignedUrls",
    UPLOAD_TO_GCP_PRESIGNED_URL:"/cloud-services/gcp/uploadFile",
    UPLOAD_TO_AWS_PRESIGNED_URL:"/cloud-services/aws/uploadFile",
    UPLOAD_TO_AZURE_PRESIGNED_URL:"/cloud-services/azure/uploadFile",

    DOWNLOAD_GCP_URL:"/cloud-services/gcp/getDownloadableUrl",
    DOWNLOAD_AWS_URL:"/cloud-services/aws/getDownloadableUrl",
    DOWNLOAD_AZURE_URL:"/cloud-services/azure/getDownloadableUrl"
    
    
}