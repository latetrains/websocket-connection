let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = 'Latetrains';
const createdHttpCode = 201;

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    return new Promise((resolve) => {
        this.addItemToDynamo({
            connectionid: connectionId
        }).then(() => {
            resolve(
                this.buildResponse(createdHttpCode, 'Connection Successful')
            );
        });
    });
};

exports.addItemToDynamo = (item) => {
    return dynamo.put({
        TableName: tableName,
        Item: item,
    }).promise();
};

exports.buildResponse = (status, message) => {
    return {
        'status': status,
        'message': message
    };
};