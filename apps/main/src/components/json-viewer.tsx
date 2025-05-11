interface JsonViewerProps {
    data: any
  }
  
  export function JsonViewer({ data }: JsonViewerProps) {
    const formatJson = (obj: any): string => {
      return JSON.stringify(obj, null, 2)
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
        .replace(/"([^"]+)"/g, '<span class="json-string">"$1"</span>')
        .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
        .replace(/\b(null)\b/g, '<span class="json-null">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="json-number">$1</span>')
    }
  
    return (
      <div className="json-viewer">
        <pre dangerouslySetInnerHTML={{ __html: formatJson(data) }} />
      </div>
    )
  }
  