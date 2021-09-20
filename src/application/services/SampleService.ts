import 'reflect-metadata';
import { injectable } from 'inversify';
import { checkConnection } from '@application/util';

@injectable()
export class SampleService {
    async sample(url: string): Promise<Record<string, string>> {
        const isConnected = await checkConnection();
        return {
            isConnected,
            var: `Hello World! from ${url}`,
        };
    }
}
