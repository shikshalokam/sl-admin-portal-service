/**
 * name : platformRoles/helper.js
 * author : Rakesh Kumar
 * created-date : 06-July-2020
 * Description : Platform roles related functionality.
 */

/**
   * PlatformRolesHelper
   * @class
*/
module.exports = class PlatformRolesHelper {

    /**
      * To get all platform roles
      * @method
      * @name all
      * @param {Object} [queryParameter = "all"] - Filtered query data.
      * @param {Array} [fieldsArray = {}] - Projected data.   
      * @param {Object} [skipFields = "none" ]
      * @returns {Object} returns a platform roles information
     */

    static all(queryParameter = "all", fieldsArray = "all", skipFields = "none") {
        return new Promise(async (resolve, reject) => {
            try {

                if (queryParameter === "all") {
                    queryParameter = {};
                };

                let projection = {}

                if (fieldsArray != "all") {
                    fieldsArray.forEach(field => {
                        projection[field] = 1;
                    });
                }

                if (skipFields != "none") {
                    skipFields.forEach(element => {
                        projection[element] = 0;
                    });
                }

                let platformRolesDoc =
                    await database.models.platformRolesExt.find(queryParameter, projection).lean();

                if (!platformRolesDoc) {
                    return resolve({
                        message: constants.apiResponses.PLATFORMROLES_NOT_FOUND,
                    });
                }
                return resolve({ message: constants.apiResponses.PLATFORMROLES_FOUND, result: platformRolesDoc });

            } catch (error) {
                return reject(error);
            }
        })
    }
};