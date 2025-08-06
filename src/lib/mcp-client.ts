import Anthropic from "@anthropic-ai/sdk";
import type { Tool } from "@anthropic-ai/sdk/resources";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

class MCPClient {
    private mcp: Client;
    private anthropic: Anthropic;
    private transport: StdioClientTransport | null = null;
    private tools: Tool[] = [];

    constructor() {
        this.anthropic = new Anthropic({
            apiKey: import.meta.env.VITE_ANTHROPIC_TOKEN
        });
        this.mcp = new Client({name: "bundler-mcp-client", version: "1.0.0"});
    }

    async connectToServer(serverScriptPath: string) {
        try { 
            this.transport = new StdioClientTransport({
                command: process.execPath,
                args: [serverScriptPath],
            })

            await this.mcp.connect(this.transport);

            const toolsList = await this.mcp.listTools();
            this.tools = toolsList.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                };
            });
        } catch (e) {
            console.log("Failed to connect to MCP server: ", e);
            throw e;
        }
    }
}

