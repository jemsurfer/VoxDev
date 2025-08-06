import useEsbuild from '@/lib/esbuild';
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

export const {
        addFile,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files,
        output,
        // rawImports,
        resetVFS,
        versionGeneratorRef,
        versionRef,
        } = useEsbuild(null);

const server = new McpServer({
    name: "bundler-mcp-server",
    version: "1.0.0"
})

/*Tools:
    - addFile
    - deleteFile
    - editFileContent
    - editFileName
    - resetVFS
    - createBundle
  Resources:
    - files
*/

server.registerTool("addFile", 
    {
        title: "Add File",
        description: "Add file to the VFS",
        inputSchema: {fileName: z.string(), contents: z.string()}
    },
    async ({fileName, contents}) => {
        let msg = "Successfully created file";
        try {
            addFile({target: fileName, content: contents}); 
        } catch (e){
            if (typeof e === "string") {
                msg = e.toUpperCase() 
            } else if (e instanceof Error) {
                msg = e.message 
            }
        }
        return {content: [{type: "text", text: msg}]}
    }
)

server.registerTool("deleteFile",
    {
        title: "Delete File",
        description: "Delete file from the VFS",
        inputSchema: {fileName: z.string()}
    },
    async ({fileName}) => {
        let msg = "Successfully deleted file"
        try {
            deleteFile({target: fileName, content: ""})
        } catch (e){
            if (typeof e === "string") {
                msg = e.toUpperCase() 
            } else if (e instanceof Error) {
                msg = e.message 
            }
        }
        return {content: [{type: "text", text: msg}]}
    }
)

server.registerTool("editFileContent", 
    {
        title: "Edit file contents",
        description: "Edit the contents of a file",
        inputSchema: {fileName: z.string(), contents: z.string()}
    },
    async ({fileName, contents}) => {
        let msg = "Edited file contents successfully";
        try {
            editFileContent({target: fileName, content: contents})
        } catch (e){
            if (typeof e === "string") {
                msg = e.toUpperCase() 
            } else if (e instanceof Error) {
                msg = e.message 
            }
        }
        return {content: [{type: "text", text: msg}]}
    }
)

server.registerTool("editFileName",
    {
        title: "Edit file name",
        description: "Edit the name of the file",
        inputSchema: {oldName: z.string(), newName: z.string()}
    },
    async ({oldName, newName}) => {
        let msg = "Edited file contents successfully";
        try {
            editFileName({target: oldName, content: newName})
        } catch (e){
            if (typeof e === "string") {
                msg = e.toUpperCase() 
            } else if (e instanceof Error) {
                msg = e.message 
            }
        }
        return {content: [{type: "text", text: msg}]}
    }
)

server.registerTool("resetVFS",
    {
        title: "Reset VFS",
        description: "Reset the VFS back to initial configuration",
    },
    async () => {
        resetVFS()
        return {content: [{type: "text", text: "VFS Reset successfully"}]}
    }
)

server.registerTool("createBundle",
    {
        title: "Create Bundle",
        description: "Validate, build and bundle the VFS - either returns success or a bundling error",
    },
    async () => {
        if (typeof versionRef.current !== "number") {
            return {content: [{type: "text", text: "Invalid versionRef"}]};
        }
        versionRef.current = versionGeneratorRef.current.next().value;
        createBundle(files.filesById, versionRef.current);
        const txt = output.error ? output.error : "Successfully bundled VFS"
        return {content: [{type: "text", text: txt}]} 
    }
)

server.registerResource("fileList",
    new ResourceTemplate("vfs://", {list: undefined}),
    {
        title: "File list",
        description: "List all files in VFS"
    },
    async (uri) => ({
        contents: [{
            uri: uri.href, 
            text: JSON.stringify(files.fileList)
        }]
    })
)

server.registerResource("fileContents",
    new ResourceTemplate("vfs://{file}", {list:undefined}),
    {
        title: "File contents",
        description: "Get the contents of a file"
    },
    async (uri, {file}) => ({
        contents: [{
            uri: uri.href,
            text: files.filesById[file[0]]
        }]
    })
)

server.registerResource("bundledFiles",
    new ResourceTemplate("bundle://", {list:undefined}),
    {
        title: "Bundled Files",
        description: "The compiled and bundled HTML, CSS, and JS."
    },
    async (uri) => ({
        contents: [{
            uri: uri.href,
            text: output.code ? output.code : "" 
        }]
    })
)

const transport = new StdioServerTransport();
await server.connect(transport);