import { SQSEvent } from 'aws-lambda';

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log('Processing subscription:', message);
  }
};