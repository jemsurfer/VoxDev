import { useCallback, useState } from "react";
// import { Decode, Hook } from "console-feed";
import Iframe from "./Iframe";
import type { OutputType } from "../lib/esbuild";
// import { type Message } from "console-feed/lib/definitions/Component";

interface Props {
  output: OutputType;
}

export default function MiniBrowser(props: Props) {
    const {output} = props;
    // const [logs, setLogs] = useState<Message[]>([]);

    // const handleLoad = useCallback((evt: CustomEvent<Window>) => {
    // Hook(
    //     // @ts-ignore : Window type soens't have console
    //     evt.detail.console,
    //     // @ts-ignore : cannot make make ts work with this callback
    //     handleConsoleMessage,
    //     true,
    //     100,
    // );
    // }, []);

    // const handleConsoleMessage = useCallback(
    //     (log: Message[]) => {
    //     setLogs(
    //         log[0].method === "clear"
    //         ? []
    //         : (currLogs: Message[]) => [...currLogs, Decode(log)] as Message[],
    //     );
    //     },
    //     [Decode],
    // );

    return (
    <>
        <Iframe
            onLoad={()=>{}}
            onPageRefresh={()=>{}}
            output={output}
            shouldRefresh={false}
        />
    </>
   
    )
}