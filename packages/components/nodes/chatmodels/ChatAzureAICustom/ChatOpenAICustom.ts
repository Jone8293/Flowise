import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface';
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils';
import { AzureMLChatOnlineEndpoint } from 'langchain/chat_models/azureml_endpoint';

class AzureMLChatModels implements INode {
    label: string;
    name: string;
    version: number;
    type: string;
    icon: string;
    category: string;
    description: string;
    baseClasses: string[];
    credential: INodeParams;
    inputs: INodeParams[];

    constructor() {
        this.label = 'AzureMLChatOnlineEndpoint';
        this.name = 'azureMlChatOnlineEndpoint';
        this.version = 1.0;
        this.type = 'AzureMLChatOnlineEndpoint';
        this.icon = 'azure.png';
        this.category = 'Chat Models';
        this.description = 'Wrapper around AzureML large language models that use the Chat endpoint';
        this.baseClasses = [this.type, ...getBaseClasses(AzureMLChatOnlineEndpoint)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureMlApi']
        };
        this.inputs = [
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.6,
                optional: true
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true,
                additionalParams: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const endpointUrl = nodeData.inputs?.endpointUrl as string
        const endpointApiKey = nodeData.inputs?.endpointApiKey as string
        const temperature = nodeData.inputs?.temperature as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const azureMlEndpointUrl = getCredentialParam('azureMlEndpointUrl', credentialData, nodeData)
        const azureMlEndpointApiKey = getCredentialParam('azureMlEndpointApiKey', credentialData, nodeData)

        const obj: Partial<AzureMLChatOnlineEndpoint> & { azureMlEndpointUrl?: string; azureMlEndpointApiKey?: string } = {
            endpoint_url: azureMlEndpointUrl,
            endpoint_api_key: azureMlEndpointApiKey,
            temperature: parseFloat(temperature),
            maxTokens: parseInt(maxTokens, 10),
            top_p: parseFloat(topP)
        };

       const model = new AzureMLChatOnlineEndpoint(endpoint_url, endpoint_api_key, {Content_Formatter: LlamaContentFormatter});

        return model;
    }
}

module.exports = { nodeClass: AzureMLChatModels }
