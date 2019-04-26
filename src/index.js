let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    return new Promise((resolve, reject) => {
        this.addItemToDynamo({
            connectionid: connectionId
        }).then(() => {
            resolve({
                statusCode: OK
            });
        }).catch(() => {
            reject({
                statusCode: INTERNAL_SERVER_ERROR
            })
        });
    });
};

exports.addItemToDynamo = (item) => {
    return dynamo.put({
        TableName: process.env.TABLE_NAME,
        Item: item,
    }).promise();
};
