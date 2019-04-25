let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = 'Latetrains';
const OK = 200;

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    return new Promise((resolve) => {
        this.addItemToDynamo({
            connectionid: connectionId
        }).then(() => {
            resolve({
                statusCode: OK
            });
        });
    });
};

exports.addItemToDynamo = (item) => {
    return dynamo.put({
        TableName: tableName,
        Item: item,
    }).promise();
};
