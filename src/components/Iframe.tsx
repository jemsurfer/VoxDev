// https://github.com/AyloSrd/reactplayground
import { type OutputType } from "@/lib/esbuild";
import { sandboxAttributes, srcDoc } from "@/lib/iframe";
import { memo, useCallback, useEffect, useRef } from "react";

interface Props {
  onLoad: (evt: CustomEvent<Window>) => void;
  onPageRefresh: () => void;
  output: OutputType;
  shouldRefresh: boolean;
}

const Iframe = (props: Props) => {
  const { output, shouldRefresh } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = useCallback(() => {
    const iframeWindow = iframeRef?.current?.contentWindow;

    if (iframeWindow) {
      iframeWindow.postMessage(output, "*");
    }
  }, [output, props]);

  useEffect(() => {
    if (shouldRefresh && iframeRef && iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc;
    }
    iframeRef?.current?.contentWindow?.postMessage(output, "*");
  }, [output, shouldRefresh]);

  return (
    <iframe
      allow="clipboard-read; clipboard-write"
      onLoad={handleIframeLoad}
      ref={iframeRef}
      sandbox={sandboxAttributes}
      srcDoc={srcDoc}
      title="ReactREPL"
    />
  );
};

export default memo(Iframe);
