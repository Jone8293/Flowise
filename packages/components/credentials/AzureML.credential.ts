import { INodeParams, INodeCredential } from '../src/Interface'

class AzureML implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Azure Model'
        this.name = 'azureML'
        this.version = 1.0
        this.description =
            'Use the <a target="_blank" href="https://azure.microsoft.com/en-us/services/machine-learning/">Azure ML API credential site</a> to get this key.'
        this.inputs = [
            {
                label: 'Azure ML Endpoint URL',
                name: 'azureMLEndpointURL',
                type: 'string'
            },
            {
                label: 'Azure ML Endpoint API Key',
                name: 'azureMLEndpointAPIKey',
                type: 'password'
            },
        ]
    }
}

module.exports = { credClass: AzureML }