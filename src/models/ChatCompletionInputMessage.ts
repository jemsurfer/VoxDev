//Copy-pasted from @huggingface/tasks/dist/commonjs/tasks/chat-completion/inference.d.ts
export interface ChatCompletionInputMessage {
    content?: ChatCompletionInputMessageContent;
    name?: string;
    role: string;
    tool_calls?: ChatCompletionInputToolCall[];
    [property: string]: unknown;
}
type ChatCompletionInputMessageContent = ChatCompletionInputMessageChunk[] | string;
interface ChatCompletionInputMessageChunk {
    image_url?: ChatCompletionInputURL;
    text?: string;
    type: ChatCompletionInputMessageChunkType;
    [property: string]: unknown;
}
interface ChatCompletionInputURL {
    url: string;
    [property: string]: unknown;
}
type ChatCompletionInputMessageChunkType = "text" | "image_url";
interface ChatCompletionInputToolCall {
    function: ChatCompletionInputFunctionDefinition;
    id: string;
    type: string;
    [property: string]: unknown;
}
interface ChatCompletionInputFunctionDefinition {
    description?: string;
    name: string;
    parameters?: unknown;
    [property: string]: unknown;
}